import './home.css';
import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import mochila from '../../images/bag.png';

const CardPokemon = lazy(() => import('../../components/CardPokemon'));

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPokemonId, setSearchPokemonId] = useState('');

  const [itensPerPage, setItensPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePokemons, setVisiblePokemons] = useState([]);

  const fetchPokemons = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1010');
      const { results } = response.data;
      const pokemonDataPromises = results.map(({ url }) => axios.get(url));
      const pokemonDataResponses = await axios.all(pokemonDataPromises);
      const data = pokemonDataResponses.map(response => response.data);

      setPokemons(data);
      setVisiblePokemons(data.slice(0, itensPerPage));
      setLoading(false);
    } catch (error) {
      console.log('Error fetching pokemons:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        loadMorePokemons();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visiblePokemons]);

  const loadMorePokemons = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const newVisiblePokemons = pokemons.slice(0, endIndex);
    setVisiblePokemons(newVisiblePokemons);
    setCurrentPage(nextPage);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for Pokemon:', searchPokemonId);
  };

  if (loading) {
    return <h1>CARREGANDO TODOS OS POKEMONS... AGUARDE</h1>;
  }

  return (
    <div className="container-home">
      <div className="header">
        <div className="logo">
          <Link to="/">Pokedex</Link>
        </div>

        <div className="search">
          <input
            className="shield-text"
            onChange={(e) => setSearchPokemonId(e.target.value)}
            list="Pokemons"
            placeholder="Find by ID or Name"
          ></input>

          <datalist id="Pokemons">
            {pokemons.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.name} />
            ))}
          </datalist>
          <button className="button-search" onClick={handleSearch}>
            <Link to={`/detalhes/${searchPokemonId}`}>SEARCH</Link>
          </button>
        </div>

        <div>
          <Link to="/mochila">
            <img src={mochila} width={50} height={50} alt="mochila" />
          </Link>
        </div>
      </div>

      <div className="container-contents">
        <h1>HOME</h1>

        <div className="navigation">
          <ul>
            {visiblePokemons.map((pokemon) => (
              <Suspense fallback={<p>Ainda carregando...</p>} key={pokemon.id}>
                <li>
                  <CardPokemon
                    Name={pokemon.name}
                    Image={pokemon.sprites.front_default}
                    Id={pokemon.id}
                  />
                </li>
              </Suspense>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

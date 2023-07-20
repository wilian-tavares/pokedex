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

  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

 

  const fetchPokemons = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const { results } = response.data;
      const pokemonDataPromises = results.map(({ url }) => axios.get(url));
      const pokemonDataResponses = await axios.all(pokemonDataPromises);
      const data = pokemonDataResponses.map(response => response.data);

      setPokemons(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching pokemons:', error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0 ) {
        setCurrentPage((prevPage) => prevPage - 1);
        setOffset(offset - 20);
    }
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
  setOffset(offset + 20);
}

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, limit, offset]);



  

  // const handleSearch = () => {
  //   // Implement your search logic here
  //   console.log('Searching for Pokemon:', searchPokemonId);
  // };

  // if (loading) {
  //   return <h1>CARREGANDO TODOS OS POKEMONS... AGUARDE</h1>;
  // }

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
          <button className="button-search" >
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

        <div className='container-buttons'>
        <button onClick={handlePreviousPage}>Anterior</button>
        <button onClick={handleNextPage}>Próximo</button>
        </div>

        <div className="container-pokemons">
          <ul>
            {pokemons.map((pokemon) => (
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

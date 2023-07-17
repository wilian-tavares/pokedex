import './home.css';
import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _, { find, map } from 'lodash';
import mochila from '../../images/bag.png';

// import CardPokemon from '../../components/CardPokemon';
const CardPokemon = lazy(() => import('../../components/CardPokemon'));

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchPokemonId, setSearchPokemonId] = useState('');

    const [itensPerPage, setItensPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(pokemons.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = pokemons.slice(startIndex, endIndex)


    function onNext() {
        setCurrentPage(currentPage + 1)
    }

    function onPrevious() {
        setCurrentPage(currentPage - 1)
    }


    useEffect(() => {

        async function loadPokemon() {

            let endpoints = [];

            for (let i = 1; i <= 1010; i++) {
                endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            }

            const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
            setLoading(false)
        }
        loadPokemon()

    }, [])

    if (loading) {
        return (<h1>CARREGANDO TODOS OS POKEMONS... AGUARDE</h1>)
    }

    return (
        <div className='container-home'>
            <div className="header">

                <div className="logo">
                    <Link to='/'>Pokedex</Link>
                </div>

                <div className='search'>
                    <input className='shield-text' onChange={(e) => setSearchPokemonId(e.target.value)} list='Pokemons' placeholder='Find by ID or Name'></input>

                    <datalist id='Pokemons'>
                        {
                            pokemons.map((pokemon) => {
                                return (
                                    <option key={pokemon.data.id} value={pokemon.data.name}></option>
                                )
                            })
                        }
                    </datalist>
                    <button className='button-search'>
                        <Link to={`/detalhes/${searchPokemonId}`}>SEARCH</Link>
                    </button>

                </div>

                <div>
                    <Link to='/mochila'>
                        <img src={mochila} alt='mochila' />
                    </Link>
                </div>
            </div>

            <div className='container-contents'>

                <h1>HOME</h1>

                <div className='navigation'>
                    <button
                        className='buttonPages'
                        value={Number(currentPage)}
                        disabled={Number(currentPage) === 0}
                        onClick={onPrevious}>
                        {'<'}
                    </button>


                    {Array.from(Array(pages), (item, index) => {
                        return (
                            <button
                                className='buttonPages'
                                style={index === currentPage ? { backgroundColor: "green" } : null}
                                key={index}
                                value={index}
                                onClick={(e) => setCurrentPage(Number(e.target.value))}
                            >
                                {index + 1}
                            </button>
                        )
                    })}

                    <button
                        className='buttonPages'
                        disabled={Number(currentPage) === pages - 1}
                        onClick={onNext}>
                        {'>'}
                    </button>

                    <ul>
                        {
                            currentItens.map((pokemon) => {
                                return (
                                    <Suspense fallback={<p>Ainda carregando...</p>}>
                                        <li key={pokemon.data.id} >
                                            <CardPokemon
                                                Name={pokemon.data.name}
                                                Image={pokemon.data.sprites.front_default}
                                                Id={pokemon.data.id}
                                            />
                                        </li>
                                    </Suspense>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>

        </div>


    )
}

export default Home;
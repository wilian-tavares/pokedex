import './home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _, { find, map } from 'lodash';

function Home(){
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchPokemonId, setSearchPokemonId] = useState('');

    useEffect(() => {       

        async function loadPokemon(){
  
            let endpoints = [];

            for(let i = 1;i <= 200; i++){
                endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            }
            
            const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
            // {console.log('valor '+ findPokemon.value)}
            
            setLoading(false)
        }
        //console.log(pokemons)
        loadPokemon()

    }, [])

   if(loading){
        return( <h1>CARREGANDO TODOS OS POKEMONS... AGUARDE</h1>)
   }


    
    return(
        <div className='.container-home'>
            <div className="header">

                <div className="logo">
                    <Link to='/'>Pokedex</Link>
                </div>

                <div className='search'>
                    <input className='shield-text' onChange={(e) => setSearchPokemonId(e.target.value)} list='Pokemons' placeholder='Find by ID or Name'></input>
                    
                    <datalist id='Pokemons'>     
                    {
                        pokemons.map((pokemon) => {
                            return(                           
                                <option key={pokemon.data.id}  value={pokemon.data.name}></option>  
                            )
                        })
                    }                      
                    </datalist>      
                    <button className='button-search'>
                        <Link to={`/detalhes/${searchPokemonId}`}>SEARCH</Link>
                    </button>    

                </div>
            </div> 

            <h1>HOME</h1>
        
             <div className='container-home'>
                <ul>
                    {  
                        pokemons.map((pokemon) => {
                            return(
                                    <li key={pokemon.data.id} >
                                        <Link  to={`/detalhes/${pokemon.data.id}`}>
                                            <article className='card-Pokemon'>
                                                <strong>{pokemon.data.name}</strong>
                                                <img src={pokemon.data.sprites.front_default} alt={pokemon.name}></img>
                                                <strong >ID: {pokemon.data.id}</strong>
                                            </article>
                                        </Link>
                                    </li>
                                )
                        })
                    } 
                </ul>
            </div> 
        
        </div>
    )
}

export default Home;
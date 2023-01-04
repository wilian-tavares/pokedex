import './home.css';
import { useState, useEffect } from 'react';

import api from '../../Services/api';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home(){

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {       

        async function loadPokemon(){
            //const response = await api.get(`pokemon?limit=200`)        

            // const response = await api.get(`pokemon`, {
            //     params: {
            //         limit: 200,
            //     }
            // })    
            //console.log(response.data.results)
           
            let endpoints = [];

            for(let i = 1;i < 200; i++){
                endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            }
            
            const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
            
        }
        console.log(pokemons)
        loadPokemon()

    }, [])

    
    return(
        <div>

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
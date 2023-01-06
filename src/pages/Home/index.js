import './home.css';
import { useState, useEffect } from 'react';

import api from '../../Services/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

import _ from 'lodash';

function Home(){

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {       

        async function loadPokemon(){
  
            let endpoints = [];

            for(let i = 1;i <= 200; i++){
                endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            }
            
            const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
           
            
            setLoading(false)
        }
        //console.log(pokemons)
        loadPokemon()

    }, [])

   if(loading){
        return( <h1>CARREGANDO TODOS OS POKEMONS... AGUARDE</h1>)
   }
    
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
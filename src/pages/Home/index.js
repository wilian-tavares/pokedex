import './home.css';
import { useState, useEffect } from 'react';

import api from '../../Services/api';




function Home(){

    const [pokemons, setpokemons] = ([]);

    useEffect(() => {
        let id = 1;

        async function loadPokemon(){
            const response = await api.get(`pokemon?limit=200`)
           
            
            
            for(let i = 1; i <= 50; i++) {
                const pokemon = response.data.results;
                
            
            }
       
            // pokemon.map((pokemon) => {
            //     console.log(pokemon.name)
            // })

        
        }
        loadPokemon()

    }, [])

    
    return(
        <div>
            <h1>HOME</h1>
        </div>
    )
}

export default Home;
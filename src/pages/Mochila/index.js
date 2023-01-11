import './mochila.css';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

function Mochila(){

    const [favoritos, setFavoritos] = useState([]);

   

    useEffect(() => {
         const minhaMochila = localStorage.getItem("@pokebola");
         setFavoritos(JSON.parse(minhaMochila) || [])
         console.log(favoritos)     
         
    }, [])

    function RemoverPokemon(id) {
        let filtroPokemon = favoritos.filter((pokemon) => {
            return (pokemon.id !== id)
        })
        setFavoritos(filtroPokemon);
        localStorage.setItem("@pokebola", JSON.stringify(filtroPokemon))
    }

                 
    
  

    return(
        <div>
            <div className="header">
                <div className="logo">
                <Link to='/'>Pokedex</Link>
                </div>
            </div>

     
    
            <h2>Bem Vindo a sua Mochila</h2>
            {favoritos.length === 0 && <span>Sua Mochila Está Vazia </span>}
            <div className='container-mochila'>

            <ul>
            {     favoritos.map((pokemon) => {
                return(
                        <li  key={pokemon.id}>
                           
                                <article className='card-pokemon'>
                                    <strong>ID: {pokemon.id}</strong>
                                    <img src={pokemon.sprites.front_default}></img>
                                    <strong>{pokemon.name}</strong>

                                    <div className='buttons'>
                                        <Link to={`/detalhes/${pokemon.id}`}>
                                            <button className='button-detalhes'>Detalhes</button>
                                        </Link>
                                        <button onClick={() => RemoverPokemon(pokemon.id)} className='button-remover'>Remover</button>
                                    </div>
                                </article>
                           

                        </li>
                    )
                })}

            </ul>
               
            </div>
        </div>
    )
}

export default Mochila;

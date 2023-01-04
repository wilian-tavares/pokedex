import './detalhes.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//import axios from 'axios';
import api from '../../Services/api';


function Detalhes(){

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    

  

    useEffect(() => {
        async function LoadDetalhes() {
            const response = await api.get(`pokemon/${id}` , {
                params: {
                    id: id,
                } 
            })
            setPokemon(response.data)
            setLoading(false)
        }
        
        LoadDetalhes()

        }, [])


        if(loading){
            return(
                <h2>Carregando...</h2>
            )
        }
        
    return(
        <div className='container-detalhes'>
            <div  className='card-detalhes'>
                <h1>Detalhes do Pokemon {pokemon.name}</h1>
                <strong>{pokemon.name}</strong>
                 <img src={pokemon.sprites.front_default} alt={pokemon.name}></img> 

                 <div className='status'>
                    <div>
                    <strong>{pokemon.stats[0].stat.name} = {pokemon.stats[0].base_stat}</strong><br></br>
                    </div>

                    <div>
                    <strong>{pokemon.stats[1].stat.name} = {pokemon.stats[1].base_stat}</strong><br></br>
                    </div>

                    <div>
                    <strong>{pokemon.stats[2].stat.name} = {pokemon.stats[2].base_stat}</strong><br></br>
                    </div>

                    <div>
                    <strong>{pokemon.stats[3].stat.name} = {pokemon.stats[3].base_stat}</strong><br></br>
                    </div>

                    <div>
                    <strong>{pokemon.stats[4].stat.name} = {pokemon.stats[4].base_stat}</strong><br></br>
                    </div>


                    <div>
                    <strong>{pokemon.stats[5].stat.name} = {pokemon.stats[5].base_stat}</strong><br></br>
                    </div>

                </div>
                <strong>{pokemon.types.type[0].name}</strong> 
                
               
            </div>
        </div>
    )
}
export default Detalhes;
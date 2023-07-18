import { memo } from 'react';
import { Link } from 'react-router-dom';
import './cardPokemon.css';

 function CardPokemon( {Id, Name, Image}){
    return(
        
            <Link to={`/detalhes/${Id}`} className="cardPokemon">
                <strong>{Name}</strong>
                <img src={Image} alt={Id} width={200} height={200} />
                <strong>ID: {Id}</strong>
            </Link>
       
    )
}

export default memo(CardPokemon)
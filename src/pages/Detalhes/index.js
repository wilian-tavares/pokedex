import './detalhes.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mochila from '../../images/bag.png'
import _ from 'lodash';

import api from '../../Services/api';

function Detalhes() {

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function AdicionarFavoritos(){

    const minhaMochila = localStorage.getItem("@pokebola");

    let pokemonSalvos = JSON.parse(minhaMochila) || [];

    const hasPokemon = pokemonSalvos.some((pokemonSalvo) => pokemonSalvo.id === pokemon.id)

    if(hasPokemon) {
      alert('pokemon já esta na lista');
      return;
    }

      pokemonSalvos.push(pokemon);
      localStorage.setItem("@pokebola", JSON.stringify(pokemonSalvos))
      alert('pokemon salvo com sucesso')

  }

  useEffect(() => {
    async function loadDetalhes() {
      const response = await api.get(`pokemon/${id}` , { params: { id } });
      setPokemon(response.data);
      setLoading(false);
    }
    loadDetalhes();
  }, []);

  if (loading) {
    return (<h2>Carregando...</h2>);
  }

  return (
    <div>
      <div className="header">

      <div className="logo">
          <Link to='/'>Pokedex</Link>
      </div>
      <div className="logo">
          <Link to='/mochila'>
            <img src={mochila} />
          </Link>
      </div>

      

      </div>
      
      <div className='container-detalhes'>
        <div className='card-detalhes'>
          <h1>{_.get(pokemon, 'name')}</h1>
        
          <img src={_.get(pokemon, 'sprites.front_default')} alt={_.get(pokemon, 'name')}></img>

              {/* //DEBUGGER */}
              {/* {console.log(pokemon)} */}


          <div className='info'>

            <div className='ability'>
              {
                _.map(_.get(pokemon, 'abilities'), (abilityData ,index) => (
                <div className='item' key={index}>
                  <strong>Ability: {abilityData.ability.name}</strong>
                </div>
                ))
              }
            </div>
            {/*Fim Abilidades*/ }

            <div className='status'>
              {_.map(_.get(pokemon, 'stats'), (statData, index) => (
              <div className='item' key={index}>
                <strong>{statData.stat.name} = {statData.base_stat}</strong><br></br>
              </div>
              ))}
              <strong className='item'>Weight: {_.get(pokemon, 'weight') /10}kg</strong><br></br>
            </div>

            <div className='types'>
              {_.map(_.get(pokemon, 'types'), (typeData, index) => (
                <div className='item' key={index}>
                  <strong >TYPE: {typeData.type.name}</strong><br></br>
                </div>
              ))}
            </div>

          </div>
        </div>
        {/* inicio button favoritos*/}
        <div className='favoritos'>
          <button onClick={AdicionarFavoritos} className='button-favorito'>Adicionar a Sacola</button>
        </div>
      </div>
      
    </div> 
  )
}

export default Detalhes;
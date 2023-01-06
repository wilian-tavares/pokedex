import './detalhes.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import api from '../../Services/api';

function Detalhes() {

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
    <div className='container-detalhes'>
      <div className='card-detalhes'>
        <h1>{_.get(pokemon, 'name')}</h1>
      
        <img src={_.get(pokemon, 'sprites.front_default')} alt={_.get(pokemon, 'name')}></img>

            {/* //DEBUGGER */}
            {console.log(pokemon)}


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
    </div>
  )
}

export default Detalhes;
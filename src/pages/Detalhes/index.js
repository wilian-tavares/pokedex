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
        <h1>Detalhes do Pokemon {_.get(pokemon, 'name')}</h1>
        <strong>{_.get(pokemon, 'name')}</strong>
        <img src={_.get(pokemon, 'sprites.front_default')} alt={_.get(pokemon, 'name')}></img>

            {/* //DEBUGGER */}
            {console.log(pokemon)}

        <div className='status'>
          {_.map(_.get(pokemon, 'stats'), (statData, index) => (
          <div key={index}>
            <strong>{statData.stat.name} = {statData.base_stat}</strong><br></br>
          </div>
          ))}
          {_.map(_.get(pokemon, 'types.type'), (typeData, index) => (
          <div key={index}>
            <strong>{typeData.name}</strong>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Detalhes;
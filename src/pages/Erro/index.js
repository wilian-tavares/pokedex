import { Link } from 'react-router-dom';
import './erro.css';

function Erro(){
    return(
        <div>
          <div className="header">
            <div className="logo">
                <Link to='/'>Pokedex</Link>
            </div>
          </div>
          <div className='container-erro'>
            <h2>PÁGINA NÃO ENCONTRADA...</h2>
            <span>Volte para a Página Inicial...</span>
          </div>
        </div>
    )
}

export default Erro;
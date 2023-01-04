import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return(
        <div className="header">

            <div className="logo">
                <h1>Pokedex</h1>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to='/'>HOME</Link>
                    </li>
                </ul>
            </nav>
        </div>
        
    )
}

export default Header;
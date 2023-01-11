import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Erro from './pages/Erro';
import Mochila from './pages/Mochila';

function RouteApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> }> </Route>
                <Route path={`/detalhes/:id`} element={ <Detalhes /> }></Route>
                <Route path={'/mochila'} element={ <Mochila /> } />

                <Route path='*' element={ <Erro /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;
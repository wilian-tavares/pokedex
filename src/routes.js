import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Detalhes from './pages/Detalhes';

function RouteApp() {
    return(
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path='/' element={ <Home /> }> </Route>
                <Route path={`/detalhes/:id`} element={ <Detalhes /> }></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;
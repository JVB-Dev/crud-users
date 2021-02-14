import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import RegisterUser from "./pages/RegisterUser";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact />
            <Route component={Home} path="/Home" />
            <Route component={RegisterUser} path="/RegisterUser" />
        </BrowserRouter>
    );
}

export default Routes;
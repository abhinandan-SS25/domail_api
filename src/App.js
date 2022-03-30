import React from 'react';
import Landing from  './Landing/Landing';
import "./index.css"
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <div id='app'>
            <BrowserRouter>
                <Landing />
            </BrowserRouter>
        </div>
    )
}

export default App;

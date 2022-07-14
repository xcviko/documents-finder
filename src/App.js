import React from 'react';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <div className='app'>
                <Header/>
                <Content/>
            </div>
        </Provider>

    );
}

export default App;
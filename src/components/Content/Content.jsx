import React from 'react';
import s from './Content.module.css';
import SearchForm from "./SearchForm/SearchForm";
import Info from "./Info/Info";

const Content = () => {
    return (
        <div className={s.content}>
            <SearchForm />
            <Info />
        </div>
    );
}

export default Content;
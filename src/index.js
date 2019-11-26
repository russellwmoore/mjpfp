import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

const root = document.querySelector('#root');

const Root = () => {
    return (
        <App />
    )
}

ReactDOM.render(<Root />, root);

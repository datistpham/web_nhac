import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from '~/reportWebVitals';
import MainStyles from '~/components/MainStyles';
import "./style.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MainStyles>
            <App />
        </MainStyles>
    </React.StrictMode>,
);


reportWebVitals();

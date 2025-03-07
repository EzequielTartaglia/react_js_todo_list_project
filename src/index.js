import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const { REACT_APP_AUTH0_DOMAIN: domain, REACT_APP_AUTH0_CLIENT_ID: clientId } = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

// Report web vitals for performance monitoring
reportWebVitals();

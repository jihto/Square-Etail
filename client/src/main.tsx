import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css';
import "./styles/rangeSlider.less"
import { BrowserRouter } from 'react-router-dom' 
import { GoogleOAuthProvider } from '@react-oauth/google'  
import { Provider } from "react-redux"; 
import { store } from './redux/store.ts'; 
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={process.env.GOOGLE_ID || ""}>
    <Provider store={store}>
      <React.StrictMode> 
        <BrowserRouter>
          <App />
        </BrowserRouter>   
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
)

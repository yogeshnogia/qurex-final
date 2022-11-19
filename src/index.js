import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ThemeProvider } from './hooks/useThemeContext';
// import Background from './hooks/useBackground';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider>
      <Background> */}
    {/* <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
          
        </div> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Background>
    </ThemeProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

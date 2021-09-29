import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AdminState from "./context/AdminContext";
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <AdminState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdminState>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
//append to build for deploy with spring boot===== && xcopy .\\build\\* ..\\main\\resources\\public /s /y
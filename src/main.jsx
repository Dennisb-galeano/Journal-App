import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';
import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
    <JournalApp/>
    </BrowserRouter>

  </React.StrictMode>,

  
)




//aca debe ir el browser router ya que es la parte mas alta de la app
//sin embargo tambien se puede config. en el file de JournalApp
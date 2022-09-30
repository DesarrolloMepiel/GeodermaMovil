import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Router from './routers/Index';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import ViewEmployee from './components/ViewEmployee';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/view/:id' element={<ViewEmployee/>} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;

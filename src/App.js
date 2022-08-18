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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

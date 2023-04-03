import './App.css';
import { Route, Routes } from 'react-router-dom';
import  {Login}  from './Pages/Login';
import  Signup  from './Pages/Signup';
import { Homepage } from './Pages/Homepage';
import { PrivateRoute } from './Pages/PrivateRoute';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>} />
        <Route path = "/signup" element={<Signup/>} /> 
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;

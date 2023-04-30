import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Ideas from './pages/Ideas';


function App() {
  return (
    <div className='bg-[#151515]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ideas" element={<Ideas />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

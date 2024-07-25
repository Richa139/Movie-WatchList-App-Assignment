// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Search from './Pages/Search';
import Watchlist from './Pages/WatchList';
import Home from './Pages/Home';
function App() {
  return (
    <>
     <Router>
       <Routes>
       <Route path="/" element={<Home />} />  {/* Default home route */}
         <Route path="/login" element={<Login />} ></Route>
         <Route path="/register" element={<Register />} ></Route>
         <Route path="/search" element={<Search />} />
         <Route path="/watchlist" element={<Watchlist />} />
       </Routes>
     </Router>
  </>
  );
}

export default App;

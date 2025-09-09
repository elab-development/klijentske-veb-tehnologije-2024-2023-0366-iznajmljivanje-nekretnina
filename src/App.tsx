import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rentals from './pages/Rentals';
import RentalDetails from './pages/RentalDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rentals' element={<Rentals />} />
          <Route path='/rentals/:id' element={<RentalDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LoginPage from './components/LoginScreen/LoginPage';

import { Route, Routes } from 'react-router-dom';
import MyAccount from './components/settings/MyAccount';
import Cart from './components/CartScreen/Cart';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='account' element={<MyAccount />} />
      <Route path='cart' element={<Cart />} />
    </Routes>
  );
}

export default App;

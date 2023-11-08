import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { Route, Routes } from 'react-router-dom';


import SignupPage from './components/Login/SignUp/LoginPage';
import LoginPage from './components/Login/Login/LoginPage';
import MyAccount from './components/settings/MyAccount';
import Cart from './components/CartScreen/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import List from './components/listwindow/list';


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='account' element={<MyAccount />} />
      <Route path='cart' element={<Cart />} />
      <Route path='list' element={<List />} />
      <Route path="/product/:productId" element={<ProductDetails/>}/>
    </Routes>
  );
}

export default App;

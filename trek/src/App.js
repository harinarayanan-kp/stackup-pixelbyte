import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LoginPage from './components/Login/LoginPage';

import { Route, Routes } from 'react-router-dom';
import MyAccount from './components/settings/MyAccount';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='account' element={<MyAccount />} />
    </Routes>
  );
}

export default App;

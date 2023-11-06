import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import LoginPage from './components/Login/LoginPage';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;

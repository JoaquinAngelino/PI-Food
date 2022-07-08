import './App.css';
import LandingPage from './components/LandingPage';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Detail from './components/Detail';
import NotFound from './components/NotFound'
import FormPage from './components/FormPage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<FormPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes> 
    </>
  );
}

export default App;

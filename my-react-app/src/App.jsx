import './App.css'
import {Route, Link, Routes} from 'react-router-dom';
import ObjectList from './components/ObjectList'
import Object from './components/Object'
import Home from './components/Home';
const App = () => {
  return (
    <>
    <title>
        <h1 className='App-title'>Welcome to the The Metropolitan Museum of ArtAPI</h1>
        </title>
    <div className='App'>
    <title>
        <h1 className='App-title'>Welcome to the The Metropolitan Museum of ArtAPI</h1>
        </title>
      <header className='App-header'>
        {/* <img src={logo} className='App-logo' alt='logo' /> */}
        
      </header>
      <br />
      <br />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection/page/:page' element={<ObjectList />} />
        <Route path='/collection/:id' element={<Object />} />
      </Routes>
    </div>
    </>
  );
};

export default App

import './App.css'
import { Route  ,Routes } from 'react-router-dom';
import AddEmployee from './component/AddEmployee';
import EditeEmployee from './component/EditeEmployee';
import Home from './component/Home';
import Employee from './component/Employee'
import Nav from './component/Nav';
function App() {
  return (
    <>
   
  <Routes>
    <Route path='/' element={<><Nav /> <Home /></>} />
    <Route path='/employee' element={<Employee/>} />
    <Route path='/editemp/:id' element={<EditeEmployee/>} />
    <Route path='/addemp' element={<AddEmployee/>} />
  </Routes>
    </>
  );
}

export default App;

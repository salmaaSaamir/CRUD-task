import './App.css'
import { Route  ,Router,Routes } from 'react-router-dom';
import AddEmployee from './component/AddSDLC';
import EditeEmployee from './component/EditeEmployee';
import Home from './component/Home';
import SDLC from './component/SDLC'
import Nav from './component/Nav';
import AllFiles from './component/AllFiles';
import UpdateInitPhase from './Forms/UpdateInitPhase';
import UpdateDesign from './Forms/UpdateDesign';
import UpdateReqPhase from './Forms/UpdateReqPhase';
function App() {
  return (
    <>
    <div>

      <Routes>
    <Route path='/' element={<><Nav /> <Home /></>} />
    <Route path='/SDLC' element={<SDLC/>} />
    <Route path='/editeInitPhase/:id' element={<UpdateInitPhase/>} />
    <Route path='/editeDesignPhase/:id' element={<UpdateDesign/>} />
    <Route path='/editeReqPhase/:id' element={<UpdateReqPhase/>} />
    <Route path='/addemp' element={<AddEmployee/>} />
    <Route path='/allfiles' element={<><Nav/><AllFiles/></>} />
  </Routes>

    </div>
    </>
  );
}

export default App;

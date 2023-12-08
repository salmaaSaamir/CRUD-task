import {useState } from "react";
import Nav from "./Nav";
import '../style/listEmp.css'
import DesignPhase from "../Tables/DesignPhase";
import RequirmentPhase from "../Tables/RequirmentPhase";
import InitialPhase from "../Tables/InitialPhase";
function SDLC(){

    const [init,setInit] = useState(false)
    const [req,setReq] = useState(false)
    const [design,setDesign] = useState(false)
    const setCurrentPhase=(e)=>{
      if (e==1) {
        setInit(true);setReq(false);setDesign(false)
      }else if(e==2){
        setInit(false);setReq(true);setDesign(false)
      }else if(e==3){
        setInit(false);setReq(false);setDesign(true)
      }
      else{
        setInit(false);setReq(false);

      }
      console.log(e)
    }
    return (
        <>
        <Nav />
        <select class="form-select text-capitalize" aria-label="Default select example"onChange={(e)=>{setCurrentPhase(e.target.value)}} >
              <option selected>Choose Phase To Create</option>
              <option value="1">initiation</option>
              <option value="2">requirement</option>
              <option value="3">Design</option>

         </select>
         {init?<InitialPhase />:null}
         {req?<RequirmentPhase />:null}
         {design?<DesignPhase />:null}
        </>
    )
}
export default SDLC;
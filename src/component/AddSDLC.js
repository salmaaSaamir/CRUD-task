import { useState } from "react";
import Nav from "./Nav";
import '../style/addEmp.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Initial from'../Forms/Initial'
import Requirements from "../Forms/Requirements";
import Design from "../Forms/Design";
function AddSDLC(){
    const [init,setInit] = useState(false)
    const [design,setDesign] = useState(false)
    const [req,setReq] = useState(false)
    const setCurrentPhase=(e)=>{
      if (e==1) {
        setDesign(false);setInit(true);setReq(false);
      }else if(e==2){
        setDesign(false);setInit(false);setReq(true);
      }else if(e==3){
        setDesign(true);setInit(false);setReq(false);
      }else{
        setDesign(false);setInit(false);setReq(false);

      }
      console.log(e)
    }
    

    return (
        <>
        <Nav />
        <select class="form-select" aria-label="Default select example"onChange={(e)=>{setCurrentPhase(e.target.value)}} >
              <option selected>Choose Phase To Create</option>
              <option value="1">initiation</option>
              <option value="2">requirement</option>
              <option value="3">design</option>
         </select>
         {init?<Initial />:null}
        
         {design?<Design />:null}
         {req?<Requirements />:null}
        </>
    )
}
export default AddSDLC;
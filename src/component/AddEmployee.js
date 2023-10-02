import { useState } from "react";
import Nav from "./Nav";
import '../style/addEmp.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function AddEmployee(){
    const [name,setName] = useState("")
    const [age,setAge] = useState(0)
    const [dep,setDep] = useState("")
    const navigate =  useNavigate()
    function submitData(e){
        e.preventDefault()
        if ((name &&  dep !== "") && age !== 0) {
            axios({
                method:'post',
                url:`http://localhost:9202/employees`,
                data:{
                    name:name,
                    age:age,
                    department:dep
                }
            }).then(() =>{
                Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  }).fire({
                    icon: 'success',
                    title: 'data inserted successfully'
                  })
            }).then(()=>{
                navigate('/employee')
            })
        }else{
            Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              }).fire({
                icon: 'error',
                title: 'your data is not completed yet!!'
              })
        }
    }
    function reset(){
      document.getElementById("myForm").reset();
    }
    return (
        <>
        <Nav />
        <form id="myForm">
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="">name</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the full name"  onChange={(e)=>{setName(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="f">age</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="the age"  onChange={(e)=>{setAge(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">department</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setDep(e.target.value)}}/>
</div>
<div className="mb-3 text-light"></div>
</div>
<button type="button" className="btn btn-outline-info" onClick={(e) => submitData(e)}>submit</button>
<button type="button" className="btn btn-outline-danger" onClick={reset}>reset</button>
        </form>
        <img src={formImg} className="img2" />
        </>
    )
}
export default AddEmployee;
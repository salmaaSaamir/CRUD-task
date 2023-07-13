import Nav from "./Nav";
import '../style/addEmp.css'
import formImg from '../Fill out-rafiki.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditeEmployee(){
    const params = useParams()
    const navigate =  useNavigate()
    const [specificEmp,setSpecificEmp] = useState([])
    const [name,setName] = useState("")
    const [age,setAge] = useState(0)
    const [dep,setDep] = useState("")
    useEffect(()=>{
        fetch(`http://localhost:9000/employees/${params.id}`).then((res) =>res.json()).then((data) => {
            setSpecificEmp(data)
            setName(data.name)
            setAge(data.age)
            setDep(data.department)
        })
    },[])
   console.log(specificEmp)
    function saveEdit(e){
        e.preventDefault()
        if ((name.valueOf &&  dep.valueOf !== "") && age.valueOf !== 0) {
            axios({
                method:'put',
                url:`http://localhost:9000/employees/${specificEmp.id}`,
                data:{
                    id:specificEmp.id,
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
                    title: 'data updated successfully'
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
    return (
        <>
        <Nav />
        <form>
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">name</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" defaultValue={specificEmp.name}  onChange={(e)=>{setName(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">age</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" defaultValue={specificEmp.age}  onChange={(e)=>{setAge(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">department</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" defaultValue={specificEmp.department}  onChange={(e)=>{setDep(e.target.value)}}/>
</div>
<div className="mb-3 text-light"></div>
</div>
<button type="button" className="btn btn-outline-info" onClick={(e) => saveEdit(e)}>save</button>
        </form>
        <img src={formImg} className="img2" />
        </>
    )
}
export default EditeEmployee;
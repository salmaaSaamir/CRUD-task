import { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_REQPHASE ,ADD_File } from '../Queries'
import '../style/addEmp.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Requirement(){
    const [intro,setintro] = useState("")
    const [propuse,setpropuse] = useState("")
    const [fileContent, setFileContent] = useState('');
    const [audiance,setaudiance] = useState("")
    const [description,setdescription] = useState("")
    const [feature,setfeture] = useState("")
    const [file, setFile] = useState('');
    const [filName, setfilName] = useState();
    const [phaseName, setphaseName] = useState("requirement");

    const navigate =  useNavigate()
    const [ createReqPhase ] = useMutation(ADD_REQPHASE);
    const [ createFile ] = useMutation(ADD_File);
    const handleFile = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log(selectedFile.name,typeof selectedFile.name)
    };
    const handleFileUpload = (e) => {
      const formData = new FormData();
      formData.append('file', file);
      setFileContent(file.name); // Set the file name as the fileContent
      axios.post('http://localhost:4000/upload', formData);
    };
  
    function submitData(e){
        e.preventDefault()
        if ((intro &&  propuse != "") && file != "") {
          const promises = [];
          createReqPhase({
            variables: {
              intro: intro,
              propuse: propuse,
              audiance: audiance,
              description: description,
              feature: feature,
              file:file['name'],
              fileName:filName,
              phaseName:phaseName
            },
          }).then(() =>{
                Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass:'addStyle',
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  }).fire({
                    icon: 'success',
                    title: 'data inserted successfully',
                    customClass:'addStyle',
                  })
            }).then(()=>{
                navigate('/SDLC')
            })
        }else{
            Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                customClass:'addStyle',
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
        <h1 className="text-light text-capitalize text-center">Requirement phase</h1>
                <form id="myForm" className="form">
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="">introduction</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="introduction"  onChange={(e)=>{setintro(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="f">propuse</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="propuse"  onChange={(e)=>{setpropuse(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">intendce audiance</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="intendce audiance"  onChange={(e)=>{setaudiance(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">overall description</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="overall description"  onChange={(e)=>{setdescription(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">system feature</label>
  <textarea className="form-control w-25 h-25" id="exampleFormControlInput1" placeholder="system feature"  onChange={(e)=>{setfeture(e.target.value)}} />
</div>
<div className="mb-3 text-light">
<label htmlFor="exampleFormControlInput1" className="" >
              file name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="The fil name"
              onChange={(e) => {
                setfilName(e.target.value);
              }} />
            <label htmlFor="exampleFormControlInput1" className="">
              file 
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="The full name"
              onChange={handleFile}
            />
          </div>
</div>
<button type="button" className="btn btn-outline-info" 
          onClick={(e) => {
            submitData(e);
            handleFileUpload()
          }}>submit</button>
<button type="button" className="btn btn-outline-danger" onClick={reset}>reset</button>
        </form>
        <img src={formImg} className="img3" />

        </>
    )
}
export default Requirement;
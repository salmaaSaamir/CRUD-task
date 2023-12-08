import { useState,useEffect } from "react";
import '../style/editeForms.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_REQPHASE } from '../Queries'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import {GETTOEDIT_REQPHASE } from '../Queries';
import axios from 'axios'

function UpdateReqPhase() {
    const id =useParams().id
  const   data = useQuery(GETTOEDIT_REQPHASE, {variables:{id:+id}});
    // data.refetch();
    const [intro,setintro] = useState(data.data?.getSpecificReqPhase.intro)
    const [propuse,setpropuse] = useState(data.data?.getSpecificReqPhase.propuse)
    const [audiance,setaudiance] = useState(data.data?.getSpecificReqPhase.audiance)
    const [description,setdescription] = useState(data.data?.getSpecificReqPhase.description)
    const [feature,setfeture] = useState(data.data?.getSpecificReqPhase.feature)
    const [file, setFile] = useState(data.data?.getSpecificReqPhase.file);
    const [file2, setFile2] = useState(data.data?.getSpecificReqPhase.file);
    const [filName, setfilName] = useState(data.data?.getSpecificReqPhase.fileName);
    const [fileContent, setFileContent] = useState('');
    const [phaseName, setphaseName] = useState("requirement");
    const navigate =  useNavigate()
    const  [updateReqPhase]  = useMutation(UPDATE_REQPHASE);
    useEffect(() => {
      if (data.data) {
        setintro(data.data.getSpecificReqPhase.intro);
        setpropuse(data.data.getSpecificReqPhase.propuse);
        setaudiance(data.data.getSpecificReqPhase.audiance);
        setdescription(data.data.getSpecificReqPhase.description);
        setfeture(data.data.getSpecificReqPhase.feature);
        setFile(data.data.getSpecificReqPhase.file);
        setFile2(data.data.getSpecificReqPhase.file);
        setfilName(data.data.getSpecificReqPhase.fileName);
      }
    }, [data]);


    console.log(data)
    const handleFile = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
    const handleFileUpload = (e) => {
      const formData = new FormData();
      formData.append('file', file);
      setFileContent(file['name']); // Set the file name as the fileContent
      axios.post('http://localhost:4000/upload', formData);
    };
    const submitData = (e) => {
      e.preventDefault();

      if (intro !== "" && audiance  != "" && propuse!=="" && description !=="" && feature !=="" ) {
        console.log(filName)
        updateReqPhase({
            variables: {
                id:+id,
                intro: intro,
                propuse: propuse,
                audiance: audiance,
                description: description,
                feature: feature,
                file:file['name'],
                filName:filName,
                phaseName:phaseName
              },
        })
          .then(() => {
            Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              customClass:'addStyle',
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            }).fire({
              icon: "success",
              title: "Data updated successfully",
            });
            navigate("/SDLC");
          })
          .catch((error) => {
            console.error(error); // Handle the error properly, e.g., show an error message
          });
      } else {
        Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        }).fire({
          icon: "error",
          title: "Your data is not completed yet!!",
        });
      }
    };
    function reset(){
      document.getElementById("myForm").reset();
    }
 
  return (
    <>

        <h1 className="text-light text-capitalize text-center formHeader">Requirement phase</h1>
        <form id="myForm" className="form">
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="">introduction</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="introduction"  onChange={(e)=>{setintro(e.target.value)}} defaultValue={data.data?.getSpecificReqPhase.intro}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="f">propuse</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="propuse"  onChange={(e)=>{setpropuse(e.target.value)}} defaultValue={data.data?.getSpecificReqPhase.propuse}/>
</div>
<div className="mb-3 text-light">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">intendce audiance</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="intendce audiance"  onChange={(e)=>{setaudiance(e.target.value)}} defaultValue={data.data?.getSpecificReqPhase.propuse}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">overall description</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="overall description"  onChange={(e)=>{setdescription(e.target.value)}} defaultValue={data.data?.getSpecificReqPhase.description}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">system feature</label>
  <textarea className="form-control w-25 h-25" id="exampleFormControlInput1" placeholder="system feature"  onChange={(e)=>{setfeture(e.target.value)}} defaultValue={data.data?.getSpecificReqPhase.feature}/>
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
                
              }} defaultValue={data.data?.getSpecificReqPhase.fileName} />
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
            
{file&& (
  <img
    src={require(`../Assets/${file2}`)}
    width={100}
    height={100}
    className="mt-4 dImg"
  />
)}        
  </div>
</div>
<button type="button" className="btn btn-outline-info" onClick={(e) =>{ submitData(e);   handleFileUpload()}}>submit</button>
<button type="button" className="btn btn-outline-danger" onClick={reset}>reset</button>
<Link to={'/SDLC'} type="button" className="btn btn-outline-secondary">Back</Link>

        </form>
        <img src={formImg} className="img2" />

    </>
  
  )
}

export default UpdateReqPhase
import { useState ,useEffect } from "react";
import '../style/editeForms.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_INITPHASE } from '../Queries'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import {GETTOEDIT_INITPHASE } from '../Queries';
function UpdateInitPhase() {
    const id =useParams().id
    const data = useQuery(GETTOEDIT_INITPHASE, {variables:{id:+id}});
    data.refetch();
    const [title, setTitle] = useState(data.data?.getSpecificInitPhase.projectTitle);
    const [startDate, setStartDate] = useState(data.data?.getSpecificInitPhase.startDate);
    const [endDate, setEndDate] = useState(data.data?.getSpecificInitPhase.endDate);
    const [budget, setBudget] = useState(data.data?.getSpecificInitPhase.budget);
    const [manager, setManager] = useState(data.data?.getSpecificInitPhase.manager);
    const [scopeStatement, setScopeStatement] = useState(data.data?.getSpecificInitPhase.scopeStatemtn);
    const navigate =  useNavigate()
    const  [updateInitPhase]  = useMutation(UPDATE_INITPHASE);
    console.log(startDate)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    const submitData = (e) => {
      e.preventDefault();
      if (title !=="" && startDate  !== "" && manager !== "" && endDate !=="" && budget !=="") {
        updateInitPhase({
          variables: {
            id:+id,
            projectTitle: title,
            startDate: startDate,
            endDate: endDate,
            manager: manager,
            budget: budget,
            scopeStatment: scopeStatement,
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

        <h1 className="text-light text-capitalize text-center formHeader">Initial phase</h1>
                <form id="myForm" className="Editeform">
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="">projrct title</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the full name"  onChange={(e)=>{setTitle(e.target.value)}} defaultValue={data.data?.getSpecificInitPhase.projectTitle}/>
</div>
<div className="mb-3 text-light">
          <label htmlFor="exampleFormControlInput1" className="f">
            project start date <span className="mx-5 text-warning"> {formatDate(startDate)}</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="the age"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            defaultValue={startDate}
             // Set the value directly from the state variable
          />
        </div>
        <div className="mb-3 text-light">
          <label htmlFor="exampleFormControlInput1" className="f">
            project end date <span className="mx-5 text-warning"> {formatDate(endDate)}</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="the age"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            defaultValue={endDate}
            value={formatDate(endDate)} // Set the value directly from the state variable
          />
        </div>
<div className="mb-3 text-li0ght">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project manager</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setManager(e.target.value)}} defaultValue={data.data?.getSpecificInitPhase.manager}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project budget</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setBudget(e.target.value)}} defaultValue={data.data?.getSpecificInitPhase.budget}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project scop statement</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setScopeStatement(e.target.value)}} defaultValue={data.data?.getSpecificInitPhase.scopeStatment}/>
</div>

</div>
<button type="button" className="btn btn-outline-info" onClick={(e) => submitData(e)}>submit</button>
<button type="button" className="btn btn-outline-danger" onClick={reset}>reset</button>
<Link to={'/SDLC'} type="button" className="btn btn-outline-secondary" onClick={reset}>Back</Link>
        </form>
        <img src={formImg} className="img2" />

    </>
  
  )
}

export default UpdateInitPhase
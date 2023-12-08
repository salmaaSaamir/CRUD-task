import { useState } from "react";
import '../style/addEmp.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_INITPHASE } from '../Queries'
import Swal from "sweetalert2";
function Initial(){
    const [title,settitle] = useState("")
    const [startDate,setstartDate] = useState()
    const [endDate,setendDate] = useState()
    const [budget,setbudget] = useState("")
    const [manager,setmanager] = useState("")
    const [scopeStatemtn,setscopeStatemtn] = useState("")
    const navigate =  useNavigate()
    const [ createFile ] = useMutation(ADD_INITPHASE);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    const submitData = (e) => {
      e.preventDefault();
      if (title !=="" && startDate !== "" && manager !== "" && endDate !== "" && budget !== "" && scopeStatemtn !== "") {
        createFile({
          variables: {
            projectTitle: title,
            startDate: startDate,
            endDate: endDate,
            manager: manager,
            budget: budget,
            scopeStatment: scopeStatemtn,
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
              title: "Data inserted successfully",
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
          customClass:'addStyle',
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
        <h1 className="text-light text-capitalize text-center">Initiation phase</h1>
                <form id="myForm" className="form">
        <div class="mb-3 text-light">
  <label for="exampleFormControlInput1" className="">projrct title</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the full name"  onChange={(e)=>{settitle(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="f">project start date</label>
  <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="the age"  onChange={(e)=>{setstartDate(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="f">project end date</label>
  <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="the age"  onChange={(e)=>{setendDate(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project manager</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setmanager(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project budget</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setbudget(e.target.value)}}/>
</div>
<div className="mb-3 text-light">
  <label for="exampleFormControlInput1" className="form-label">project scop statement</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="the department"  onChange={(e)=>{setscopeStatemtn(e.target.value)}}/>
</div>

</div>
<button type="button" className="btn btn-outline-info" onClick={(e) => submitData(e)}>submit</button>
<button type="button" className="btn btn-outline-danger" onClick={reset}>reset</button>
        </form>
        <img src={formImg} className="img3" />
        </>
    )
}
export default Initial;
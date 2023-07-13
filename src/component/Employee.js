import { useEffect, useState } from "react";
import Nav from "./Nav";
import '../style/listEmp.css'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
function Employee(){
    const [employee, setEmployee] = useState([])
    useEffect(() =>{
        fetch('http://localhost:9000/employees').then((res)=>res.json()).then((data)=> setEmployee(data))
    },[])

    function getEmployee(){
        fetch('http://localhost:9000/employees').then((res)=>res.json()).then((data)=> setEmployee(data))
    }
    function deleteEmployee(employee){
        Swal.fire({
            title:`are you sure you want to delete "${employee.name}"`,
            showCancelButton:true,
            icon:"question"
        }).then((data) =>
        {
            if(data.isConfirmed){
                fetch(`http://localhost:9000/employees/${employee.id}`,{method:"delete"}).then((res) => res.json()).then((data) => getEmployee())
            }
        }
        )
    }
    return (
        <>
        <Nav />
        <table className="table">
  <thead>
    <tr>
      <th scope="col">name</th>
      <th scope="col">age</th>
      <th scope="col">department</th>
      <th scope="col">options</th>
    </tr>
  </thead>
  <tbody>
    {employee.map((emp)=>{
        return(
            <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.department}</td>
                <td>
                    <Link to={`/editemp/${emp.id}`} type="button" className="btn btn-primary">update</Link>
                    <button type="button" className="btn btn-danger" onClick={()=>{deleteEmployee(emp)}}>delete</button>
                </td>
    </tr>
        )
    })}
   
   
  </tbody>
</table>
        </>
    )
}
export default Employee;
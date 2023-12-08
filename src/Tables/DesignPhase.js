import React from 'react'
import { useEffect, useState } from "react";
import '../style/listEmp.css'

import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

import { useMutation, useQuery } from '@apollo/client';
import { GET_DESIGNPHASE, DELETE_DESIGNPHASE } from '../Queries';
import { useNavigate } from "react-router-dom";
function DesignPhase() {

  const designPhase = useQuery(GET_DESIGNPHASE);
  const [ deleteItem ] = useMutation(DELETE_DESIGNPHASE);
  const navigate =  useNavigate()
	designPhase.refetch();
  const DeleteItem=(item)=>{
    console.log(item.id)
    Swal.fire({
        title:`are you sure you want to delete this`,
        showCancelButton:true,
        icon:"question",
        iconColor:'#e63946'
    }).then((data) =>
    {
        if(data.isConfirmed){
          deleteItem({variables:{id:item.id}});
          navigate('/SDLC');
        }
    }
    )
    
}


  return (
   <>
   <h1 className='text-light text-center text-capitalize'>design phase</h1>
           <table className="table x">
  <thead>
    <tr>
      <th scope="col">file anme</th>
      <th scope="col">file</th>
      <th scope="col">options</th>
    </tr>
  </thead>
  <tbody>
    {designPhase.data?.getDesignPhase.map((file)=>{
        return(
            <tr key={file.id}>
                <td>{file.fileName}</td>
                <td>< img src={require(`../Assets/${file.file}`)} width={80} height={80}/></td>
                <td>
                    <Link to={`/editeDesignPhase/${file.id}`} type="button" className="btn btn-primary">update</Link>
                    <button type="button" className="btn btn-danger" onClick={()=>{DeleteItem(file)}}>delete</button>
                </td>
    </tr>
        )
    })}
   
   
  </tbody>
</table>
   </>
  )
}

export default DesignPhase
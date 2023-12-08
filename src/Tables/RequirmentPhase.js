import React from 'react'
import { useEffect, useState } from "react";
import '../style/listEmp.css'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@apollo/client';
import {GET_REQPHASE , DELETE_REQPHASE } from '../Queries';
import { useNavigate } from "react-router-dom";

function RequirmentPhase() {
    const reqPhase = useQuery(GET_REQPHASE);
	const [ deleteItem ] = useMutation(DELETE_REQPHASE,);
  const navigate =  useNavigate()
	reqPhase.refetch();
    function DSeleteItem(item){
        Swal.fire({
            title:`are you sure to delete this`,
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
   <h1 className='text-light text-center text-capitalize'>requirement phase</h1>
           <table className="table x">
  <thead>
    <tr>
      <th scope="col">intro</th>
      <th scope="col">propuse</th>
      <th scope="col">audiance</th>
      <th scope="col">description</th>
      <th scope="col">feature</th>
      <th scope="col">file</th>
      <th scope="col">options</th>
    </tr>
  </thead>
  <tbody>
    {reqPhase.data?.getReqPhase.map((item)=>{
        return(
            <tr key={item.id}>
                <td>{item.intro}</td>
                <td>{item.propuse}</td>
                <td>{item.audiance}</td>
                <td>{item.description}</td>
                <td>{item.feature}</td>
                <td><img src={require(`../Assets/${item.file}`)} className='rounded-circle' width={100} height={100} /></td>
                <td>
                    <Link to={`/editeReqPhase/${item.id}`} type="button" className="btn btn-primary">update</Link>
                    <button type="button" className="btn btn-danger" onClick={()=>{DSeleteItem(item)}}>delete</button>
                </td>
    </tr>
        )
    })}
   
   
  </tbody>
</table>
   </>
  )
}

export default RequirmentPhase
import React from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INITPHASE, DELETE_INITPHASE } from '../Queries';
import { useNavigate } from "react-router-dom";

function InitialPhase() {
  const initPhase = useQuery(GET_INITPHASE);
  const [deleteItem] = useMutation(DELETE_INITPHASE);
  const navigate = useNavigate();
  initPhase.refetch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const DeleteItem = (item) => {
    Swal.fire({
      title: `Are you sure you want to delete "${item.name}"?`,
      showCancelButton: true,
      icon: "question",
      iconColor: '#e63946'
    }).then((data) => {
      if (data.isConfirmed) {
        deleteItem({ variables: { id: item.id } });
        navigate('/SDLC');
      }
    });
  };

  return (
    <>
      <h1 className='text-light text-center text-capitalize'>initiation  Phase</h1>
      <table className="table x">
        <thead>
          <tr>
            <th scope="col">projectTitle</th>
            <th scope="col">startDate</th>
            <th scope="col">endDate</th>
            <th scope="col">manager</th>
            <th scope="col">budget</th>
            <th scope="col">scopeStatment</th>
            <th scope="col">options</th>
          </tr>
        </thead>
        <tbody>
          {initPhase.data?.getInitPhase.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.projectTitle}</td>
                <td>{formatDate(item.startDate)}</td>
                <td>{formatDate(item.endDate)}</td>
                <td>{item.manager}</td>
                <td>{item.budget}</td>
                <td>{item.scopeStatment}</td>
                <td>
                  <Link to={`/editeInitPhase/${item.id}`} type="button" className="btn btn-primary">update</Link>
                  <button type="button" className="btn btn-danger" onClick={() => { DeleteItem(item) }}>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default InitialPhase;
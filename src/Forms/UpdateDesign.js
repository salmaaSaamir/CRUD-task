import React, { useState } from 'react';
import '../style/editeForms.css'
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { EDIT_DESIGNPHASE,GETTOEDIT_DESIGNPHASE } from '../Queries'
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'
// Rest of your imports

function UpdateDesign() {
  const id = useParams().id;
  const { loading, data } = useQuery(GETTOEDIT_DESIGNPHASE, {
    variables: { id: +id },
  });
  const [file, setFile] = useState('');
  const [filName, setfilName] = useState(data?.getSpecificDesignPhase?.fileName);
  const [phaseName, setphaseName] = useState('design');
  const [fileContent, setFileContent] = useState('');

  const navigate = useNavigate();
  const file2 = data?.getSpecificDesignPhase?.file ?? '';
  const fileName2 = data?.getSpecificDesignPhase?.fileName ?? '';
  const [UpdateDesignPhase] = useMutation(EDIT_DESIGNPHASE);
console.log(filName)
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = (e) => {
    const formData = new FormData();
    formData.append('file', file);
    // setFileContent(file.name); // Set the file name as the fileContent
    axios.post('http://localhost:4000/upload', formData);
  };

  function submitData(e) {
    e.preventDefault();

    if (filName !== "") {
      console.log(fileName2,filName)
      handleFileUpload(); // Upload the file before updating the design phase

      UpdateDesignPhase({ variables: { id: +id, fileName: filName, file: file.name, phaseName: phaseName } })
        .then(() => {
          navigate('/SDLC');
          Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: 'addStyle',
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          }).fire({
            icon: 'success',
            title: 'Data Updated successfully',
          });
        });
    } else {
      Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      }).fire({
        icon: 'error',
        title: 'Your data is not completed yet!!',
      });
    }
  }

  function reset() {
    document.getElementById('myForm').reset();
  }

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while the data is being fetched
  }

  return (
    <>
      <h1 className="text-light text-capitalize text-center formHeader">Design phase</h1>
      <form id="myForm" className="Editeform">
        <div className="mb-3 text-light">
          <label htmlFor="exampleFormControlInput1" className="">
            file name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="The fil name"
            onChange={(e) => {
              setfilName(e.target.value);
            }}
            defaultValue={fileName2}
          />
          <label htmlFor="exampleFormControlInput1" className="">
            file
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={handleFile}
          />
          <img src={require(`../Assets/${file2}`)} width={100} height={100} className="m-2 my-4" />
        </div>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={(e) => {
            handleFileUpload();
            submitData(e);
          }}
        >
          Update
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={reset}>
          reset
        </button>
        <Link to={'/SDLC'} type="button" className="btn btn-outline-secondary" onClick={reset}>
          Back
        </Link>
      </form>
      <img src={formImg} className="img2" />
    </>
  );
}

export default UpdateDesign;
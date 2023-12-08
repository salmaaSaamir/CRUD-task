import React, { useState, useEffect } from 'react';
import '../style/addEmp.css';
import formImg from '../Fill out-rafiki.svg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { ADD_File } from '../Queries';

function Design() {
  const [createFile] = useMutation(ADD_File);
  const [count, setCount] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [phaseName, setPhaseName] = useState('design');
  const navigate = useNavigate();
  const handleFile = (e, index) => {
    const selectedFile = e.target.files[0];
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[index] = {
        name: updatedDocuments[index] ? updatedDocuments[index].name : '',
        file: selectedFile,
      };
      return updatedDocuments;
    });
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post('http://localhost:4000/upload', formData)
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
  };

  function submitData(e) {
    e.preventDefault();

    const promises = [];
    let allDataComplete = true;
    if(documents.length == 0 || documents.length<count){
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
        icon: 'error',
        title: 'Your data is not completed yet!!',
      })
    }else{
      for (let i = 0; i < count; i++) {
        if(documents.length == count){
          if (documents[i].file !== null && documents[i].name!=='' && documents[count-1].file !==null) {
            const formData = new FormData();
            formData.append('file', documents[i].file);
    
            promises.push(
              createFile({
                variables: { fileName: documents[i].name, file: documents[i].file.name, phaseName: phaseName },
              })
            );
            
            handleFileUpload(documents[i].file);
          }else {
            console.log("errrrrrrr")
            allDataComplete = false;
            break; // Exit the loop if any document data is incomplete
          }
        }else{
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
            icon: 'error',
            title: 'Your data is not completed yet!!',
          });
        }
        
      }
      if (allDataComplete) {
        Promise.all(promises)
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
              title: 'Data inserted successfully',
            });
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });}
       else {
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
          icon: 'error',
          title: 'Your data is not completed yet!!',
        });
      }
    }
    
  }


  function reset() {
    document.getElementById('myForm').reset();
  }

  const renderFormFields = () => {
    const formFields = [];

    for (let index = 0; index < count; index++) {
      formFields.push(
        <React.Fragment key={index}>
          <div className="mb-3 text-light">
            <label htmlFor={`documentName${index}`} className="">
              File name
            </label>
            <input
              type="text"
              className="form-control"
              id={`documentName${index}`}
              placeholder="The file name"
              onChange={(e) => {
                const { value } = e.target;

                setDocuments((prevDocuments) => {
                  const updatedDocuments = [...prevDocuments];
                  updatedDocuments[index] = {
                    name: value,
                    file: updatedDocuments[index] ? updatedDocuments[index].file : null,
                  };
                  return updatedDocuments;
                });
              }}
            />
            <label htmlFor={`documentFile${index}`} className="">
              File
            </label>
            <input
              type="file"
              className="form-control"
              id={`documentFile${index}`}
              name={`file${index}`}
              onChange={(e) => handleFile(e, index)}
            />
          </div>
        </React.Fragment>
      );
    }
    return formFields;
  };

  return (
    <>
      <div className="d-flex  align-items-center justify-content-center">
        <h1 className="text-light text-capitalize head">Design phase</h1>
        <button className="btn btn-outline-warning m-3" onClick={() => { setCount(count + 1) }}>add new document</button>
      </div>
      <form id="myForm" className='form' encType='multipart/form-data'>
        {renderFormFields()}
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={submitData}
        >
          Submit
        </button>
        <button type="button" className="btn btn-outline-danger" onClick={reset}>
          Reset
        </button>
      </form>
      <img src={formImg} className="img3" alt="Form" />
    </>
  );
}

export default Design;


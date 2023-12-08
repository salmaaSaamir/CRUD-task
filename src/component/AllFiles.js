import {  useState } from "react";
import '../style/listEmp.css'
import { useQuery } from '@apollo/client';
import { GET_FILES, GET_REQPHASE } from '../Queries';
function AllFiles(){
    const [specificFile,setSpecificFile] = useState({})
    const files = useQuery(GET_FILES);
    const files2 = useQuery(GET_REQPHASE);
   files.refetch()
   files2.refetch()
    const setFile=(file)=>{
        setSpecificFile(file)
    }
    const obj2 = { city: 'New York', country: 'USA' };
    const combinedObj = [files.data?.getFiles,files2.data?.getReqPhase];
    console.log(combinedObj);
    
    //console.log(files.data?.getFiles, typeof files2.data?.getReqPhase)
    return (
        <>
        <table className="table x">
  <thead>
    <tr>
      <th scope="col">file name</th>
      <th scope="col">file </th>
      <th scope="col">phase name</th>
    </tr>
  </thead>
  <tbody>
    {files.data?.getFiles.map((file)=>{
        return(
            <tr key={file.id}>
                <td>
{file.fileName}

                </td>
                <td><img src={require(`../Assets/${file.file}`)} width={100} height={100} className="rounded-circle hoevredImg"  onClick={()=>{setFile(file)}} /></td>

<td>
  {file.phaseName}
</td>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">

</div>
    </tr>
        )
    })}
    {files2.data?.getReqPhase.map((file)=>{
        return(
            <tr key={file.id}>
                <td >
{file.fileName}

                </td>
                <td><img src={require(`../Assets/${file.file}`)} width={100} height={100} className="rounded-circle hoevredImg"  onClick={()=>{setFile(file)}} /></td>
<td>
{file.phaseName}
</td>
    </tr>
        )
    })}
  </tbody>
</table>


        </>
    )
}
export default AllFiles;
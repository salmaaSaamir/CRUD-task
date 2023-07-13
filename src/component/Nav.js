import { Link } from "react-router-dom";
import '../style/nav.css'
function Nav(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand">CRUD Operations</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <Link to={'/'} className="btn btn-outline-success m-3">home</Link>
      <Link to={'/employee'} className="btn btn-outline-success m-3">list the employee</Link>
      <Link to={'/addemp'} className="btn btn-outline-success m-3">add employee</Link>
    </div>
  </div>
</nav>
       
        </>
    )
}
export default Nav;
import '../style/home.css'
import homeImg from '../Company-amico.svg';
function Home(){
    return(
        <>
       
        <img src={homeImg} alt="" className='img'/>
        <div className='welcomText'>
            <h1>welcome in the SWD system</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>
       
        </>  
    )
}
export default Home;
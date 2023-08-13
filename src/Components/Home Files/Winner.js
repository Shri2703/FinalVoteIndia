import './Winner.css'
import winner from './Images/2.jpg'
function Winner(){
    return(
        <div className="winner">
            <h1>Winner</h1>
            <center><img src={winner}/></center>
            <center><h3>Indian National Congress (INC)</h3></center>
            <p>No.of.Votes : 350</p>
        </div>
    )
}
export default Winner

import Voting from './Voting';
import congress from '../Home Files/Images/2.jpg';
import lotus from '../Home Files/Images/1.png';
import four from '../Home Files/Images/4.jpg'
import Sun from '../Home Files/Images/3.jpg'
import amma from '../Home Files/Images/5.jpg'
import drums from '../Home Files/Images/6.jpg'
import star from '../Home Files/Images/7.jpg'
import seeman from '../Home Files/Images/8.jpg'
import muslim from '../Home Files/Images/9.png'
//import CountdownTimer from '../Home Files/Timer';
import './MainVoting.css'
import {Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import CountdownTimer from '../Home Files/Timer';
import {contractAbi, contractAddress} from '../../Constant/constant';
import {ethers} from 'ethers';



function MainVoting() {
    const data = [
      { name : "(INC)", img:congress},
      { name : "(BJP)", img:lotus},
      { name : "(DMK)", img:Sun},
      { name : "(CPI)", img:four},
      { name : "(AIADMK)", img:amma},
      { name : "(DMDK)", img:drums},
      { name : " (VCK)", img:star},
      { name : "NT", img:seeman},
      { name : "IUML", img:muslim},
    ];
    


    const [candidates, setCandidates] = useState([]);
 
  

 
  const [votingOver, setVotingOver] = useState(false);

  const handleVotingOver = () => {
    setVotingOver(true);
  };

  const toast = useRef(null);

//4/8 code

  const handleVote = async (index) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.vote(index);
      await tx.wait();

      // Update the UI to reflect the new vote count
      setCandidates(prevCandidates => {
        const updatedCandidates = [...prevCandidates];
        updatedCandidates[index].voteCount++;
        // return updatedCandidates;
        console.log(`Vote count for ${updatedCandidates[index].name}: ${updatedCandidates[index].voteCount}`);
        return updatedCandidates;
      });

      toast.current.show({
        severity: 'success',
        summary: 'Vote Successful',
        detail: 'You have successfully voted',
        life: 3000
      });
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: 'error',
        summary: 'Vote Failed',
        detail: 'An error occurred while voting',
        life: 3000
      });
    }
  };
  
  return (
    <div >
      <div>
        <Link to={'/'}><button className='nav-links'><i class="fa-solid fa-arrow-left"></i>Back to Home</button></Link>
      </div>
      <div className='title'>
        
        <div>
        <h1>Candidates</h1>
        <p>Vote for your Favourite Candidate.</p>
        </div>
        <div className='time'>
        <CountdownTimer/>
        </div>

      </div>
      <div className="App1">
      {data.map((item, index) => (
        <Voting key={index} img={item.img} name={item.name} index={index} votingOver={votingOver}
        handleVotingOver={handleVotingOver} />
      ))}
    </div>
    </div>
  )
}

export default MainVoting;

// function MainVoting() {

//   const [candidates, setCandidates] = useState([]);
 
  

 
//   const [votingOver, setVotingOver] = useState(false);

//   const handleVotingOver = () => {
//     setVotingOver(true);
//   };

//   const toast = useRef(null);

// //4/8 code

//   const handleVote = async (index) => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       const contractInstance = new ethers.Contract(
//         contractAddress, contractAbi, signer
//       );

//       const tx = await contractInstance.vote(index);
//       await tx.wait();

//       // Update the UI to reflect the new vote count
//       setCandidates(prevCandidates => {
//         const updatedCandidates = [...prevCandidates];
//         updatedCandidates[index].voteCount++;
//         //return updatedCandidates;
//         console.log(`Vote count for ${updatedCandidates[index].name}: ${updatedCandidates[index].voteCount}`);
//         return updatedCandidates;
//       });

//       toast.current.show({
//         severity: 'success',
//         summary: 'Vote Successful',
//         detail: 'You have successfully voted',
//         life: 3000
//       });
//     } catch (error) {
//       console.error(error);
//       toast.current.show({
//         severity: 'error',
//         summary: 'Vote Failed',
//         detail: 'An error occurred while voting',
//         life: 3000
//       });
//     }
//   };
//   const data = [
//     { name : "Indian National Congress (INC)", img:congress},
//     { name : "Bharatiya Janata Party (BJP)", img:lotus},
//     { name : "Dravida Munnetra Kazhagam (DMK)", img:Sun},
//     { name : "Communist Party of India (CPI)", img:four},
//     { name : "All India Anna Dravida Munnetra Kazhagam (AIADMK)", img:amma},
//     { name : "Desiya Murpokku Dravida Kazhagam (DMDK)", img:drums},
//     { name : "Viduthalai Chiruthaigal Katchi (VCK)", img:star},
//     { name : "Naam Tamilar", img:seeman},
//     { name : "Indian Union Muslim League", img:muslim},
//   ];


//   useEffect(() => {
//     // Initialize candidates state with data
//     setCandidates(data.map((item) => ({
//       ...item,
//       voteCount: 0,
//     })));
//   }, []);



// return (
//   <div >
//     <div>
//       <Link to={'/'}><button className='nav-links'><i class="fa-solid fa-arrow-left"></i>Back to Home</button></Link>
//     </div>
//     <div className='title'>
      
//       <div>
//       <h1>Candidates</h1>
//       <p>Vote for your Favourite Candidate.</p>
//       </div>
//       <div className='time'>
//       <CountdownTimer/>
//       </div>

//     </div>
//     <div className="App1">
//         {candidates.map((candidate, index) => (
//           <Voting key={index} candidate={candidate} votingOver={votingOver} handleVotingOver={handleVotingOver} handleVote={() => handleVote(index)} />
//         ))}
//       </div>
//       <div className="App1">
//         {candidates.map((candidate, index) => (
//           <Voting
//             key={index}
//             candidate={candidate}
//             votingOver={votingOver}
//             handleVotingOver={handleVotingOver}
//             handleVote={() => handleVote(index)}
//             toast={toast} // Pass the toast ref as a prop
//           />
//   ))}
// </div>
//     {/* <div className="App1">
//     {data.map((item, index) => (
//       <Voting key={index} img={item.img} name={item.name} index={index} votingOver={votingOver}
//       handleVotingOver={handleVotingOver} />
//     ))}
//   </div> */}
//   </div>
// )
// }

// export default MainVoting;
// import Voting from './Voting';
// import congress from './Images/2.jpg';
// import lotus from './Images/1.png';
// import four from './Images/4.jpg'
// import Sun from './Images/3.jpg'
// import amma from './Images/5.jpg'
// import drums from './Images/6.jpg'
// import star from './Images/7.jpg'
// import seeman from './Images/8.jpg'
// import muslim from './Images/9.png'
// import CountdownTimer from './Timer';
// import './MainVoting.css'
// import {Link } from "react-router-dom";
// import React, { useState } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import "./Voting.css";
import { ethers } from 'ethers';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const Voting = (props) => {


  const { index, candidate, votingOver, handleVotingOver, contractInstance } = props;
  const styles = {
    width: "120px",
    marginTop: "1rem"
  };

  const [timer, setTimer] = useState(120);
  const [timerEnded, setTimerEnded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [voted, setVoted] = useState(false);
  const [greenCardIndex, setGreenCardIndex] = useState(null);
  const [isCardGreen, setIsCardGreen] = useState(false);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Click cast vote to finalize your vote', life: 3000 });
    // console.log('Button clicked! Index:', props.index);
    props.handleVotingOver();
    setVoted(true);
    
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }


  const handleVote = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Voted',
      detail: 'You have voted',
      life: 3000
    });
    setVoted(true);
  };

  const handleReject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000
    });
  };

  const handleVoteButtonClick = () => {
    if (timerEnded || props.votingOver) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleCastVote = () => {
    if (voted) {
      setGreenCardIndex(index); // Log the index of the green card
      setIsCardGreen(true);
      handleVotingOver();
    } else {
      handleVote();
      handleVotingOver();
    }
  };

  const handleRejectVote = () => {
    if (!voted) {
      handleReject();
      handleVotingOver();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setTimerEnded(true);
    }
  }, [timer]);

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;
    const cardStyles = {
      width: "30%",
      color: "#fff",
      borderRadius: "15px",
      margin: "10rem auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "4rem",
      padding: "1rem", // Add padding for better spacing
      backgroundColor: isCardGreen ? "green" : "black"
    };
  return (
    <div className="voting" style={cardStyles}>
      <img src={props.img} style={styles} />
      <div className="content">
        <h2>{props.name}</h2>
        <Toast ref={toast} />
        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
          header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        {/* Disable the button when timer ends or if the user has already voted */}
        <Button
        onClick={handleVoteButtonClick}
        icon="pi pi-check"
        label="Vote"
        className="mr-2"
        disabled={timerEnded || props.votingOver}
      />
      </div>
      {voted && (
        <>
        <Toast ref={toast} />
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Are you sure you want to proceed?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={accept}
          reject={reject}
        />
        <Button
          onClick={()=>handleCastVote(index)}
          label="Cast Vote"
          disabled={isCardGreen}
        />
      </>
        
      )}
      {greenCardIndex !== null && (
        <>
        <p>Green card index: {greenCardIndex}</p>
        <p>Voted Succesfully</p>
        </>
        
      )}

{/* <div className={`voting-card ${isCardGreen ? 'voting-card-green' : ''}`}>
      <h2>{candidate.index}</h2>
      <p>Vote Count: {candidate.voteCount}</p>
      <div className="button-container">
        <Button label="Vote" onClick={handleCastVote} className="p-button-success" />
        <Button label="Reject" onClick={handleRejectVote} className="p-button-danger" />
      </div>
      <Toast ref={toast} />
    </div> */}
    </div>

    
  )
}

export default Voting;



// const Voting = (props) => {
//   // const vote = 'yes'; // Replace 'yes' with the appropriate value


//   const toast = useRef(null);


//   const {
//     candidate,
//     index,
//     votingOver,
//     handleVotingOver,
//     voteFunction,
//     contractInstance,
  
//   } = props;


//   const styles = {
//     width: "120px",
//     marginTop: "1rem"
//   };

//   const [timer, setTimer] = useState(120);
//   const [timerEnded, setTimerEnded] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [voted, setVoted] = useState(false);
//   const [greenCardIndex, setGreenCardIndex] = useState(null);
//   const [isCardGreen, setIsCardGreen] = useState(false);
 

//   const accept = () => {
//     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Click cast vote to finalize your vote', life: 3000 });
//     // console.log('Button clicked! Index:', props.index);
//     props.handleVotingOver();
//     setVoted(true);
    
//   }

//   const reject = () => {
//     toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//   }
//   const handleCastVote = async () => {
//     if (voted) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         const contractInstance = new ethers.Contract(
//           contractAddress, // Replace with your contract address
//           contractAbi,     // Replace with your contract ABI
//           signer
//         );

//         const tx = await contractInstance.vote(props.index);
//         await tx.wait();

//         // Update the UI, etc.
//         console.log(`Vote successful for index ${props.index}`);
//       } catch (error) {
//         console.error(error);
//         toast.current.show({
//           severity: 'error',
//           summary: 'Vote Failed',
//           detail: 'An error occurred while voting',
//           life: 3000
//         });
//       }
//     }
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (timer === 0) {
//       setTimerEnded(true);
//     }
//   }, [timer]);

  

// const handleVote = async (index) => {
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
  

//   const formattedTime = `${Math.floor(timer / 60)
//     .toString()
//     .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;
//     const cardStyles = {
//       width: "30%",
//       color: "#fff",
//       borderRadius: "15px",
//       margin: "10rem auto",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginTop: "4rem",
//       padding: "1rem", // Add padding for better spacing
//       backgroundColor: isCardGreen ? "green" : "black"
//     };
//   return (
//     <div className="voting" style={cardStyles}>
//       <img src={props.img} style={styles} />
//       <div className="content">
//         <h2>{props.name}</h2>
//         <Toast ref={toast} />
//         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
//           header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
//         {/* Disable the button when timer ends or if the user has already voted */}
//         <Button onClick={() =>(timerEnded || props.votingOver) ? setVisible(false) : setVisible(true)}
//         icon="pi pi-check"
//         label="Vote"
//         className="mr-2"
//         disabled={timerEnded || props.votingOver} />
//       </div>
//       {voted && (
//         <>
//         <Toast ref={toast} />
//         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
//           header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
//         <Button onClick={handleCastVote} label="Cast Vote" disabled={isCardGreen}/>
//         </>
        
//       )}
//       {greenCardIndex !== null && (
//         <>
//         <p>Green card index: {greenCardIndex}</p>
//         <p>Voted Succesfully</p>
//         </>
        
//       )}
//     </div>
//   )
// }

// export default Voting;


// // const Voting = (props) => {
// //   const styles = {
// //     width: "120px",
// //     marginTop: "1rem"
// //   };


  

// //   const [timer, setTimer] = useState(120);
// //   const [timerEnded, setTimerEnded] = useState(false);
// //   const [visible, setVisible] = useState(false);
// //   const toast = useRef(null);

// //   const accept = () => {
// //     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully voted', life: 3000 });
// //     console.log('Button clicked! Index:', props.candidate.index);
// //     props.handleVotingOver();
    
// //   }

// //   const reject = () => {
// //     toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
// //   }

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setTimer((prevTimer) => prevTimer - 1);
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     if (timer === 0) {
// //       setTimerEnded(true);
// //     }
// //   }, [timer]);

// //   const formattedTime = `${Math.floor(timer / 60)
// //     .toString()
// //     .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

// //   return (
// //     <div className="voting">
// //       <img src={props.candidate.img} style={styles}  alt={props.candidate.name}/>
// //       <div className="content">
// //         <h2>{props.candidate.name}</h2>
// //         <Toast ref={toast} />
// //         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
// //           header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
// //         {/* Disable the button when timer ends or if the user has already voted */}
// //         <Button onClick={() =>(timerEnded || props.votingOver) ? setVisible(false) : setVisible(true)}
// //         icon="pi pi-check"
// //         label="Vote"
// //         className="mr-2"
// //         disabled={timerEnded || props.votingOver} />
// //         <div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Voting;

// // import React, { useState, useRef, useEffect } from 'react';
// // import "./Voting.css";
// // import { Button } from 'primereact/button';
// // import { ConfirmDialog } from 'primereact/confirmdialog';
// // import { Toast } from 'primereact/toast';

// // const Voting = (props) => {
// //   const styles = {
// //     width: "120px",
// //     marginTop: "1rem"
// //   };

// //   const [timer, setTimer] = useState(120);
// //   const [timerEnded, setTimerEnded] = useState(false);
// //   const [visible, setVisible] = useState(false);
// //   const toast = useRef(null);

// //   const accept = () => {
// //     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully voted', life: 3000 });
// //     console.log('Button clicked! Index:', props.index);
// //     props.handleVotingOver();
    
// //   }

// //   const reject = () => {
// //     toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
// //   }

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setTimer((prevTimer) => prevTimer - 1);
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     if (timer === 0) {
// //       setTimerEnded(true);
// //     }
// //   }, [timer]);

// //   const formattedTime = `${Math.floor(timer / 60)
// //     .toString()
// //     .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

// //   return (
// //     <div className="voting">
// //       <img src={props.img} style={styles} />
// //       <div className="content">
// //         <h2>{props.name}</h2>
// //         <Toast ref={toast} />
// //         <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
// //           header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
// //         {/* Disable the button when timer ends or if the user has already voted */}
// //         <Button onClick={() =>(timerEnded || props.votingOver) ? setVisible(false) : setVisible(true)}
// //         icon="pi pi-check"
// //         label="Vote"
// //         className="mr-2"
// //         disabled={timerEnded || props.votingOver} />
// //         <div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Voting
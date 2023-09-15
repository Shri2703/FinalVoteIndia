import { useState, useEffect,useRef} from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/LoginFiles/Login';
import Finished from './Components/Finished';
//import Connected from './Components/Connected';
import './App.css';
import Home from './Components/Home Files/Home';
import Signup from './Components/LoginFiles/Signup';
import Votepage from './Components/UserpageFiles/Votepage';
import MainVoting from './Components/VotingareaFiles/MainVoting';
import {connectWallet} from './Components/LoginFiles/Login';
//import contractAbi from './Constant/constant'; // Import the ABI
//import { ethers } from 'ethers';
import Voting from './Components/VotingareaFiles/Voting';

//import { Toast } from 'primereact/toast';

//const contractInstance = new ethers.Contract(contractAddress, contractAbi, providerOrSigner);


//import Connected from './Components/VotingareaFiles/Connected';
function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);

  const index = 0; // Replace 0 with the appropriate value
 
  const [votingOver, setVotingOver] = useState(false);

  const handleVotingOver = () => {
    setVotingOver(true);
  };

  const toast = useRef(null);

  const providerOrSigner = new ethers.providers.Web3Provider(window.ethereum);

  const handleCastVote = async (index) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress, // Replace with your contract address
        contractAbi,     // Replace with your contract ABI
        signer
      );

      const tx = await contractInstance.vote(index);
      await tx.wait();

      // Update the UI, etc.
      console.log(`Vote successful for index ${index}`);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
  
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []); // Empty dependency array
  

  
  async function fetchCanVote() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);

  }

  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber()
        }
      });
      setCandidates(formattedCandidates);
  }


  async function getCurrentStatus() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setremainingTime(parseInt(time, 16));
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      fetchCanVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }


  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
       <Router>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/signup' element = {<Signup />}></Route>
          <Route path='/Votepage'element={<Votepage />}></Route>
          {/* <Route path='/Connected'element={<Connected  />}></Route> */}
          <Route path='/MainVoting'element={<MainVoting />}></Route>  
          {/* <Route exact path="/connected" component={Connected} /> */}
        </Routes>
         
         <Voting
            key={index}
            candidate={candidates} // Replace with the appropriate value
            index={index} 
            votingOver={votingOver}
            handleVotingOver={handleVotingOver}
            handleCastVote={handleCastVote}
            contractInstance={new ethers.Contract(contractAddress, contractAbi, providerOrSigner)}// Replace with the appropriate value
        />

        {/* { votingStatus ? (isConnected ? (<Connected 
                      account = {account}
                      candidates = {candidates}
                      remainingTime = {remainingTime}
                      number= {number}
                      handleNumberChange = {handleNumberChange}
                      voteFunction = {vote}
                      showButton = {CanVote}/>) 
                      
                      : 
                      
                      (<Login connectWallet = {connectToWallet} />)) : (<Finished />)} */}
      
      
      
      </Router>
    </div>
  );
}
export default App;



  // async function connectToMetamask() {
  //   if (window.ethereum) {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       setProvider(provider);
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();
  //       setAccount(address);
  //       console.log("Metamask Connected : " + address);
  //       setIsConnected(true);
  //       canVote();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     console.error("Metamask is not detected in the browser")
  //   }
  // }

  // const handleVote = async (index) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract(
  //       contractAddress, contractAbi, signer
  //     );
  
  //     // Call the vote function on the smart contract
  //     const tx = await contractInstance.vote(index);
  //     await tx.wait();
  
  //     // Update the UI to reflect the new vote count
      
  //     setCandidates(prevCandidates => {
  //       const updatedCandidates = [...prevCandidates];
  //       updatedCandidates[index].voteCount++;
  //       return updatedCandidates;
  //     });
  
  //     toast.current.show({
  //       severity: 'success',
  //       summary: 'Vote Successful',
  //       detail: 'You have successfully voted',
  //       life: 3000
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast.current.show({
  //       severity: 'error',
  //       summary: 'Vote Failed',
  //       detail: 'An error occurred while voting',
  //       life: 3000
  //     });
  //   }
  // };
  
  // async function vote(index) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract (
  //       contractAddress, contractAbi, signer
  //     );

  //     const tx = await contractInstance.vote(index);
  //     await tx.wait();
  //     canVote();
  //     alert("done")
  // }

 // const handleVote = async (index) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract(
  //       contractAddress, contractAbi, signer
  //     );

  //     const tx = await contractInstance.vote(index);
  //     await tx.wait();

  //     // Update the UI to reflect the new vote count
  //     setCandidates(prevCandidates => {
  //       const updatedCandidates = [...prevCandidates];
  //       updatedCandidates[index].voteCount++;
  //       //return updatedCandidates;
  //       console.log(`Vote count for ${updatedCandidates[index].name}: ${updatedCandidates[index].voteCount}`);
  //       return updatedCandidates;
  //     });

  //     toast.current.show({
  //       severity: 'success',
  //       summary: 'Vote Successful',
  //       detail: 'You have successfully voted',
  //       life: 3000
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast.current.show({
  //       severity: 'error',
  //       summary: 'Vote Failed',
  //       detail: 'An error occurred while voting',
  //       life: 3000
  //     });
  //   }
  // };
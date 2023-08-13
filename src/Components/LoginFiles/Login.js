
import React, { useState } from 'react';
import Web3 from 'web3';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockOpenIcon from '@mui/icons-material/LockOpen';

  



function Login(props) {
  const [aadharNumber, setAadharNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDataFilled, setIsDataFilled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState('');
  const web3 = new Web3(window.ethereum);



  
  const navigate = useNavigate();

  // const connectWallet = async () => {
  //   try {
  //     if (window.ethereum) {
  //       await window.ethereum.enable();
  //       const accounts = await web3.eth.getAccounts();
  //       setAccount(accounts[0]);
  //       setIsWalletConnected(true);
  //     } else {
  //       alert('Metamask not detected. Please install Metamask and try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error connecting to wallet:', error);
  //   }
  // };


   
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (aadharNumber.trim() === '' || userName.trim() === '' || password.trim() === '') {
      setIsDataFilled(false);
      return;
    }

    if (isWalletConnected) {
      alert('Please connect your MetaMask wallet before proceeding.');
      return;
    }

    // Perform further actions or navigate to the vote page if all validations pass.
    navigate('/Votepage', { state: { userName, aadharNumber, metaMaskID: account } });
  };

  return (
    <div className="login">
      <div className="backhome">
        <Link to={'/'}>
          <button className="nav-links">
            <i className="fa-solid fa-arrow-left"></i>Back to Home
          </button>
        </Link>
      </div>
      <div className="box-login">
        <form onSubmit={handleFormSubmit}>
          <h3 className="head">Sign In</h3>
          <div className="mb-2">
            <VerifiedUserIcon className="icon" />
            <label htmlFor="uid"></label>
            <input
              type="tel"
              maxLength="12"
              placeholder="Enter AADHAR-NUMBER"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <AccountCircleIcon className="icon" />
            <label htmlFor="uname"></label>
            <input
              type="text"
              placeholder="Enter User-Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <LockOpenIcon className="icon" />
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="remember-forget">
            <input
              type="checkbox"
              className="custom-control custom checkbox "
              id="check"
            />
            <label htmlFor="check" className="custom-input-label">
              Remember me
            </label>
          </div>

          <div className="btn-login">
            <button className="btn btn-primary" onClick={props.connectToMetamask}>
              Connect-Wallet
            </button>
          </div>

          <br />
          <div className="btn-login">
            <button type="submit" className="btn btn-primary">
              Sign-In
            </button>
          </div>
          <div className="register-link">
            <p>
              Not a user? <Link to="/signup">Sign-Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
// export { connectWallet };


// //final code
// import React, { useState } from 'react';
// import Web3 from 'web3';
// import {ethers} from 'ethers';
// import './Login.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// //import { connectWallet } from './Components/UserpageFiles/walletUtils'

// function Login() {
//   // const [provider, setProvider] = useState(null);
//   // const [isConnected, setIsConnected] = useState(false);
//   // const [CanVote, setCanVote] = useState(true);
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [isDataFilled, setIsDataFilled] = useState(true);
//   const [isWalletConnected, setIsWalletConnected] = useState(false);
//   const [account, setAccount] = useState('');

//   const navigate = useNavigate();

//   const web3 = new Web3(window.ethereum);
 
//   // async function canVote() {
//   //       const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //       await provider.send("eth_requestAccounts", []);
//   //       const signer = provider.getSigner();
//   //       const contractInstance = new ethers.Contract (
//   //         contractAddress, contractAbi, signer
//   //       );
//   //       const voteStatus = await contractInstance.voters(await signer.getAddress());
//   //       setCanVote(voteStatus);
//   //       }

//   // async function connectToMetamask() {
//   //     if (window.ethereum) {
//   //       try {
//   //         const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //         setProvider(provider);
//   //         await provider.send("eth_requestAccounts", []);
//   //         const signer = provider.getSigner();
//   //         const address = await signer.getAddress();
//   //         setAccount(address);
//   //         console.log("Metamask Connected : " + address);
//   //         setIsConnected(true);
//   //         //canVote();
//   //       } catch (err) {
//   //         console.error(err);
//   //       }
//   //     } else {
//   //       console.error("Metamask is not detected in the browser")
//   //     }
//   //   }

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//         setIsWalletConnected(true);
//       } else {
//         alert('Metamask not detected. Please install Metamask and try again.');
//       }
//     } catch (error) {
//       console.error('Error connecting to wallet:', error);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     if (aadharNumber.trim() === '' || userName.trim() === '' || password.trim() === '') {
//       setIsDataFilled(false);
//       return;
//     }

//     if (!isWalletConnected) {
//       alert('Please connect your MetaMask wallet before proceeding.');
//       return;
//     }

//     // Perform further actions or navigate to the vote page if all validations pass.
//     navigate('/Votepage',{state:{userName,aadharNumber}});
//   };

//   return (
//     <div className="login">
//       <div className="backhome">
//         <Link to={'/'}>
//           <button className="nav-links">
//             <i className="fa-solid fa-arrow-left"></i>Back to Home
//           </button>
//         </Link>
//       </div>
//       <div className="box-login">
//         <form onSubmit={handleFormSubmit}>
//           <h3 className="head">Sign In</h3>
//           <div className="mb-2">
//             <VerifiedUserIcon className="icon" />
//             <label htmlFor="uid"></label>
//             <input
//               type="tel"
//               maxLength="12"
//               placeholder="Enter AADHAR-NUMBER"
//               value={aadharNumber}
//               onChange={(e) => setAadharNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <AccountCircleIcon className="icon" />
//             <label htmlFor="uname"></label>
//             <input
//               type="text"
//               placeholder="Enter User-Name"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <LockOpenIcon className="icon" />
//             <label htmlFor="password"></label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <br />
//           <div className="remember-forget">
//             <input
//               type="checkbox"
//               className="custom-control custom checkbox "
//               id="check"
//             />
//             <label htmlFor="check" className="custom-input-label">
//               Remember me
//             </label>
//           </div>

//           <div className="btn-login">
//             <button className="btn btn-primary" onClick={connectWallet}>
//               Connect-Wallet
//             </button>
//           </div>

//           <br></br>
//           <div className="btn-login">
//             <button type="submit" className="btn btn-primary">
//               Sign-In
//             </button>
//           </div>
//           <div className="register-link">
//             <p>
//               Not a user? <Link to="/signup">Sign-Up</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;





//poori
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import './Login.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import { Link,useNavigate ,useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';



// function Login() {
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [isDataFilled, setIsDataFilled] = useState(true);
//   const [isWalletConnected, setIsWalletConnected] = useState(false);
//   const [account, setAccount] = useState('');
//   const web3 = new Web3(window.ethereum);
 

//   const navigate = useNavigate();

 
  


//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//         console.log(accounts[0])
//         setIsWalletConnected(true);
//       } else {
//         alert('Metamask not detected. Please install Metamask and try again.');
//       }
//     } catch (error) {
//       console.error('Error connecting to wallet:', error);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     if (aadharNumber.trim() === '' || userName.trim() === '' || password.trim() === '') {
//       setIsDataFilled(false);
//       return;
//     }

//     if (!isWalletConnected) {
//       alert('Please connect your MetaMask wallet before proceeding.');
//       return;
//     }

//     // Perform further actions or navigate to the vote page if all validations pass.
//     navigate('/Votepage',{state:{userName,aadharNumber}});
//   };

//   return (
//     <div className="login">
//       <div className="backhome">
//         <Link to={'/'}>
//           <button className="nav-links">
//             <i className="fa-solid fa-arrow-left"></i>Back to Home
//           </button>
//         </Link>
//       </div>
//       <div className="box-login">
//         <form onSubmit={handleFormSubmit}>
//           <h3 className="head">Sign In</h3>
//           <div className="mb-2">
//             <VerifiedUserIcon className="icon" />
//             <label htmlFor="uid"></label>
//             <input
//               type="tel"
//               maxLength="12"
//               placeholder="Enter AADHAR-NUMBER"
//               value={aadharNumber}
//               onChange={(e) => setAadharNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <AccountCircleIcon className="icon" />
//             <label htmlFor="uname"></label>
//             <input
//               type="text"
//               placeholder="Enter User-Name"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-2">
//             <LockOpenIcon className="icon" />
//             <label htmlFor="password"></label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <br />
//           <div className="remember-forget">
//             <input
//               type="checkbox"
//               className="custom-control custom checkbox "
//               id="check"
//             />
//             <label htmlFor="check" className="custom-input-label">
//               Remember me
//             </label>
//           </div>

//           <div className="btn-login">
//             <button className="btn btn-primary" onClick={connectWallet}>
//               Connect-Wallet
//             </button>
//           </div>

//           <br></br>
//           <div className="btn-login">
//             <button type="submit" className="btn btn-primary">
//               Sign-In
//             </button>
//           </div>
//           <div className="register-link">
//             <p>
//               Not a user? <Link to="/signup">Sign-Up</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;





// // Harshini code
// import React,{useState} from 'react';
// import Web3 from 'web3';
// import './Login.css'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import { Link, useNavigate } from "react-router-dom";   
// import 'bootstrap/dist/css/bootstrap.min.css'

// //import ImageInput from './ImageInput';
// function Login() {
//   // if (aadharNumber.trim() === '' || userName.trim() === '' || password.trim() === '') {
//   //   setIsDataFilled(false);
//   //   return;
//   // }
//   const [account, setAccount] = useState('');
  


//     const navigate = useNavigate();

//     const web3 = new Web3(window.ethereum);

//     // const handleSubmit = () =>{
//     //   if(connectWallet === true){
//     //     navigate('/Votepage');
//     //   }
//     //   else{
//     //     console.log("Connect your wallet");
//     //   }
//     // }
    
//     const connectWallet = async () => {
//       try {
//         if (window.ethereum) {
//           await window.ethereum.enable();
//           const accounts = await web3.eth.getAccounts();
//           setAccount(accounts[0]);
//           console.log(accounts[0]);
          
//         } else {
//           alert('Metamask not detected. Please install Metamask and try again.');
//         }
//       } catch (error) {
//         console.error('Error connecting to wallet:', error);
//       }
//     };

//     // const handleConnect = () => {
//     //   // Perform any other logic you need after connecting the wallet.
//     //   navigate('/Votepage');
//     // };



    
    
//     return(
        
        
         
//         <div className="login">
          
//           <div className='backhome'>
//             <Link to={'/'}><button className='nav-links'><i class="fa-solid fa-arrow-left"></i>Back to Home</button></Link>
//           </div>
//           <div className="box-login">
//             <form>
//                 <h3 className="head">Sign In</h3>
//                 <div className="mb-2">
//                     <VerifiedUserIcon className="icon"/>
//                     <label htmlFor="uid" ></label>
//                     <input type="tel" maxLength = "12" placeholder="Enter AADHAR-NUMBER"  required/> 
//                 </div>
//                 <div className="mb-2">
//                 <AccountCircleIcon className="icon"/>
//                     <label htmlFor="uname" ></label>
//                     <input type="text" placeholder="Enter User-Name"  required /> 
//                 </div>
                
//                 <div className="mb-2">
//                     <LockOpenIcon className="icon"/>
//                     <label htmlFor="password" ></label>
//                     <input type="password" placeholder="Enter Password"   required/>
//                 </div>
//                 <br/>
//                 {/* <ImageInput /> */}
//                 <div className="remember-forget">
                
//                     <input type="checkbox" className="custom-control custom checkbox " id="check" />
//                     <label htmlFor="check" className="custom-input-label">
//                         Remember me
//                     </label>
//                     {/* <a href="" >Forgot Password?</a> */}
//                 </div>

               
//                 <div className='btn-login'>
//                   <button className="btn btn-primary" onClick={connectWallet} >Connect-Wallet
//                  </button>

//                 </div>

//                 <br></br>
//                 <div className="btn-login">
                  
//                   <button className="btn btn-primary">Sign-In</button>               
//                 </div>
//                 <div className="register-link">
//                 <p >
                    
//                     Not an user? <Link to="/signup">Sign-Up</Link>
//                 </p>
                    
//                 </div>
              
                
//             </form>
            
//            </div>  
           
//         </div>
//     )
// }

// export default Login
import React, { useState } from 'react';
import Web3 from 'web3';
import './Login.css';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [account, setAccount] = useState('');
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const web3 = new Web3(window.ethereum);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log(accounts[0]);
        setIsWalletConnected(true);
      } else {
        alert('Metamask not detected. Please install Metamask and try again.');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform validation for each input field
    if (!userId || !firstName || !lastName || !password || !confirmPassword) {
      setErrorMessage('Please fill all the fields.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else if (!isWalletConnected) {
      setErrorMessage('Please connect your MetaMask wallet before proceeding.');
    } else {
      setErrorMessage('');

      // Perform further actions or navigate to the vote page if all validations pass.
      navigate('/Votepage', { state: { userName: userId, aadharNumber: userId } });
    }
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

      <div className="box-signup">
        <form onSubmit={handleFormSubmit}>
          <h3 className="head">Sign Up</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="mb-2">
            <VerifiedUserIcon className="icon" />
            <label htmlFor="uid"></label>
            <input
              type="tel"
              maxLength="12"
              placeholder="Enter User-ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <PersonIcon className="icon" />
            <label htmlFor="fname"></label>
            <input
              type="text"
              placeholder="Enter First-Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <PersonIcon className="icon" />
            <label htmlFor="lname"></label>
            <input
              type="text"
              placeholder="Enter Last-Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <LockResetIcon className="icon" />
            <label htmlFor="setpassword"></label>
            <input
              type="password"
              placeholder="Set Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <LockIcon className="icon" />
            <label htmlFor="cpassword"></label>
            <input
              type="password"
              placeholder="Conform Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              className="custom-control custom checkbox"
              id="check"
            />
            <label htmlFor="check" className="terms-conditions">
              Accept all Terms & Conditions
            </label>
          </div>
          <div className="btn-login">
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect-Wallet
            </button>
          </div>
          <br></br>
          <div className="btn-login">
            <button type="submit" className="btn btn-primary">
              Sign-Up
            </button>
          </div>
          <div className="register-link">
            <p>
              Already a user?<Link to="/Login">Sign-In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;





// import React, { useState } from 'react';
// import Web3 from 'web3';
// import './Login.css';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import PersonIcon from '@mui/icons-material/Person';
// import LockResetIcon from '@mui/icons-material/LockReset';
// import LockIcon from '@mui/icons-material/Lock';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Signup() {

//   const [account, setAccount] = useState('');
//   const [userId, setUserId] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const web3 = new Web3(window.ethereum);

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//         console.log(accounts[0]);
//       } else {
//         alert('Metamask not detected. Please install Metamask and try again.');
//       }
//     } catch (error) {
//       console.error('Error connecting to wallet:', error);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Perform validation for each input field
//     if (!userId || !firstName || !lastName || !password || !confirmPassword) {
//       setErrorMessage('Please fill all the fields.');
//     } else if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//     } else {
//       setErrorMessage('');

//       // Call the connectWallet function if all fields are filled correctly
//       connectWallet();
//     }
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

//       <div className="box-signup">
//         <form>
//           <h3 className="head">Sign Up</h3>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <div className="mb-2">
//             <VerifiedUserIcon className="icon" />
//             <label htmlFor="uid"></label>
//             <input
//               type="tel"
//               placeholder="Enter User-ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <PersonIcon className="icon" />
//             <label htmlFor="fname"></label>
//             <input
//               type="text"
//               placeholder="Enter First-Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <PersonIcon className="icon" />
//             <label htmlFor="lname"></label>
//             <input
//               type="text"
//               placeholder="Enter Last-Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>

//           <div className="mb-2">
//             <LockResetIcon className="icon" />
//             <label htmlFor="setpassword"></label>
//             <input
//               type="password"
//               placeholder="Set Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <LockIcon className="icon" />
//             <label htmlFor="cpassword"></label>
//             <input
//               type="password"
//               placeholder="Conform Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="checkbox"
//               className="custom-control custom checkbox"
//               id="check"
//             />
//             <label htmlFor="check" className="terms-conditions">
//               Accept all Terms & Conditions
//             </label>
//           </div>
//           <div className="btn-login">
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               Sign-Up
//             </button>
//           </div>
//           <div className="register-link">
//             <p>
//               Already a user?<Link to="/Login">Sign-In</Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

// //Harshini code
// // import React,{useState} from 'react';
// // import Web3 from 'web3';
// // import './Login.css'
// // import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// // import PersonIcon from '@mui/icons-material/Person';
// // import LockResetIcon from '@mui/icons-material/LockReset';
// // import LockIcon from '@mui/icons-material/Lock';
// // import { Link } from "react-router-dom";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // function Signup() {

// //     const [account, setAccount] = useState('');
// //     const web3 = new Web3(window.ethereum);
    
// //     const connectWallet = async () => {
// //       try {
// //         if (window.ethereum) {
// //           await window.ethereum.enable();
// //           const accounts = await web3.eth.getAccounts();
// //           setAccount(accounts[0]);
// //           console.log(accounts[0]);
// //         } else {
// //           alert('Metamask not detected. Please install Metamask and try again.');
// //         }
// //       } catch (error) {
// //         console.error('Error connecting to wallet:', error);
// //       }
// //     };

// //     return(
// //         <div className="login">
// //           <div className='backhome'>
// //             <Link to={'/'}><button className='nav-links'><i class="fa-solid fa-arrow-left"></i>Back to Home</button></Link>
// //           </div>

// //           <div className="box-signup">
// //             <form>
// //                 <h3 className="head">Sign Up</h3>
// //                 <div className="mb-2">
// //                     <VerifiedUserIcon className="icon"/>
// //                     <label htmlFor="uid" ></label>
// //                     <input type="tel" placeholder="Enter User-ID" />
// //                 </div>
// //                 <div className="mb-2">
// //                     <PersonIcon className="icon"/>
// //                     <label htmlFor="fname" ></label>
// //                     <input type="text" placeholder="Enter First-Name"  /> 
// //                 </div>
// //                 <div className="mb-2">
// //                     <PersonIcon className="icon"/>
// //                     <label htmlFor="lname" ></label>
// //                     <input type="text" placeholder="Enter Last-Name"  /> 
// //                 </div>
                
// //                 <div className="mb-2">
// //                     <LockResetIcon className="icon"/>             
// //                     <label htmlFor="setpassword" ></label>
// //                     <input type="password" placeholder="Set Password" />
// //                 </div>
// //                 <div className="mb-2">
// //                     <LockIcon className="icon"/>
// //                     <label htmlFor="cpassword" ></label>
// //                     <input type="password" placeholder="Conform Password" />
// //                 </div>
// //                 <br/>
// //                 <div>
                
// //                     <input type="checkbox" className="custom-control custom checkbox " id="check" />
// //                     <label htmlFor="check" className="terms-conditions">Accept all Terms & Conditions
// //                     </label>
// //                 </div>
// //                 <div className="btn-login">
// //                     <button className="btn btn-primary" onClick={connectWallet}>Sign-Up</button>
// //                 </div>
// //                 <div className="register-link">
// //                 <p >
                    
// //                     Already a user?<Link to = "/Login">Sign-In</Link>
// //                 </p>
                    
// //                 </div>
                
// //             </form>
// //            </div>  
// //         </div>
// //     )
// // }

// // export default Signup
import  './Votepage.css'
import  userimage from'../Home Files/Images/profile.png'
// import React, { useState, } from 'react';
import React, { useState, useEffect } from 'react';
import star from '../Home Files/Images/star.png'
import vote from '../Home Files/Images/vote.jpg'
import { Link } from "react-router-dom"; 
import {useLocation} from "react-router-dom";
import { connectWallet } from './walletUtils'
//import Logoimg from "./Images/newlogo.png"
//import Navbar from './Navbar'


import userBg from '../Home Files/Images/userbg8.webp'
function Votepage(){
     const location= useLocation();
     const {userName, aadharNumber} = location.state ||{};
     const [metaMaskID, setMetaMaskID] = useState('');

  useEffect(() => {
    // Fetch the MetaMask ID when the component mounts
    const fetchMetaMaskID = async () => {
      const account = await connectWallet();
      setMetaMaskID(account);
    };
    fetchMetaMaskID();
  }, []);

     
     

    return(
        <div className='overall'> 
           <div className="userbd" style={{
                width: '100%',
                height: '235vh',
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(${userBg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'relative'
                }}>
            
           
            <nav><br />
                 <br />
                 <h1 className='title1'> Election Commission of India</h1>
                {/* </h1> <img src={Logoimg} alt="logo"  className='logoimage'  /> <br /> */}
                <br />
                
            </nav>
            <div className="container">
            
            <br />
                <div className="sidebox">
                            <div className="side-nav">
                                <div className="user">
                                <img src={userimage} alt="userimage" className='user-img' />
                                <div>
                                <h2>{userName}</h2>
                                
                                <p>{aadharNumber}</p>
                                </div>
                                <img src={star} alt='starimagr'  className='star-img' />
                                </div>

                                <ul>
                                    <li><p>Profile </p></li>
                                    <li><p>Update Profile</p></li>

                                    <li><p>Setting</p></li>
                                    <li><p>Help ?</p></li>
                                    <li><p className='backtohome'>
                          <Link to={'/'}><button ><i class="fa-solid fa-arrow-left"></i>Log out</button></Link></p></li>   
                                    {/* <li><p><div className='backtohome'>
                          <Link to={'/'}><button className='nav-links'><i class="fa-solid fa-arrow-left"></i>Back to Home</button></Link>
                        </div></p></li>     */}
                                </ul>
                                
                            </div>   
                </div>
                    <div className="bodycontent">
                        <br />
                    <p className='metaid'><b>METAMASK ID:</b>{metaMaskID}</p>
                        <div className="first-box">
                                <div className="text-box">
                                    <h2 ><b>Elections</b></h2>
                                    
                                    <div className="nothing">
                                    <h4>India is a constitutional democracy with a parliamentary system of government, and at the heart of the system is a commitment to hold regular, free and fair elections.
                                            
                                    </h4>
                                   
                                    <div className="vote-img">
                                    <img src={vote} alt="Voteimage"  /> </div>
                                    </div>

                                    <button className='selectstate-btn' onClick={() => {
                                            const electionSection = document.querySelector('.election');
                                            electionSection.scrollIntoView({ behavior: 'smooth' });
                                            }}>
                                            Select Election
                                        </button>
                                    <p><h3 style={{fontWeight:'600'}}>Guide Line </h3>
                                     <h6><pre><h6>User Authentication:<br /></h6>
                                                Implement secure user authentication using Aadhar number and Metamask ID.
                                                <br />Ensure proper validation and verification of user identity.<br />
                                        <h6> User Page Interface:<br /></h6>

                                                Design a user-friendly page with clear options for election selection.
                                                <br />Provide a visually appealing and responsive layout for seamless user experience.<br />
                                            <h6> Election Selection:<br /></h6>

                                                Include a dropdown or selection box for users to choose their desired election (e.g., Tamil Nadu or other states).
                                                <br />Allow users to view the list of available elections and select their preferred one.<br />
                                            <h6>"Vote Now" Button:<br /></h6>

                                                 Add a prominent "Vote Now" button next to the selected election.
                                            <br /> On clicking the button, navigate users to the vote page for the chosen election.<br />
                                            <h6>Vote Page Interface:<br /></h6>

                                                Create a dedicated page for the selected election with a list of parties/candidates.
                                                <br />Present the parties/candidates with relevant information, symbols, and brief descriptions.<br />
                                            <h6>Party Selection:<br /></h6>

                                                Enable users to select their preferred party or candidate to cast their vote.
                                                <br /> Use radio buttons or checkboxes to allow users to choose a single option.<br />
                                            <h6>"Vote" Button:<br /></h6>

                                                Place a clear "Vote" button below the party/candidate selection options.
                                            <br />On clicking the button, prompt users to confirm their vote.<br />
                                            <h6>Backend Connection:<br /></h6>

                                                Establish a secure connection between the frontend and backend to handle voting data.
                                                <br /> Use appropriate API calls or smart contract interactions to record and store votes.<br />
                                            <h6>Data Privacy and Security:<br /></h6>

                                                Implement encryption and privacy measures to protect user data, Aadhar numbers, and voting choices.
                                                <br />Store sensitive information securely and comply with data protection regulations.<br />
                                            <h6>Error Handling:<br /></h6>

                                                 Implement proper error handling and display clear error messages for any issues encountered during the voting process.<br />
                                            <h6>Testing and Optimization:<br /></h6>

                                                Thoroughly test the user page and voting process to ensure functionality and smooth user interactions.
                                            <br />Optimize the page for performance and responsiveness.<br />
                                            <h6> User Support and Feedback:<br /></h6>

                                                Offer user support channels to assist users in case of any difficulties.
                                                <br /> Collect user feedback to improve the user experience and address any concerns.</pre></h6>
                                    </p>
                                </div>
                        </div>
                        
                        <div className="election">
                            <div className="party1" >
                            <h2>TAMIL NADU</h2>
                            <p>General Election of Legislative Assembly of Tamil Nadu,2024</p>
                            <Link to="/MainVoting"><button>VOTE NOW</button></Link>
                            </div>
                            <div className="party1">
                            <h2>KERALA</h2>
                            <p>General Election of Legislative Assembly of Kerala,2024</p>
                            <Link to="/MainVoting"><button>VOTE NOW</button></Link>
                            </div>
                            <div className="party1">
                            <h2>BYE-ELECTION</h2>
                            <p>Bye-election in Parliamentary Constituencies of Various States</p>
                            <Link to="/MainVoting"><button>VOTE NOW</button></Link>
                            </div>
                            
                        </div>
                        
                    </div>
               </div>
            </div>
        </div>

        
    )
}
export default Votepage
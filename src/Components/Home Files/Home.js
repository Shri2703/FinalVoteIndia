import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Aboutimg from "./Images/about2.jpg";
import instagram from "./Images/ig.jpg";
import facebook from "./Images/fb.png";
import youtube from "./Images/yt.png";
import twitter from "./Images/twitter.png";
import { Link } from "@mui/material";
import { RequestAlreadySentError } from "web3";
import ResultTime from "./ResultTime";

function Home() {
    return(
        <div className="homepg">
            <Navbar/>
            <div className="getStarted" id="home">
                <h1><span>Welcome</span><br></br> Voters</h1>
                <p>Voting is a responsibility of every<br></br>citizen in the nation</p>
                <br></br><Link href="Login"><button className="btnstart">Get started</button>
                </Link>
            </div>
            <div className="winning">
            <ResultTime />
            </div>
            
            <div className="About"id="about1">
                <img className="About-pic" src={Aboutimg}/>
                {/* <image path={Aboutimg} className="About-pic"></image> */}
                <h1 >About us</h1>
                <p >Welcome to Vote INDIA, your go-to destination for all things related to elections, civic engagement, and democratic participation. Our mission is to empower individuals, promote informed decision-making, and strengthen the fabric of democracy. With our user-friendly platform and comprehensive resources, we strive to create an inclusive space where every voice matters.<br></br><br></br>

At Vote INDIA, we believe that active participation in the electoral process is the cornerstone of a thriving democracy. We are passionate about providing citizens with the tools and knowledge they need to make informed choices, engage in meaningful discussions, and actively shape the future of their communities and nations.<br></br><br></br>

<h2>Key Features:</h2><br></br>
<h4>1.Empowering Voters:</h4>We understand that the electoral process can sometimes feel overwhelming. That's why we are committed to empowering voters with accessible and unbiased information. Our platform provides step-by-step guides, voter registration assistance, and comprehensive election resources, ensuring that you have the knowledge and tools necessary to exercise your right to vote confidently.<br></br><br></br>

<h4>2.Candidate Profiles and Debates:</h4>Making an informed decision requires understanding the individuals seeking public office. Our website features comprehensive candidate profiles, offering insights into their backgrounds, policy positions, and experience. Additionally, we organize virtual debates and town hall meetings, giving candidates the opportunity to engage directly with voters and address the issues that matter most.<br></br><br></br>

<h4>3.Community Engagement:</h4>We believe that democracy thrives when citizens engage in thoughtful discussions and work together to address challenges. Our platform offers various channels for community engagement, including forums, discussion boards, and comment sections. We encourage users to share their perspectives, exchange ideas, and collaborate on finding solutions to local and national issues.<br></br><br></br>

<h4>4.Real-Time Election Results:</h4>Stay up to date with the latest election outcomes through our real-time results feature. We provide accurate and timely information on election winners, ballot measures, and propositions. Our data visualization tools allow users to explore voting trends and gain valuable insights into the democratic process.<br></br><br></br>

<h4>5.Get Involved:</h4> We go beyond the act of voting by encouraging users to take an active role in their communities. Our platform offers information on volunteering opportunities, local advocacy groups, and community events, allowing you to make a tangible impact on the issues that matter to you.<br></br><br></br>

At Vote INDIA, we prioritize transparency, non-partisanship, and inclusivity. Our goal is to foster a respectful and constructive environment where individuals from all walks of life can engage in meaningful dialogue, exchange ideas, and contribute to the democratic process.<br></br><br></br>

Join us on this journey as we work towards building a stronger democracy, one vote at a time. Together, let's make our voices heard, shape our future, and ensure that democracy remains vibrant and robust for generations to come.</p>
            </div>
            <div className="Footer" id="contact">
                <div>
                    
                    <h2>Contact Us</h2>
                <ul id="elFooterSocialLinks" className="Contact-icon">

	
                        <li class="cUserNav_icon">
                            <a href="https://www.facebook.com/eci/" target="_blank" class="cShareLink cShareLink_facebook" rel="noopener noreferrer" title="facebook"><img className="icons" src={facebook}/></a>
                        </li>

                        <li>|</li>

                        <li class="cUserNav_icon">
                            <a href="https://www.youtube.com/eci/" target="_blank" class="cShareLink cShareLink_youtube" rel="noopener noreferrer" title="youtube"><img className="icons" src={youtube}/></a>
                        </li>

                        <li>|</li>

                        <li class="cUserNav_icon">
                            <a href="https://twitter.com/ECISVEEP" target="_blank" class="cShareLink cShareLink_twitter" rel="noopener noreferrer" title="twitter"><img className="icons" src={twitter}/></a>
                        </li>

                        <li>|</li>

                        <li class="cUserNav_icon">
                            <a href="https://www.instagram.com/ecisveep/" target="_blank" class="cShareLink cShareLink_instagram" rel="noopener noreferrer" title="instagram"><img className="icons" src={instagram}/></a>
                        </li>


                    </ul>
                    
                    {/* <i class="fa-brands fa-youtube" style="color: #f01800;"></i> */}
                </div>
            </div>
        </div>
    )
}

export default Home;
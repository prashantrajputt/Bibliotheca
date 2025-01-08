import { toast } from "react-toastify";
import "./Footer.css"
import {Link, useNavigate} from "react-router-dom"

const Footer=()=>{
    const navigate=useNavigate();
    const check=()=>{
        const token=localStorage.getItem('token');
        if(token)
        {
            navigate('contact');
        }
        else
        {
            toast("Please, Login to contact us...")
        }
    }
    return ( 
        <>
<footer class="footer-distributed">
        <div class="footer-left">
            <h3> <span>Bibliotheca</span></h3>
            <p class="footer-links">
                <Link to="/mainpage">Home</Link>
                | |
                <Link onClick={check}>Contact</Link>
                | |
                <Link to="/faq">FAQ</Link>
                | |
                <Link to="/terms-and-condition">Privacy Policy</Link>

            </p>
        </div>
        <div class="footer-center">
            <div class="contact-item">
                <i class="fa fa-map-marker"></i>
                <p>Bibliotheca Pvt Ltd<span>303, Ram Krishna Apartment </span><span>Road No 12, SK Nagar</span><span>Patna, Bihar-800001</span></p>
                </div>
            <div class="contact-item">
                <i class="fa fa-phone"></i>
                <p>+91 7766903456</p>
            </div>
            <div class="contact-item">
                  <i class="fa fa-envelope"></i>
                  <p>bibliotheca.pvt.ltd@gmail.com</p>
            </div>
        </div>
        <div class="footer-right">
            <p class="footer-company-about">
                 <span>About the company</span>
                 <strong>Bibliotheca</strong> is a website where you can find 
                  many interesting and useful books.
            </p>
            <div class="footer-icons"> 
            <a href="https://github.com/prashantrajputt" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>

                <a target="_blank" href="https://www.instagram.com/prashant.rajputt/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                <a target="_blank" href="https://www.linkedin.com/in/prashant-kumar-69986b224/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            </div>
            
        </div>
        
        <p class="footer-company-name">Copyright © 2024 <strong>Team Bibliotheca</strong> All rights reserved</p>

    </footer>
        </>
    )
}
export default Footer;

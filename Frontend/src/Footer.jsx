import React from 'react';
import "../src/styles/footer.css";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Scanfcode.com 
Introducing the Government Complaint Management System (CitizenConnect.), an innovative solution designed to streamline the process of addressing citizen grievances and enhancing public service delivery. GCMS is a robust platform that enables citizens to voice their concerns, report issues, and seek resolutions efficiently and effectively.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="#">Government Information Centre</a></li>
              <li><a href="#">Criminal Investigation</a></li>
              <li><a href="#">Sri Lanka Police</a></li>
              <li><a href="#">Financial Intelligence Unit</a></li>
              <li><a href="#">Auditor General's Department</a></li>
              <li><a href="#">Ministry of Public Administration</a></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            COMMISSION TO INVESTIGATE ALLEGATIONS OF BRIBERY OR CORRUPTION

A 36, Malalasekera Mawatha,
      Colombo 07, Sri Lanka.

T+94 112 596360 / 1954

M+94 767011954
            <ul className="footer-links">
              <li><a href="/">About Us</a></li>
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">Contribute</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; {new Date().getFullYear()} All Rights Reserved by 
              <a href="#"> CitizenConnect</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

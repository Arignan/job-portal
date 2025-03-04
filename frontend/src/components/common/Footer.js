import React from 'react';
import '../../styles/Footer.css'; // CORRECTED IMPORT PATH

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Job Portal</p>
      </div>
    </footer>
  );
};

export default Footer;

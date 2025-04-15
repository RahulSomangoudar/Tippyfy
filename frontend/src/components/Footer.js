import "../styles/footer.css";


const Footer = () => {
    return (
      <footer className="footer">
        <p className="foot" >
        &copy; {new Date().getFullYear()} Tippify. All rights reserved.| Cooked with <span style={{ color: "#F0BB78" }}>🤍</span> by  
          <a href="https://www.instagram.com/rahul.somangoudar?igsh=MTNxem1mbXg1MmttNQ==" 
             target="_blank" 
             rel="noopener noreferrer"
             className="footer-link">
            RahulSomangoudar
          </a>
        </p>
      </footer>
    );
  };
  
  export default Footer;
  
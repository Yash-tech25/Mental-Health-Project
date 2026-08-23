import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>MANORA</h2>

          <p>
            A space to understand your mind, reflect,
            and care for your well-being.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-copyright">
          &copy; {currentYear} MANORA. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
import { Navbar, Nav, Form } from "react-bootstrap";
import { FaChild, FaQuestionCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <Navbar.Brand className="iralapagina" href="/">
          <FaChild className="icon" /> Admin Panel
        </Navbar.Brand>
        <Nav className="me-auto">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#!">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  More information
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Unfold
                </a>
              </li>
            </ul>
            <Nav.Link href="">
              <div className="vertical-line"></div>
            </Nav.Link>
            <Nav.Link href="">
              <div className="div-form">
                <div className="div-form-reg">
                  <Form.Control type="text" name="search" />
                </div>
              </div>
            </Nav.Link>
            <Nav.Link href="">
              <BiSearch className="icon-ad" />
            </Nav.Link>
            <Nav.Link href="">
              <IoMdNotifications className="icon-ad" />
            </Nav.Link>
            <Nav.Link href="">
              <FaQuestionCircle className="icon-ad" />
            </Nav.Link>
          </div>
        </Nav>
      </div>
    </nav>
  );
}
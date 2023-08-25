import { Col, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaChartPie } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

import swal from "sweetalert2";

export default function SideNav() {
  const navigate = useNavigate();

  const logout = () => {
    swal
      .fire({
        title: "Do you want to exit?",
        text: "You will log out as an administrator",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Exit",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/sesion");
        }
      });
  };
  return (
    <Col className="col-sidenav" xs={12} md={3}>
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light p-3">
          <strong>
            <span>Admin</span>
          </strong>{" "}
        </div>
        <div className="list-group list-group-flush">
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/admin/dashboard/statistics"
          >
            <BsGraphUp className="icon" /> Statistics
          </Link>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/admin/dashboard/charts"
          >
            <FaChartPie className="icon" /> Charts
          </Link>
          <div className="sidebar-heading border-bottom bg-light p-3">
            Tablas
          </div>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/admin/dashboard/clients"
          >
            <FaUserAlt className="icon" /> Clients
          </Link>
          <div className="sidebar-heading border-bottom bg-light p-3">
            Misc.
          </div>
          <Link
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/admin/dashboard/config"
            disabled
          >
            <MdSettings className="icon" /> Settings
          </Link>
          <div className="list-group-item p-3 blank-space-snav"></div>
          <div
            className="list-group-item list-group-item-action list-group-item-light p-3"
            to="/admin/dashboard/estadisticas"
          >
            <Button className="btnlog" variant="primary" onClick={logout}>
              <GoSignOut /> Salir
            </Button>
          </div>
        </div>
      </div>
    </Col>
  );
}
import { Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import { FaUserAlt, FaUserTie } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import CountUp from "react-countup";

export default function Statistics() {
  return (
    <Row>
      <SideNav />
      <Col className="col-panel">
        <div className="content">
          <div className="container-fluid">
            <h3 className="txt-tittle-statistics">Estadisticas</h3>
            <Row className="row-status div-status">
              <Col md={4}>
                <div className="card card-stats">
                  <div className="card-header line-cyan">
                    <h5 className="textheader-dh txt-group-sale">Usuarios</h5>{" "}
                    <p className="textbody-dh">
                      Cantidad de usuarios registrados en la plataforma
                    </p>
                    <h1 className="icon-cyan">
                      <FaUserAlt />
                      <CountUp end={8000} duration={2} />+
                    </h1>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card card-stats">
                  <div className="card-header line-red">
                    <h5 className="textheader-dh txt-group-sale">
                      Profesionales
                    </h5>{" "}
                    <p className="textbody-dh">
                      Cantidad de profesionales con los que contamos
                    </p>
                    <h1 className="icon-red">
                      <FaUserTie className="icon" />
                      <CountUp end={1200} duration={1} />+
                    </h1>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card card-stats">
                  <div className="card-header line-blue">
                    <h5 className="textheader-dh txt-group-sale">Ventas</h5>{" "}
                    <p className="textbody-dh">
                      Cantidad ventas realizadas en el último mes
                    </p>
                    <h1 className="icon-blue">
                      <AiFillTag /> <CountUp end={120} duration={0.2} /> de{" "}
                      <CountUp end={140} duration={0.3} />
                    </h1>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card card-stats">
                  <div className="card-header line-orange">
                    <h5 className="textheader-dh txt-group-sale">Utilidad</h5>{" "}
                    <p className="textbody-dh">
                      Ganancias obtenidas hasta el momento
                    </p>
                    <h1 className="icon-orange">
                      <BiDollar className="icon" />
                      <CountUp end={50000} duration={4} />
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
}
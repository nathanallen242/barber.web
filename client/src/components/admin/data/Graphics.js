import { Row, Col } from "react-bootstrap";
import SideNav from "./SideNav";
import BarChart from "../../../charts/BarChart";
import DoughnutChart from "../../../charts/DoughnutChart";
import RadarChart from "../../../charts/RadarChart";

export default function Graphics() {
  return (
    <Row>
      <SideNav />
      <Col className="col-panel" md={9}>
        <div className="content">
          <div className="container-fluid">
            <div className="card div-status">
              <div className="card-header ">
                <BarChart />
              </div>
            </div>
            <Row>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <DoughnutChart />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <RadarChart />
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
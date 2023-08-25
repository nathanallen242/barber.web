import {
    Row,
    Col,
    Button,
    Collapse,
    ListGroup,
    ProgressBar,
    Form,
  } from "react-bootstrap";
  import SideNav from "./SideNav";
  import React, { useState } from "react";
  
  export default function Configuration() {
    const [open, setOpen] = useState(false);
    return (
      <Row>
        <SideNav />
        <Col className="col-panel" md={9}>
          <div className="col-md-12">
            <h3 className="txt-tittle-admin">Configuración</h3>
            <div className="card-setting">
              <div className="card-body">
                <h4>Seleccionar las opciones</h4>
                <div className="row-setting">
                  <ListGroup className="items">
                    <ListGroup.Item as="li" active>
                      Opciones disponibles
                    </ListGroup.Item>
                    <ListGroup.Item>Opción 1</ListGroup.Item>
                    <ListGroup.Item>Opción 2</ListGroup.Item>
                    <ListGroup.Item>Opción 3</ListGroup.Item>
                    <ListGroup.Item>Opción 4</ListGroup.Item>
                    <ListGroup.Item>Seleccionar Ambas</ListGroup.Item>
                  </ListGroup>
                </div>
                <Row className="row-setting">
                  <Col>
                    <Form.Label className="text-log">Interruptor</Form.Label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Prender/Apagar"
                    />
                  </Col>{" "}
                  <Col>
                    <h6>
                      <Form.Label className="text-log">Intensidad</Form.Label>
                    </h6>
                    <input type="range"></input>
                  </Col>
                  <Col>
                    <Form.Label className="text-log">Porcentaje</Form.Label>
                    <ProgressBar now={60} label={`60%`} />
                  </Col>
                </Row>
                <Button
                  variant="danger"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {open ? <>Ver menos</> : <>Ver más</>}
                </Button>
                <Collapse in={open}>
                  <div>
                    <ListGroup className="items">
                      <ListGroup.Item>Opción 1</ListGroup.Item>
                      <ListGroup.Item>Opción 2</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
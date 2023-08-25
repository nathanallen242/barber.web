import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Axios from "axios";
import { FaEdit, FaTrash, FaAngleRight } from "react-icons/fa";
import SideNav from "./SideNav";
import MyPagination from "./Pagination";
import swal from "sweetalert2";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Axios.get(`https://randomuser.me/api/?results=10`).then((response) => {
      setUsers(response.data.results);
      setTimeout(() => setLoading(false), 500);
    });
  }, [page]);

  const handleUpdate = (user) => {
    // swal logic for updating user
  };

  const handleDelete = () => {
    // swal logic for deleting user
  };

  return (
    <Row>
      <SideNav />
      <Col className="col-panel" xs={12} md={9}>
        <h3 className="txt-tittle-admin">Table <FaAngleRight className="icon-pro" /> usuarios</h3>
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title">Table de Usuarios</h4>
            <p className="card-categoryy">Contiene todos los usuarios registrados en la plataforma</p>
          </div>
          <div className="card-body">
            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead className=" text-primary">
                    <tr>
                      <th>Nombre y Apellido</th>
                      <th>Email</th>
                      <th>País</th>
                      <th>Género</th>
                      <th>Teléfono</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id || index}>
                        <td>{user.name.first}</td>
                        <td className="text-danger">{user.email}</td>
                        <td>{user.location.country}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td className="text-center">
                          <FaEdit className="icon-delete" onClick={() => handleUpdate(user)} />
                        </td>
                        <td className="text-center">
                          <FaTrash className="icon-edit" onClick={handleDelete} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="div-pagination">
              <MyPagination totPages={20} currentPage={page} pageClicked={setPage} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

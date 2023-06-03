import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, message, Popconfirm, Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const VillesList = () => {
  const [villes, setVilles] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [nom, setNom] = useState("");
  const [selectedVille, setSelectedVille] = useState(null);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
    setModalTitle("Add Ville");
    setSelectedVille(null);
    setNom("");
  };

  const showEditModal = (ville) => {
    setOpen(true);
    setModalTitle("Edit Ville");
    setSelectedVille(ville);
    setNom(ville.nom);
  };

  const handleOk = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedVille(null);
    setNom("");
  };

  const confirmDelete = (id) => {
    axios.delete(`https://local-restau-springboot-backend-production.up.railway.app/api/villes/delete/id/${id}`).then(() => {
      setVilles((villes) => villes.filter((ville) => ville.id !== id));
      message.success("Ville deleted successfully.");
    });
  };

  useEffect(() => {
    axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/villes/").then((response) => {
      setVilles(response.data);
    }).catch((error) => {
      console.error("Error fetching villes:", error);
      message.error("Failed to fetch villes.");
    });
  }, []);

  const handleEdit = (ville) => {
    showEditModal(ville);
  };

  const handleSubmit = () => {
    if (selectedVille) {
      // Edit operation
      axios
        .put(`https://local-restau-springboot-backend-production.up.railway.app/api/villes/update/id/${selectedVille.id}`, { nom })
        .then(() => {
          setVilles((villes) =>
            villes.map((ville) => {
              if (ville.id === selectedVille.id) {
                return { ...ville, nom };
              }
              return ville;
            })
          );
          message.success("Ville updated successfully.");
          handleCancel();
        })
        .catch((error) => {
          console.error("Error updating ville:", error);
          message.error("Failed to update ville.");
        });
    } else {
      // Add operation
      axios.post("https://local-restau-springboot-backend-production.up.railway.app/api/villes/save", { nom }).then((response) => {
        const newVille = response.data;
        setVilles((villes) => [...villes, newVille]);
        message.success("Ville added successfully.");
        handleCancel();
        navigate("/villes");
      });
    }
  };


  return (
    <div>
      <Card>
        <Modal
          title={modalTitle}
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id="nom"
              variant="standard"
              type="text"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
              placeholder="Ville Name"
            />
          </form>
        </Modal>
        <h2>Ville List</h2>
        <button className="btn btn-success" onClick={showModal}>
          Ajouter Ville
        </button>
        <br />
        <br />
        <br />
        <br />
        <table className="table table-bordered" style={{ width: "100%", fontSize: "20px" }}>
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {villes.map((ville) => (
              <tr key={ville.id}>
                <td>{ville.id}</td>
                <td>{ville.nom}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleEdit(ville)}
                  >
                    <EditOutlined /> Update
                  </button>
                  <b></b>
                  <Popconfirm
                    title="Delete Ville"
                    description="Are you sure to delete this Ville?"
                    onConfirm={() => confirmDelete(ville.id)}
                    onCancel={() => message.error("Delete canceled")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>
                      <DeleteOutlined /> Delete
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default VillesList;

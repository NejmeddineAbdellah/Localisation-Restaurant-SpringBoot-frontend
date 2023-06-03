import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { DeleteOutlined, EditOutlined, PlusOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, message } from "antd";

const SpecilaiteList = () => {
  const [specialities, setSpecialities] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [nom, setNom] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://local-restau-springboot-backend-production.up.railway.app/api/specialite/all");
      setSpecialities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setOpen(true);
    setModalTitle("Add Specialite");
    setSelectedSpecialite(null);
    setNom("");
  };

  const showEditModal = (specialite) => {
    setOpen(true);
    setModalTitle("Edit Specialite");
    setSelectedSpecialite(specialite);
    setNom(specialite.nom);
  };

  const handleOk = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedSpecialite(null);
    setNom("");
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this specialite:");
    if (newName) {
      axios
        .put(`https://local-restau-springboot-backend-production.up.railway.app/api/specialite/update/id/${id}`, { nom: newName })
        .then(() => {
          setSpecialities((prevSpecialities) =>
            prevSpecialities.map((specialite) => {
              if (specialite.id === id) {
                return { ...specialite, nom: newName };
              }
              return specialite;
            })
          );
        });
    }
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`https://local-restau-springboot-backend-production.up.railway.app/api/specialite/delete/id/${id}`);
      setSpecialities((prevSpecialities) =>
        prevSpecialities.filter((specialite) => specialite.id !== id)
      );
      message.success("Serie deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (selectedSpecialite) {
      // Edit operation
      axios
        .put(`https://local-restau-springboot-backend-production.up.railway.app/api/specialite/update/id/${selectedSpecialite.id}`, { nom })
        .then(() => {
          setSpecialities((prevSpecialities) =>
            prevSpecialities.map((specialite) => {
              if (specialite.id === selectedSpecialite.id) {
                return { ...specialite, nom };
              }
              return specialite;
            })
          );
          handleClose();
        })
        .catch((error) => {
          console.error("Error updating specialite:", error);
        });
    } else {
      // Add operation
      axios
        .post("https://local-restau-springboot-backend-production.up.railway.app/api/specialite/save", { nom })
        .then((response) => {
          const newSpecialite = response.data;
          setSpecialities((prevSpecialities) => [
            ...prevSpecialities,
            newSpecialite,
          ]);
          handleClose();
        })
        .catch((error) => {
          console.error("Error adding specialite:", error);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpecialite(null);
    setNom("");
  };

  return (
    <div style={{ display: "inline", justifyContent: "center", alignItems: "center", height: "100vh", width: "80%" }}>
      <Card>

        <Modal
          title={modalTitle}
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit}>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
              placeholder="Specialite Name"
            />
          </form>
        </Modal>

        <h2>Specialite List</h2>
        <button className="btn btn-success" onClick={showModal}>
          Add Specialite
        </button>

        <br />
        <br />
        <table className="table table-bordered" style={{ width: "100%", fontSize: "20px" }}>
          <thead className="table-dark" style={{ background: "transparent" }}>
            <tr>
              <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>ID</th>
              <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Name</th>
              <th scope="col" style={{ verticalAlign: "middle", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {specialities.map((specialite) => (
              <tr key={specialite.id}>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>{specialite.id}</td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>{specialite.nom}</td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => showEditModal(specialite)}
                  >
                    <EditOutlined /> Update
                  </button>{" "}
                  <Popconfirm
                    title="Delete Specialite"
                    description="Are you sure to delete this Specialite?"
                    onConfirm={() => confirmDelete(specialite.id)}
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

export default SpecilaiteList;

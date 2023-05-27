import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, message } from "antd";

const SerieList = () => {
  const [series, setSeries] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [nom, setNom] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/series/all");
      setSeries(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setOpen(true);
    setModalTitle("Add Serie");
    setSelectedSerie(null);
    setNom("");
  };

  const showEditModal = (serie) => {
    setOpen(true);
    setModalTitle("Edit Serie");
    setSelectedSerie(serie);
    setNom(serie.nom);
  };

  const handleOk = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedSerie(null);
    setNom("");
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`/api/series/delete/id/${id}`);
      setSeries((prevSeries) => prevSeries.filter((serie) => serie.id !== id));
      message.success("Serie deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this serie:");
    if (newName) {
      axios.put(`/api/series/update/id/${id}`, { nom: newName }).then(() => {
        setSeries((prevSeries) =>
          prevSeries.map((serie) => {
            if (serie.id === id) {
              return { ...serie, nom: newName };
            }
            return serie;
          })
        );
        message.success("Serie updated successfully.");
      });
    }
  };

  const handleSubmit = () => {
    if (selectedSerie) {
      // Edit operation
      axios
        .put(`/api/series/update/id/${selectedSerie.id}`, { nom })
        .then(() => {
          setSeries((prevSeries) =>
            prevSeries.map((serie) => {
              if (serie.id === selectedSerie.id) {
                return { ...serie, nom };
              }
              return serie;
            })
          );
          message.success("Serie updated successfully.");
        });
    } else {
      // Add operation
      axios.post("/api/series/save", { nom }).then((response) => {
        const newSerie = response.data;
        setSeries((prevSeries) => [...prevSeries, newSerie]);
        message.success("Serie added successfully.");
      });
    }
    handleCancel();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
              placeholder="Serie Name"
            />
          </form>
        </Modal>

        <h2>Serie List</h2>
        <button className="btn btn-success" onClick={showModal}>
          Add Serie
        </button>
        <br/>
        <br/>
        <br/>
        <br/>
        <table className="table table-bordered" style={{ width: "100%", fontSize: "20px" }}>
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nom</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {series.map((serie) => (
              <tr key={serie.id}>
                <td>{serie.id}</td>
                <td>{serie.nom}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => showEditModal(serie)}
                  >
                    <EditOutlined />
                    Update
                  </button>
                  <Popconfirm
                    title="Delete Serie"
                    description="Are you sure to delete this Serie?"
                    onConfirm={() => confirmDelete(serie.id)}
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

export default SerieList;

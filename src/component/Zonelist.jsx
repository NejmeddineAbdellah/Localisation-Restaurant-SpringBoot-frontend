import React, { useState, useEffect } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, message, Popconfirm, Card } from "antd";

const ZoneList = ({ villeId }) => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVilles] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [nom, setNom] = useState("");
    const [selectedVilleId, setSelectedVilleId] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const showModal = () => {
        setModalIsOpen(true);
        setModalTitle("Zones");
        setIsEditMode(false); // Set mode to "Add"
    };

    const handleOk = () => {
        if (isEditMode) {
            handleEdit(); // Call the appropriate function based on mode
        } else {
            handleSubmit();
        }
    };

    const handleCancel = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        fetchZones();
    }, [villeId]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchZones = () => {
        axios
            .get("https://local-restau-springboot-backend-production.up.railway.app/api/zones/")
            .then((response) => {
                setZones(response.data);
            })
            .catch((error) => {
                console.error("Error fetching zones:", error);
            });
    };

    const fetchCities = () => {
        axios
            .get("https://local-restau-springboot-backend-production.up.railway.app/api/villes/")
            .then((response) => {
                setVilles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cities:", error);
            });
    };

    const handleEdit = () => {
        axios
            .put(`https://local-restau-springboot-backend-production.up.railway.app/api/zones/update/id/${selectedZone.id}`, {
                nom,
                ville: {
                    id: selectedVilleId,
                },
            })
            .then(() => {
                setSelectedZone(null);
                setModalIsOpen(false);
                setNom("");
                setSelectedVilleId("");
                fetchZones();
            })
            .catch((error) => {
                console.error("Error updating zone:", error);
            });
    };

    const handleSubmit = () => {
        axios
            .post("https://local-restau-springboot-backend-production.up.railway.app/api/zones/save", {
                nom,
                ville: {
                    id: selectedVilleId,
                },
            })
            .then(() => {
                setModalIsOpen(false);
                setNom("");
                setSelectedVilleId("");
                fetchZones();
            })
            .catch((error) => {
                console.error("Error adding zone:", error);
            });
    };

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios
                .delete(`https://local-restau-springboot-backend-production.up.railway.app/api/zones/delete/id/${zoneId}`)
                .then(() => {
                    fetchZones();
                })
                .catch((error) => {
                    console.error("Error deleting zone:", error);
                });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
        setModalTitle("Edit Zone");
        setNom(zone.nom);
        setSelectedVilleId(zone.ville.id);
        setIsEditMode(true); // Set mode to "Edit"
    };

    return (
        <div>
            <Card>
                <Modal
                    title={modalTitle}
                    visible={modalIsOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <form>
                        <div className="form-group">
                            <label htmlFor="nom">Nom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={nom}
                                onChange={(event) => setNom(event.target.value)}
                                placeholder="Zone Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="villeId">Ville:</label>
                            <select
                                className="form-control"
                                id="villeId"
                                value={selectedVilleId}
                                onChange={(event) => setSelectedVilleId(event.target.value)}
                            >
                                <option value="">Select a ville</option>
                                {villes &&
                                    villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.nom}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </form>
                </Modal>
                <h2>Zones</h2>
                <button className="btn btn-success" onClick={showModal}>
                    Add Zone
                </button>
                <br/>
                <br/>
                <br/>
                <br/> 

                <table className="table table-bordered" style={{ width: "100%", fontSize: "20px" }}>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Ville</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones.map((zone) => (
                            <tr key={zone.id}>
                                <td>{zone.id}</td>
                                <td>{zone.nom}</td>
                                <td>{zone.ville.nom}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleOpenModal(zone)}
                                    >
                                        <EditOutlined />Update
                                    </button>

                                    <Popconfirm
                                        title="Delete Zone"
                                        description="Are you sure to delete this Zone?"
                                        onConfirm={() => handleDelete(zone.id)}
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

export default ZoneList;

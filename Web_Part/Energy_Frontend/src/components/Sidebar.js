
import React, { useState,useEffect  } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [link, setLink] = useState([]);
  const [liens, setLiens] = useState([ 
    { path: "/facture", label: "Générer facture", icon: "facture-dachat.png" },
    { path: "/historique", label: "Historique", icon: "lhistoire.png" },
    { path: "/simulation", label: "Simulez Facture", icon: "facturer.png" },
    { path: "/electricity", label: "Estimez électricité", icon: "electricite.png" },
  ]);

  const [links, setLinks] = useState([

    { path: "/PZEM1_DS18B20_12", label: "Machine à laver", icon: "machine-a-laver.png" },
    { path: "/PZEM1_DS18B20_1", label: "Ventilateur", icon: "ventilateur.png" },
    { path: "/PZEM1_DS18B20_13", label: "Micro onde", icon: "micro-ondes.png" },
    { path: "/PZEM2_DS18B20_2", label: "Télévision", icon: "journaliste.png" },
    { path: "", label: "Réfrigérateur", icon: "congelateur.png" },
    { path: "", label: "Four électrique", icon: "four.png" },
    { path: "/PZEM1_DS18B20_111", label: "Climatiseur", icon: "climatiseur.png" },
    { path: "", label: "Chaudiére", icon: "chaudiere.png" },
    { path: "", label: "Eclairage", icon: "eclairage.png" },

  ]);

  const [showModal, setShowModal] = useState(false);
  const [newLink, setNewLink] = useState({ path: "", label: "", icon: "default.png" });
  const [isCollapsed, setIsCollapsed] = useState(false); // État pour gérer la collapsibilité
  const fetchLink = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/links");
      setLink(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des liens:", error);
    }
  };

  // Récupérer les liens à l'initialisation du composant
  useEffect(() => {
    fetchLink();
  }, []);

  const handleAddLink = async () => {
    if (!newLink.path || !newLink.label) {
      alert("Both URL (path) and title (label) are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/links", newLink);
      setLinks([...links, response.data]);
      setNewLink({ path: "", label: "", icon: "default.png" });
      setShowModal(false);
      navigate('/contact'); 

    } catch (error) {
      console.error("Error adding new link:", error);
    }
  };

const handleDeleteLink = async (id) => {
  try {
      await axios.delete(`http://localhost:3000/api/links/${id}`);
      setLinks(links.filter(link => link._id !== id));
      navigate('/contact');

  } catch (error) {
      console.error('Error deleting the link:', error);
  }
};

  return (
    <div
      className={`d-flex flex-column p-3  ${
        isCollapsed ? "collapsed-sidebar" : "expanded-sidebar"
      }`}
      style={{
        width: isCollapsed ? "80px" : "280px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        transition: "all 0.3s ease",
        borderRight: "1px solid #ddd",
        backgroundColor :'#E4F2E7'
      }}
    >
      <div 
style={{
  display: 'flex',
  flexDirection: isCollapsed ? 'column-reverse' : 'row',
  justifyContent: 'space-around',
}}      >
      <button className="btn  mb-3 " onClick={() => setShowModal(true)}  style={{ alignSelf: "center",  backgroundImage:isCollapsed ?'linear-gradient(30deg, #E4F2E7, #E4F2E7)': "linear-gradient(30deg, #FF93BE, #E8026C)",color:'black',fontSize:"18px",textAlign:'center' }}>
       

       
        {isCollapsed ? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg> : "Ajouter"}
      </button>
      <button
        className="btn  mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ alignSelf: "center", backgroundColor:'transparent',color:'black',fontSize:"32px",textAlign:'center' }}
      >
        {isCollapsed ? "☰" : "☰"}
      </button>

      </div>

      
      {/* Sidebar Links */}
      <ul className="nav nav-pills flex-column mb-auto">
           {liens.map((lien, index) => (
          <li key={index} className="nav-item">
            <Link
              to={lien.path}
              className={`nav-link ${location.pathname === lien.path ? "active" : ""}`}
              style={{
                display:'flex',justifyContent:'space-between',
                color: location.pathname === lien.path ? "white" : "#007566",
                fontWeight: "bold",
                textDecoration: "none",
                backgroundColor: location.pathname === lien.path ? "#007566" : "#E4F2E7",
                display:"flex"
              }}
            >
              <div><img
                src={`./img/images/${lien.icon}`}
                alt={lien.label}
                style={{ width: "30px", marginRight: isCollapsed ? "0" : "10px" }}
              />


              {!isCollapsed && lien.label}</div>
              
              
     
            </Link>
          </li>
        ))}
        <hr></hr>
        {links.map((link, index) => (
          <li key={index} className="nav-item" >
            <Link
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              style={{
                display:'flex',justifyContent:'space-between',
                color: location.pathname === link.path ? "white" : "#007566",
                fontWeight: "bold",
                textDecoration: "none",
                backgroundColor: location.pathname === link.path ? "#007566" : "#E4F2E7",
              }}
            >
              <div><img
                src={`./img/images/${link.icon}`}
                alt={link.label}
                style={{ width: "30px", marginRight: isCollapsed ? "0" : "10px" }}
              />
              
              {!isCollapsed && link.label}</div>
              
            {!isCollapsed && <div >           <button style={{backgroundColor:'transparent',borderStyle:'none'}}> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>   
<button style={{backgroundColor:'transparent',borderStyle:'none'}}> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>   </div>}
            </Link>
            
          </li>
        ))}
                {link.map((l, index) => (
          <li key={index} className="nav-item">
            <Link
              to={l.path}
              className={`nav-link ${location.pathname === l.path ? "active" : ""}`}
              style={{
                display:'flex',justifyContent:'space-between',
                color: location.pathname === l.path ? "white" : "#007566",
                fontWeight: "bold",
                textDecoration: "none",
                backgroundColor: location.pathname === l.path ? "#007566" : "#E4F2E7",
                display:"flex"
              }}
            >
              <div><img
                src={`./img/images/iconn.png`}
                style={{ width: "30px", marginRight: isCollapsed ? "0" : "10px" }}
              />


              {!isCollapsed && l.label}</div>
              
              {!isCollapsed && <div>           <button onClick={() => handleDeleteLink(l._id)} style={{backgroundColor:'transparent',borderStyle:'none'}}> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>   
<button  style={{backgroundColor:'transparent',borderStyle:'none'}}> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>   </div>}
     
            </Link>
          </li>
        ))}
      </ul>




{showModal && (
  <div
    className="modal show d-block"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for modal overlay
      minWidth: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      className="modal-dialog"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "90%", // Augmenter la largeur de 100% ou ajustez selon vos besoins
        maxWidth: "1200px", // Optionnel, pour limiter la largeur maximale
        height: "80%",
        backgroundColor: "white",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop:"90px",
      }}
    >
      {/* Left Section with Background Image */}
      <div
        style={{
          flex: 1,
          backgroundImage: "url('./img/images/addwidget.png')", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right Section with Form */}
      <div className="modal-content"   
        style={{
          flex: 0.7,
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" style={{ color: "black", fontWeight: "bold" }}>
            Ajouter un nouveau appareil éléctrique
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
            style={{ background: "none", border: "none", fontSize: "20px" }}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label" style={{ color: "black", fontWeight: "bold" }}>
              Capteur
            </label>
            <input
              type="text"
              className="form-control"
              value={newLink.path}
              onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
              placeholder="PZEM1_DS18B20_i pour le i'éme capteur"
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "black", fontWeight: "bold" }}>
              Nom de l'appareil
            </label>
            <input
                    type="text"
                    className="form-control"
                    value={newLink.label}
                    onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  />
        </div>
        </div>

        <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            className="btn"
            onClick={() => setShowModal(false)}
            style={{
              padding: "20px",
              backgroundColor: "#8C8C8C",
              border: "none",
              borderRadius: "5px",
              color: "black",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn"
            onClick={handleAddLink}
            style={{
              padding: "20px",
              backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Sidebar;

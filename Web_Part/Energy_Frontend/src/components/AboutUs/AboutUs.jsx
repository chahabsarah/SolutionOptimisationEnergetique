import React from "react";
import "./About.css"; // Assurez-vous de lier une feuille de style ou utilisez styled-components
import { FaBatteryFull, FaChartLine, FaEnvelope, FaCheckCircle, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 style={{ color: "#589A8D" }}>
          À propos de <span style={{ color: "#E168A1" }}>EnergyFlow</span>
        </h1>
        <p>
          EnergyFlow est une application innovante pour surveiller, analyser et optimiser
          votre consommation énergétique en temps réel.
        </p>
      </header>

      <section className="about-features">
        <h2>Fonctionnalités clés</h2>
        <div className="features-grid">
          <div
            className="feature-card"
            style={{ backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)" }}
          >
            <FaChartLine className="feature-icon" />
            <h3>Analyse en temps réel</h3>
            <p style={{ color: "black" }}>
              Visualisez vos données énergétiques et thermiques instantanément avec des graphiques interactifs.
            </p>
          </div>
          <div
            className="feature-card"
            style={{ backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)" }}
          >
            <FaBatteryFull className="feature-icon" />
            <h3>Suivi précis</h3>
            <p style={{ color: "black" }}>
              Surveillez la consommation de plusieurs appareils et détectez les inefficacités.
            </p>
          </div>
          <div
            className="feature-card"
            style={{ backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)" }}
          >
            <FaEnvelope className="feature-icon" />
            <h3>Alertes intelligentes</h3>
            <p style={{ color: "black" }}>
              Recevez des alertes par email en cas d'anomalies ou de consommation excessive.
            </p>
          </div>
        </div>
      </section>

      <section className="about-why-choose">
        <h2  style={{ color: "#595959" }}>Pourquoi choisir EnergyFlow ?</h2>
        <div className="reasons-grid">
          <div className="reason-card" style={{ backgroundImage: "linear-gradient(30deg, #ADD8E6, #87CEFA)" }}
          >
            <FaCheckCircle className="reason-icon" />
            <h3  style={{color:"#466FA6"}}>Fiabilité</h3>
            <p style={{color:"#011140"}}>Des données précises et fiables pour une prise de décision éclairée.</p>
          </div>
          <div className="reason-card" style={{ backgroundImage: "linear-gradient(30deg, #ADD8E6, #87CEFA)" }}
          >
            <FaCheckCircle className="reason-icon" />
            <h3  style={{color:"#466FA6"}}>Personnalisation</h3>
            <p style={{color:"#011140"}}>Adaptez les alertes et les analyses à vos besoins spécifiques.</p>
          </div>
          <div className="reason-card" style={{ backgroundImage: "linear-gradient(30deg, #ADD8E6, #87CEFA)" }}
          >
            <FaCheckCircle className="reason-icon" />
            <h3  style={{color:"#466FA6"}}>Évolutivité</h3>
            <p  style={{color:"#011140"}}>Une plateforme qui grandit avec vos besoins en énergie.</p>
          </div>
        </div>
      </section>

      <section className="about-testimonials">
        <h2  style={{ color: "#595959" }}>Témoignages</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card" style={{ backgroundImage: "linear-gradient(30deg, #D1C4E9, #9575CD)" }}>
            <p  style={{ color: "darkblue" ,fontSize:"20px" }}>
              "Grâce à EnergyFlow, j'ai réduit ma consommation d'énergie de 30% en seulement
              trois mois. Une application incontournable !" – <strong>Marie Dupont</strong>
            </p>
          </div>
          <div className="testimonial-card" style={{ backgroundImage: "linear-gradient(30deg, #D1C4E9, #9575CD)" }}>
            <p style={{ color: "darkblue" ,fontSize:"20px" }}>
              "Les alertes intelligentes m'ont aidé à identifier des équipements énergivores
              et à faire des économies significatives." – <strong>Jean Martin</strong>
            </p>
          </div>
          <div className="testimonial-card"  style={{ backgroundImage: "linear-gradient(30deg, #D1C4E9, #9575CD)" }}
          >
            <p style={{ color: "darkblue" ,fontSize:"20px" }}>
              "Interface intuitive, analyses précises : EnergyFlow est tout simplement
              parfait." – <strong>Sophie Leclerc</strong>
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutUs;

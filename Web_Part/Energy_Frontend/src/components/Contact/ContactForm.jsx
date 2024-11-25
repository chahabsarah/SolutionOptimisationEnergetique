import React from "react";

const ContactForm = () => {
 

  
 

  return (
    <div className="contact-form1-container1" style={{paddingTop:'58px'}}>
       <section className="about-contact">
        <h2 style={{ color: "darkblue" ,fontSize:"20px" }}>Nous contacter</h2>
        <p style={{ color: "darkblue" ,fontSize:"20px" }}>Vous avez des questions ? N'hésitez pas à nous écrire !</p>
        <form className="contact-form">
          <input type="text" placeholder="Votre nom" required />
          <input type="email" placeholder="Votre email" required />
          <textarea placeholder="Votre message" rows="5" required></textarea>
          <button type="submit" className="submit-btn" style={{backgroundColor:'#87CEDF', color:"darkblue", fontWeight:"bolder"}}>Envoyer</button>
        </form>
      </section>
    </div>
  );
};

export default ContactForm;

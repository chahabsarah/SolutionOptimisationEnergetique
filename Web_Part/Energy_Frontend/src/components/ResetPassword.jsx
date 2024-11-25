import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Recaptcha from 'react-google-recaptcha'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams(); // Utilisation de useParams pour récupérer les paramètres d'URL
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const onChangeRecaptcha = (recaptchaToken) => {
    console.log("reCAPTCHA value: ", recaptchaToken);
    setRecaptchaValue(recaptchaToken);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios.post(`http://localhost:3000/api/user/reset-password/${id}/${token}`, { password })
      .then((res) => 
        {
          console.log(res?.data?.result)
      
          
            navigate('/');
         
        })
        .catch(err => console.log(err));
    } else {
      console.error("Passwords do not match");
    }
  }

  return (
    <>
    <section className="banner-area-three jarallax banner-bg-three"  style={{backgroundColor:'#7EB0CC'}}>
    
      <div className="container">
      
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-10 order-0 order-lg-2">
            <div className="banner-form-wrap">
              <h2 className="title" style={{ color: 'darkblue' }}>Nouveau mot de passe</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-grp">
                  <label htmlFor="password"><strong>Nouveau mot de passe</strong></label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    className="form-control rounded-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: 'black' }}
                  />
                  <label htmlFor="confirm-password"><strong>Retapez votre mot de passe </strong></label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    name="confirm-password"
                    className="form-control rounded-0"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ color: 'black' }}
                  />
                </div><br />
                <div className="w-50 flex-1">
    <Recaptcha
      sitekey="6Lej7MYpAAAAANcOGfuylrtynDnk9JHl-mu6mdgI"
      onChange={onChangeRecaptcha}
    />
  </div>
                <input type="submit" value="Enregistrer" className="btn btn-two"  style={{ margin: "10px", backgroundColor:"blue", width:"200px",marginLeft:"90px" }} />
                <br />
                <Link to="/home-3" className="">Se connecter?</Link>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-content-three">
            <img src="img/images/banche.svg" alt="" style={{width:"80px", marginLeft:"140px"}} />
              <h2 className="title" data-aos="fade-right" data-aos-delay="0">Définissez votre nouveau mot de passe</h2>
              <p data-aos="fade-right" data-aos-delay="300">Choisissez un mot de passe sécurisé pour protéger votre compte : définissez votre nouveau mot de passe et confirmez-le pour terminer le processus de réinitialisation.</p>
              <div className="banner-btn" data-aos="fade-right" data-aos-delay="600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ResetPassword;

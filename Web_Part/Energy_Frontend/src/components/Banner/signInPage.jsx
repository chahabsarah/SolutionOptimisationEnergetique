import { useState, useEffect } from 'react';
import { bgImgFromData } from "../../lib/helpers";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Recaptcha from 'react-google-recaptcha';

const BannerThree = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.error('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login successful:', response.data.message);
      
      if (formData.rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(formData));
      }
      
      localStorage.setItem('access_Token', response.data.accessToken);
      navigate('/PZEM1_DS18B20_1');
      
    } catch (error) {
      console.error('Failed to login', error.message);
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      setFormData(user);
    }
  }, []);

  useEffect(() => {
    bgImgFromData();
  }, []);

  return (
    <section
    style={{
      backgroundImage: "url('/img/images/haha.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft:"150px",
    }}
  >
    <div className="col-lg-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <div>
        <h2 className="title" style={{ fontSize: '48px', color: "darkblue", textAlign: "center", lineHeight: "1.5" }}>
          Dépassez les limites <br /> mesurez, surveillez, suivez et optimisez
        </h2>
      </div>
    </div>
    <div className="container" style={{ maxWidth: "500px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "30px", borderRadius: "10px" }}>
      <h2 className="title" style={{ color: 'darkblue', textAlign: 'center', fontSize: '36px', marginBottom: '20px' }}>
        Connectez-vous à Energy Flow
      </h2>
      
      <form>
        <div className="form-grp" style={{ marginBottom: '20px' }}>
          <input
            name="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              color: 'black',
              marginBottom: '10px',
            }}
          />
        </div>
  
        <div className="form-grp" style={{ marginBottom: '20px' }}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="6+ caractères, 1 majuscule"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              color: 'black',
            }}
          />
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" name="rememberMe" id="rememberMe" style={{ marginRight: '8px' }} />
            <label htmlFor="rememberMe" style={{ fontSize: '14px' }}>Se rappeler de moi</label>
          </div>
          <Link to="/forgot-password" style={{ fontSize: '14px', color: '#007bff' }}>
            Mot de passe oublié ?
          </Link>
        </div>
  
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleSubmitUser}
            className="btn"
            style={{
              padding: '12px 40px',
              backgroundColor: "blue",
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Se connecter
          </button>
        </div>
  
        
      </form>
    </div>
  
    
  </section>
  
  );
};

export default BannerThree;

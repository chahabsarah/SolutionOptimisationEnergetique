
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';
import { Spinner } from 'reactstrap';

const SimulerFacture = () => {
  const [formData, setFormData] = useState({
    duree: '1',
    usage: '1',
    PEclairage: '201',
    consom_eclairage: '0',
    Pchauffe: '201',
    consom_chauffe: '0',
    PClim: '201',
    consom_clim: '0',
    
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showInvoice, setShowInvoice] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/simuler', formData, {
        responseType: 'blob',
      });
  
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
      setShowInvoice(true);
    } catch (error) {
      console.error('There was an error!', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout header={1} footer={1}>
      <div className="containerx">
      <style>
        {
            `
           
.containerx {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


h2,h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.form-group input[type="checkbox"] {
  margin-right: 10px;
}


.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-control[type="number"] {
  width: calc(100% - 60px);
  display: inline-block;
}

.form-control ~ span {
  font-size: 14px;
  color: #555;
  display: inline-block;
  margin-left: 10px;
}

.des{
display:flex;
}
.dez{
display:flex;
justify-content:space-evenly;
}


            `
        }
      </style>
      {!showInvoice ? (
        <div>
          <h2>Informations Générales</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <div className='dez'>

              <div><label>Période de Consommation</label>
              <select
                name="duree"
                value={formData.duree}
                onChange={handleChange}
                className="form-control"
              >
                <option value="1">1 mois</option>
                <option value="2">2 mois</option>
                <option value="4">4 mois</option>
                <option value="6">6 mois</option>
                <option value="8">8 mois</option>
                <option value="10">10 mois</option>
                <option value="12">12 mois</option>
              </select></div>
             <div> <label>Usage</label>
              <select
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Domestique">Domestique</option>
                <option value="NonDomestique">Non Domestique</option>
              </select></div>
            </div>
            </div>
            <div className="form-group">
             <div className='des'>
             <label>Compteur Eclairage</label>
             <input type="checkbox" name="compteurEclairage" onChange={handleChange} />
             </div>
              <div className='dez'>

              <select
                name="PEclairage"
                value={formData.PEclairage}
                onChange={handleChange}
                className="form-control"
              >
                <option value="201">2 fils - 5 A</option>
                <option value="202">2 fils - 10 A</option>
                <option value="203">2 fils - 15 A</option>
                <option value="204">2 fils - 20 A</option>
                <option value="207">2 fils - 30 A</option>
                <option value="210">2 fils - 45 A</option>
                <option value="214">2 fils - 63 A</option>
                <option value="222">2 fils - 100 A</option>
                <option value="227">2 fils - 125 A</option>
                <option value="235">2 fils - 160 A</option>
                <option value="250">2 fils - 225 A</option>
                <option value="403">4 fils - 5 A</option>
                <option value="407">4 fils - 10 A</option>
                <option value="410">4 fils - 15 A</option>
                <option value="413">4 fils - 20 A</option>
                <option value="420">4 fils - 30 A</option>
                <option value="433">4 fils - 50 A</option>
                <option value="442">4 fils - 63 A</option>
                <option value="450">4 fils - 75 A</option>
                <option value="454">4 fils - 80 A</option>
                <option value="467">4 fils - 100 A</option>
                <option value="483">4 fils - 125 A</option>
                <option value="500">4 fils - 160 A</option>
                <option value="506">4 fils - 200 A</option>
                <option value="565">4 fils - 250 A</option>
                <option value="600">4 fils - 300 A</option>
              </select>
              <input
                type="number"
                name="consom_eclairage"
                value={formData.consom_eclairage}
                onChange={handleChange}
                className="form-control"
                required
              />
              <span>Kwh</span>
            </div>
            </div>

            <div className="form-group">
              <div className='des'>
              <label>Compteur Chauffe-eau</label>
              <input type="checkbox" name="compteurChauffeEau" onChange={handleChange} />
              </div>
              <div className='dez'>

              <select
                name="Pchauffe"
                value={formData.Pchauffe}
                onChange={handleChange}
                className="form-control"
              >
                <option value="201">2 fils - 5 A</option>
                <option value="202">2 fils - 10 A</option>
                <option value="203">2 fils - 15 A</option>
                <option value="204">2 fils - 20 A</option>
                <option value="207">2 fils - 30 A</option>
                <option value="210">2 fils - 45 A</option>
                <option value="214">2 fils - 63 A</option>
                <option value="222">2 fils - 100 A</option>
                <option value="227">2 fils - 125 A</option>
                <option value="235">2 fils - 160 A</option>
                <option value="250">2 fils - 225 A</option>
                <option value="403">4 fils - 5 A</option>
                <option value="407">4 fils - 10 A</option>
                <option value="410">4 fils - 15 A</option>
                <option value="413">4 fils - 20 A</option>
                <option value="420">4 fils - 30 A</option>
                <option value="433">4 fils - 50 A</option>
                <option value="442">4 fils - 63 A</option>
                <option value="450">4 fils - 75 A</option>
                <option value="454">4 fils - 80 A</option>
                <option value="467">4 fils - 100 A</option>
                <option value="483">4 fils - 125 A</option>
                <option value="500">4 fils - 160 A</option>
                <option value="506">4 fils - 200 A</option>
                <option value="565">4 fils - 250 A</option>
                <option value="600">4 fils - 300 A</option>
              </select>
              <input
                type="number"
                name="consom_chauffe"
                value={formData.consom_chauffe}
                onChange={handleChange}
                className="form-control"
                required
              />
              <span>Kwh</span>
            </div>
            </div>

            <div className="form-group">
            <div className='des'>

              <label>Compteur Climatisation</label>
              <input type="checkbox" name="compteurClimatisation" onChange={handleChange} />
              </div>
              <div className='dez'>

              <select
                name="PClim"
                value={formData.PClim}
                onChange={handleChange}
                className="form-control"
              >
                <option value="201">2 fils - 5 A</option>
                <option value="202">2 fils - 10 A</option>
                <option value="203">2 fils - 15 A</option>
                <option value="204">2 fils - 20 A</option>
                <option value="207">2 fils - 30 A</option>
                <option value="210">2 fils - 45 A</option>
                <option value="214">2 fils - 63 A</option>
                <option value="222">2 fils - 100 A</option>
                <option value="227">2 fils - 125 A</option>
                <option value="235">2 fils - 160 A</option>
                <option value="250">2 fils - 225 A</option>
                <option value="403">4 fils - 5 A</option>
                <option value="407">4 fils - 10 A</option>
                <option value="410">4 fils - 15 A</option>
                <option value="413">4 fils - 20 A</option>
                <option value="420">4 fils - 30 A</option>
                <option value="433">4 fils - 50 A</option>
                <option value="442">4 fils - 63 A</option>
                <option value="450">4 fils - 75 A</option>
                <option value="454">4 fils - 80 A</option>
                <option value="467">4 fils - 100 A</option>
                <option value="483">4 fils - 125 A</option>
                <option value="500">4 fils - 160 A</option>
                <option value="506">4 fils - 200 A</option>
                <option value="565">4 fils - 250 A</option>
                <option value="600">4 fils - 300 A</option>
              </select>
              <input
                type="number"
                name="consom_clim"
                value={formData.consom_clim}
                onChange={handleChange}
                className="form-control"
                required
              />
              <span>Kwh</span>
            </div>
            </div>

            

            <button type="submit" className="btn" style={{
                      backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)",marginLeft:"80%"
            }}>Simulez</button>
          </form>
        </div>
      ) : (
        <div id='i'>
          <img src={imageUrl} alt="Simulation Result" style={{marginLeft:"10%",borderStyle:"solid",borderRadius:"8px",borderColor:"#05C7F2",height:"700px"}} />
        </div>
      )}
    </div>
      
    </Layout>
  );
};

export default SimulerFacture;

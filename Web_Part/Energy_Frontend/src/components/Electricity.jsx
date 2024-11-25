import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';

const Electricity = () => {
  const [formData, setFormData] = useState({
    // Eclairage
    lustre_li: '4',  // Total des lampes dans les lustres: LI
    nbh_lustre_li: '4',  // Total des lampes dans les lustres: LI
    lustre_lbc: '2',  // Total des lampes dans les lustres: LBC
    nbh_lustre_lbc: '2',  // Total des lampes dans les lustres: LBC
    lampes: '6',  // Lampes à Incandescence
    nbh_lampes: '6',  // Lampes à Incandescence
    neons: '9',  // Tubes néon
    nbh_neons: '9',  // Tubes néon
    lampes_eco: '8',  // Lampes Economiques
    nbh_lampes_eco: '8',  // Lampes Economiques

    // Téléviseur & Parabole
    tv_1: '0,150',  // Grande tv ( 0,114 moy) (0,073 petit)
    nbh_tv_1: '5',  // Utilisation h/j
    tv_2: '0,073',  // Grande tv ( 0,114 moy) (0,073 petit)
    parabole_2: '0',  // parabole (0,020 oui)) ,( 0 non)
    nbh_tv_2: '5',  // Utilisation h/j

    // Réfrigération
    refrige_1: '53',  // Réfrigérateur 1 ( 53 deux portes) ( 36 un porte)
    refrige_2: '36',  // Réfrigérateur 2 ( 53 deux portes) ( 36 un porte)
    congelateur: '64',  // congelateur ( 64 oui) ( 0 non)

    // Four
    four: '1,8',  // Four
    nb_repas_four: '5',  // Nombre de repas par semaine
    micro_onde: '0,15',  // Micro-ondes
    nb_repas_mon: '6',  // Nombre de repas par semaine

    // Chauffe-eau électrique
    chauffe_eau_ele: '2,4',  // Chauffe-eau électrique (2,4 oui) (0 non)
    chauffe_eau_ele_cont: '1,3',  // Chauffe-eau électrique (1,3 oui) (1 non)
    nb_d_hiver: '5',  // Nombre de douches par personne et par semaine
    nb_d_ete: '9',  // Nombre de douches par personne et par semaine

    // Chauffage électrique
    nb_chuffage_ele_1: '5',  // Nombre de chauffages électriques
    type_chauffage_ele_1: '1,675',  // Type (1,675 Bain d'huile) (0,750 Plaque chauffante)
    nb_h_ch_e_1: '11',  // Utilisation h/j

    nb_chuffage_ele_2: '5',  // Nombre de chauffages électriques
    type_chauffage_ele_2: '0,750',  // Type (1,675 Bain d'huile) (0,750 Plaque chauffante)
    nb_h_ch_e_2: '11',  // Utilisation h/j

    // Climatiseur
    nbr_clim_1: '2',  // Nombre de climatiseurs
    pw_clim_1: '0,777',  // BTU
    nbr_h_clim_ete_1: '5',  // Utilisation h/j: Été

    // Lave-linge
    m_laver_1: '1',  // Oui ou non
    type_m_laver_1: '0,45',  // 0,45 Petite (Semi-automatique) 0,90 Grande (Automatique)
    nbr_less_1: '5',  // Lessives par semaine

    // Fer à repasser
    fer_ar: '0,3',  // Utilisation r/s
    nbr_fer_ar: '8',  // Utilisation r/s

    // Micro-ordinateur
    nbr_micro_ordi: '8',  // Utilisation r/s
    nbr_h_micro_ordi: '16',  // Utilisation r/s
    nb_pers :'4',
    // Autres équipements (ajoutez les champs nécessaires ici)
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

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
      const response = await axios.post('http://localhost:5000/estimate', formData, {
        responseType: 'blob',
      });
  
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
    } catch (error) {
      console.error('There was an error!', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <Layout header={1} footer={1}>
      
      <div>
      {!imageUrl ? (
<form name="estimation"onSubmit={handleSubmit} >
 <input type="hidden" name="nccharset" value="9D4E846E"/>
 <div>Taille du m&eacute;nage (Nombre de personne par famille)
 <select name="nb_pers" class="texte1"  value={formData.nb_pers}
        onChange={handleChange}>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">12</option>
 </select>
 </div>
 
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="3"><b>Eclairage</b></td>
 </tr>
 <tr>
 <td width="55%">Total des lampes dans les lustres: LI</td>
 <td width="15%"><select name="lustre_li" class="texte1" 
  value={formData.lustre_li}
                onChange={handleChange}
               >
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30">30</option>
 </select>
 </td>
 <td width="30%">Utilisation h/j
 <select name="nbh_lustre_li" class="texte1"
  value={formData.nbh_lustre_li}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 <tr>
 <td>Total des lampes dans les lustres: LBC</td>
 <td><select name="lustre_lbc" class="texte1"
  value={formData.lustre_lbc}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30">30</option>
 </select>
 </td>
 <td>Utilisation h/j
 <select name="nbh_lustre_lbc" class="texte1"value={formData.nbh_lustre_lbc}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 <tr>
 <td>Lampes &agrave; Incandescence</td>
 <td><select name="lampes" class="texte1"value={formData.lampes}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30">30</option>
 </select>
 &nbsp;</td>
 <td>Utilisation h/j
 <select name="nbh_lampes" class="texte1" value={formData.nbh_lampes}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 <tr>
 <td>Tubes n&eacute;on</td>
 <td><select name="neons" class="texte1" value={formData.neons}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30">30</option>
 </select>
 </td>
 <td>Utilisation h/j
 <select name="nbh_neons" class="texte1" value={formData.nbh_neons}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 <tr>
 <td>Lampes Economiques</td>
 <td><select name="lampes_eco" class="texte1" value={formData.lampes_eco}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30">30</option>
 </select>
 </td>
 <td>Utilisation h/j
 <select name="nbh_lampes_eco" class="texte1" value={formData.nbh_lampes_eco}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 <tr>
   <td colspan="3" style={{color:"#FF0000", fontWeight:"bold", fontSize:"10px"}}>h/j: Heures par Jours</td>
 </tr>
 </table>
 <table width="100%" class="texte1" style={{verticalAlign:"top"}}>
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="3"><b>T&eacute;l&eacute;viseur &amp; Parabole</b></td>
 </tr>
 <tr>
 <td width="45%" valign="top">T&eacute;l&eacute;viseur 1
 <select id="tv_1" name="tv_1" class="texte1" value={formData.tv_1}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,073">Petit (-50 cm)</option>
 <option value="0,114">Moyen (50 &agrave; 60 cm)</option>
 <option value="0,150">Grand (+60 cm)</option>
 </select>
 </td><td width="25%">
 Parabole 1
 <select id="parabole_1" name="parabole_1" class="texte1" value={formData.parabole_1}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,020">Oui</option>
 </select>
 </td><td width="30%">
 Utilisation h/j
 <select id="nbh_tv_1" name="nbh_tv_1" class="texte1" value={formData.nbh_tv_1}
  onChange={handleChange}>
 <option value="0"></option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select></td>
 </tr>
 <tr>
 <td width="33%" valign="top">T&eacute;l&eacute;viseur 2
 <select name="tv_2" class="texte1">
 <option value="0">Non</option>
 <option value="0,073">Petit (-50 cm)</option>
 <option value="0,114">Moyen (50 &agrave; 60 cm)</option>
 <option value="0,150">Grand (+60 cm)</option>
 </select>
 </td><td>
 Parabole 2
 <select name="parabole_2" class="texte1" value={formData.parabole_2}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,020">Oui</option>
 </select>
 </td><td>
 Utilisation h/j
 <select name="nbh_tv_2" class="texte1" value={formData.nbh_tv_2}
                onChange={handleChange}
                >
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td></tr>
 <tr>
 <td width="33%" valign="top">T&eacute;l&eacute;viseur 3
 <select name="tv_3" class="texte1" value={formData.tv_3}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,073">Petit (-50 cm)</option>
 <option value="0,114">Moyen (50 &agrave; 60 cm)</option>
 <option value="0,150">Grand (+60 cm)</option>
 </select>
 </td><td>
 Parabole 3
 <select name="parabole_3" class="texte1" value={formData.parabole_3}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,020">Oui</option>
 </select>
 </td><td>
 Utilisation h/j
 <select name="nbh_tv_3" class="texte1"  value={formData.nbh_tv_3}
  onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select>
 </td>
 </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="3"><b style={{textAlign:"left"}}>R&eacute;frig&eacute;ration</b></td>
 </tr>
 <tr>
 <td width="30%">R&eacute;frig&eacute;rateur 1
 <select name="refrige_1" class="texte1"  value={formData.refrige_1}
  onChange={handleChange}>
 <option value="0"></option>
 <option value="36">1 porte</option>
 <option value="53">2 portes</option>
 </select>
 </td><td width="30%">
 R&eacute;frig&eacute;rateur 2
 <select name="refrige_2" class="texte1" 
  value={formData.refrige_2}
  onChange={handleChange}>
 <option value="0"></option>
 <option value="36">1 porte</option>
 <option value="53">2 portes</option>
 </select>
 </td><td width="30%">
 Cong&eacute;lateur
 <select name="congelateur" class="texte1" value={formData.congelateur}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="64">Oui</option>
 </select>
 </td>
 </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="4" width="50%"><b>Four</b></td>
 <td colspan="4" width="50%" style={{paddingLeft:"10px"}}><b>Micro-ondes</b></td>
 </tr>
 <tr>
 <td width="15%">Four</td><td width="10%">
 <select name="four" class="texte1" value={formData.four}
  onChange={handleChange}>
 <option value="0">Non</option>
 <option value="1,8">Oui</option>
 </select>
 </td><td width="15%">
 Nombre de r/j</td><td width="10%">
 <select name="nb_repas_four" class="texte1" value={formData.nb_repas_four}
  onChange={handleChange}>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td>
 <td width="15%" style={{paddingLeft:"10px"}}>Micro-ondes</td><td width="10%">
 <select name="micro_onde" class="texte1" 
 value={formData.micro_onde}
 onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,15">Oui</option>
 </select>
 </td><td width="15%">
 Nombre de r/j</td><td width="10%">
 <select name="nb_repas_mon" class="texte1"
  value={formData.nb_repas_mon}
  onChange={handleChange}>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td>
 </tr>
 <tr>
   <td colspan="8" style={{color:"#FF0000", fontWeight:"bold", fontSize:"10px"}}>r/j: Repas par Jours</td>
 </tr>
 </table>

 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="2"><b>Chauffe eau &eacute;lectrique</b></td>
 </tr>
 <tr>
 <td width="60%">Chauffe eau &eacute;lectrique
   <select name="chauffe_eau_ele" class="texte1"  value={formData.chauffe_eau_ele}
 onChange={handleChange}>
     <option value="0">Non</option>
     <option value="2,4">Oui</option>
   </select></td>
 <td>Fonctionnement en continu ?
   <select name="chauffe_eau_ele_cont" class="texte1"  value={formData.chauffe_eau_ele_cont}
 onChange={handleChange}>
     <option value="1">Non</option>
     <option value="1,3">Oui</option>
   </select></td>
 </tr><tr><td>
 Nombre de douches   par personne et par semaine</td>
   <td>Hiver
     <select name="nb_d_hiver" class="texte1"  value={formData.nb_d_hiver}
 onChange={handleChange}>
   <option value="0">&nbsp;</option>
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
   <option value="6">6</option>
   <option value="7">7</option>
   <option value="8">8</option>
   <option value="9">9</option>
   <option value="10">10</option>
 </select>
     Et&eacute;
     <select name="nb_d_ete" class="texte1"  value={formData.nb_d_ete}
 onChange={handleChange}>
  <option value="0">&nbsp;</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
</select>
 </td>
 </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="3"><b>Chauffage &eacute;lectrique</b></td>
 </tr>
 <tr>
 <td width="30%">Nombre
   <select name="nb_chuffage_ele_1" class="texte1"  value={formData.nb_chuffage_ele_1}
 onChange={handleChange}>
 <option value="0"></option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 </select>
 </td><td width="40%">
 Type
 <select name="type_chauffage_ele_1" class="texte1" 
  value={formData.type_chauffage_ele_1}
 onChange={handleChange}>
 <option value="1,675">Bain d'huile</option>
 <option value="0,750">Plaque chauffante</option>
 </select>
 </td><td width="30%">
 Utilisation h/j
 <select name="nb_h_ch_e_1" class="texte1"
 value={formData.nb_h_ch_e_1}
 onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select></td></tr><tr>
 <td width="33%">Nombre
   <select name="nb_chuffage_ele_2" class="texte1"
   value={formData.nb_chuffage_ele_2}
   onChange={handleChange}>
 <option value="0"></option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 </select>
 </td><td>
 Type
 <select name="type_chauffage_ele_2" class="texte1" value={formData.type_chauffage_ele_2}
 onChange={handleChange}>
 <option value="1,675">Bain d'huile</option>
 <option value="0,750">Plaque chauffante</option>
 </select>
 </td><td>
 Utilisation h/j
 <select name="nb_h_ch_e_2" class="texte1" 
 value={formData.nb_h_ch_e_2}
 onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select></td></tr><tr>
 <td width="33%">Nombre
   <select name="nb_chuffage_ele_3" class="texte1" value={formData.nb_chuffage_ele_3}
 onChange={handleChange}>
 <option value="0"></option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 </select>
 </td><td>
 Type
 <select name="type_chauffage_ele_3" class="texte1" value={formData.type_chauffage_ele_3}
 onChange={handleChange}>
 <option value="1,675">Bain d'huile</option>
 <option value="0,750">Plaque chauffante</option>
 </select>
 </td><td>
 Utilisation h/j
 <select name="nb_h_ch_e_3" class="texte1" value={formData.nb_h_ch_e_3}
 onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 </select></td>
 </tr>
 </table>
 <table width="100%" class="texte1">
   <tr bgcolor="#CCCCCC" height="20px">
     <td colspan="5"><b>Climatiseur</b></td>
   </tr>
   <tr>
     <td width="16%">Nombre
       <select id="nbr_clim_1" name="nbr_clim_1" class="texte1" value={formData.nbr_clim_1}
 onChange={handleChange}>
             <option value="0"></option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
       </select></td><td width="18%"> BTU
       <select id="pw_clim_1" name="pw_clim_1" class="texte1"
        value={formData.pw_clim_1}
 onChange={handleChange}>
           <option value="0"></option>
           <option value="0,777">7000</option>
           <option value="1">9000</option>
           <option value="1,333">12000</option>
           <option value="1,666">15000</option>
           <option value="2">18000</option>
           <option value="2,666">24000</option>
       </select></td>
     <td width="22%"> Reversible
       <select id="clim_rev_1" name="clim_rev_1" class="texte1"   value={formData.clim_rev_1}
 onChange={handleChange}>
           <option value="0">Non</option>
           <option value="1">Oui</option>
       </select></td>
     <td width="18%"> Utilisation h/j:</td>
     <td> Et&eacute;
       <select id="nbr_h_clim_ete_1" name="nbr_h_clim_ete_1" class="texte1"   value={formData.nbr_h_clim_ete_1}
 onChange={handleChange}>
           <option value="0">&nbsp;</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
           <option value="11">11</option>
           <option value="12">12</option>
        </select>
       <span id="clim_1" style={{display:"none"}}>Hiver
	    <select id="nbr_h_clim_1" name="nbr_h_clim_1" class="texte1"   value={formData.nbr_h_clim_1}
 onChange={handleChange}>
         <option value="0">&nbsp;</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
       </select>
       </span></td>
   </tr>
   <tr>
     <td>Nombre
       <select id="nbr_clim_2" name="nbr_clim_2" class="texte1"  
        value={formData.nbr_clim_2}
 onChange={handleChange}>
             <option value="0"></option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
       </select></td><td> BTU
       <select id="pw_clim_2" name="pw_clim_2" class="texte1" value={formData.pw_clim_2}
 onChange={handleChange}>
           <option value="0"></option>
           <option value="0,777">7000</option>
           <option value="1">9000</option>
           <option value="1,333">12000</option>
           <option value="1,666">15000</option>
           <option value="2">18000</option>
           <option value="2,666">24000</option>
       </select></td>
     <td> Reversible
       <select id="clim_rev_2" name="clim_rev_2" class="texte1" value={formData.clim_rev_2}
 onChange={handleChange}>
           <option value="0">Non</option>
           <option value="1">Oui</option>
       </select></td>
     <td> Utilisation h/j:</td>
     <td>Et&eacute;
       <select id="nbr_h_clim_ete_2" name="nbr_h_clim_ete_2" class="texte1" value={formData.nbr_h_clim_ete_2}
 onChange={handleChange}>
         <option value="0">&nbsp;</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
        </select><span id="clim_2" style={{display:"none", paddingLeft:"5px"}}>Hiver 
           <select id="nbr_h_clim_2" name="nbr_h_clim_2" class="texte1"
            value={formData.nbr_h_clim_2}
 onChange={handleChange}>
               <option value="0">&nbsp;</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
               <option value="11">11</option>
               <option value="12">12</option>
             </select>
         </span></td></tr>
   <tr>
     <td>Nombre
       <select id="nbr_clim_3" name="nbr_clim_3" class="texte1"   value={formData.nbr_clim_3}
 onChange={handleChange}>
             <option value="0"></option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
       </select></td><td> BTU
       <select id="pw_clim_3" name="pw_clim_3" class="texte1"   value={formData.pw_clim_3}
 onChange={handleChange}>
           <option value="0"></option>
           <option value="0,777">7000</option>
           <option value="1">9000</option>
           <option value="1,333">12000</option>
           <option value="1,666">15000</option>
           <option value="2">18000</option>
           <option value="2,666">24000</option>
       </select></td>
     <td> Reversible
       <select id="clim_rev_3" name="clim_rev_3" class="texte1"   value={formData.clim_rev_3}
 onChange={handleChange}>
           <option value="0">Non</option>
           <option value="1">Oui</option>
       </select></td>
     <td> Utilisation h/j:</td>
     <td>Et&eacute;
       <select id="nbr_h_clim_ete_3" name="nbr_h_clim_ete_3" class="texte1"   value={formData.nbr_h_clim_ete_3}
 onChange={handleChange}>
             <option value="0">&nbsp;</option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
             <option value="11">11</option>
             <option value="12">12</option>
         </select> <span id="clim_3" style={{display:"none"}}>Hiver
       <select id="nbr_h_clim_3" name="nbr_h_clim_3" class="texte1"  
        value={formData.nbr_h_clim_3}
 onChange={handleChange}>
         <option value="0">&nbsp;</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
       </select></span></td></tr>
   <tr>
     <td>Nombre
       <select id="nbr_clim_4" name="nbr_clim_4" class="texte1"  value={formData.nbr_clim_4}
 onChange={handleChange}>
             <option value="0"></option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
       </select></td><td> BTU
       <select id="pw_clim_4" name="pw_clim_4" class="texte1"  value={formData.pw_clim_4}
 onChange={handleChange}>
           <option value="0"></option>
           <option value="0,777">7000</option>
           <option value="1">9000</option>
           <option value="1,333">12000</option>
           <option value="1,666">15000</option>
           <option value="2">18000</option>
           <option value="2,666">24000</option>
       </select></td>
     <td> Reversible
       <select id="clim_rev_4" name="clim_rev_4" class="texte1"  value={formData.clim_rev_4}
 onChange={handleChange}>
           <option value="0">Non</option>
           <option value="1">Oui</option>
       </select></td>
     <td> Utilisation h/j:</td>
     <td>Et&eacute;
       <select id="nbr_h_clim_ete_4" name="nbr_h_clim_ete_4" class="texte1"  value={formData.nbr_h_clim_ete_4}
 onChange={handleChange}>
             <option value="0">&nbsp;</option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
             <option value="11">11</option>
             <option value="12">12</option>
         </select> <span id="clim_4" style={{display:"none"}}>Hiver
       <select id="nbr_h_clim_4" name="nbr_h_clim_4" class="texte1"
        value={formData.nbr_h_clim_4}
        onChange={handleChange}>
         <option value="0">&nbsp;</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
       </select></span></td></tr>
   <tr>
     <td>Nombre
       <select id="nbr_clim_5" name="nbr_clim_5" class="texte1" value={formData.nbr_clim_5}
        onChange={handleChange}>
             <option value="0"></option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
       </select></td><td> BTU
       <select id="pw_clim_5" name="pw_clim_5" class="texte1" value={formData.pw_clim_5}
        onChange={handleChange}>
           <option value="0"></option>
           <option value="0,777">7000</option>
           <option value="1">9000</option>
           <option value="1,333">12000</option>
           <option value="1,666">15000</option>
           <option value="2">18000</option>
           <option value="2,666">24000</option>
       </select></td>
     <td> Reversible
       <select id="clim_rev_5" name="clim_rev_5" class="texte1" value={formData.clim_rev_5}
        onChange={handleChange}>
           <option value="0">Non</option>
           <option value="1">Oui</option>
       </select></td>
     <td> Utilisation h/j:</td>
     <td>Et&eacute;
       <select id="nbr_h_clim_ete_5" name="nbr_h_clim_ete_5" class="texte1" value={formData.nbr_h_clim_ete_5}
        onChange={handleChange}>
             <option value="0">&nbsp;</option>
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="9">9</option>
             <option value="10">10</option>
             <option value="11">11</option>
             <option value="12">12</option>
         </select> <span id="clim_5" style={{display:"none"}}>Hiver
       <select id="nbr_h_clim_5" name="nbr_h_clim_5" class="texte1" value={formData.nbr_h_clim_5}
        onChange={handleChange}>
         <option value="0">&nbsp;</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
         <option value="11">11</option>
         <option value="12">12</option>
       </select></span></td></tr>
   <tr>
     <td colspan="5" style={{color:"#FF0000", fontWeight:"bold", fontSize:"10px"}}>BTU: Puissance unitaire</td>
   </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td colspan="3"><b>Lave linge</b></td>
 </tr>
 <tr>
 <td width="30%">Machine &agrave; laver 1
 <select name="m_laver_1" class="texte1"
  value={formData.m_laver_1}
        onChange={handleChange}>
 <option value="0">Non</option>
 <option value="1">Oui</option>
 </select>
 </td>
 <td width="40%">
 Type 
   <select name="type_m_laver_1" class="texte1"
   value={formData.type_m_laver_1}
   onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="0,45">Petite (Semi-automatique)</option>
 <option value="0,90">Grande (Automatique)</option>
 </select>
 </td><td width="30%">
 Lessives par semaine
 <select name="nbr_less_1" class="texte1" value={formData.nbr_less_1}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td></tr><tr>
 <td>Machine &agrave; laver 2
 <select name="m_laver_2" class="texte1" value={formData.m_laver_2}
        onChange={handleChange}>
 <option value="0">Non</option>
 <option value="1">Oui</option>
 </select>
 </td>
 <td>
 Type 
   <select name="type_m_laver_2" class="texte1" 
   value={formData.type_m_laver_2}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="0,45">Petite (Semi-automatique)</option>
 <option value="0,90">Grande (Automatique)</option>
 </select>
 </td><td>
 Lessives par semaine
 <select name="nbr_less_2" class="texte1" value={formData.nbr_less_2}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td>
 </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td width="50%" colspan="2"><b>Fer &agrave; repasser</b></td>
 <td width="50%" colspan="2" style={{paddingLeft:"10px"}}><b>Micro-Ordinateur</b></td>
 </tr>
 <tr>
 <td>Fer &agrave; repasser
 <select name="fer_ar" class="texte1" value={formData.fer_ar}
        onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,3">Oui</option>
 </select>
 </td>
 <td>
 Utilisation r/s
   <select name="nbr_fer_ar" class="texte1" value={formData.nbr_fer_ar}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td>
 <td style={{paddingLeft:"10px"}}>Nombre
 <select name="nbr_micro_ordi" class="texte1" 
 value={formData.nbr_micro_ordi}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 </select>
 </td><td>
 Utilisation h/j
 <select name="nbr_h_micro_ordi" class="texte1"  value={formData.nbr_h_micro_ordi}
        onChange={handleChange}>
 <option value="0">&nbsp;</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 </select>
 </td>
 </tr>
 <tr>
   <td colspan="4" style={{color:"#FF0000", fontWeight:"bold", fontSize:"10px"}}>r/s: Repassages par Semaine</td>
 </tr>
 </table>
 <table width="100%" class="texte1">
 <tr bgcolor="#CCCCCC" height="20px">
 <td><b>Autres &eacute;quipements</b></td>
 </tr>
 <tr>
 <td width="100%" colspan="3">Autres &eacute;quipements
 <select name="autres_eqm" class="texte1"  value={formData.autres_eqm}
        onChange={handleChange}>
 <option value="0">Non</option>
 <option value="0,05">Oui</option>
 </select>
 </td>
 </tr>
 </table>
 
 <button type="submit" className="btn" style={{
                      backgroundImage: "linear-gradient(30deg, #FF93BE, #E8026C)",marginLeft:"80%"
            }}>Envoyer</button>
          </form>
       
      ) : (
        <div>
        <h3 style={{color:"#05C7F2",marginLeft:"45%",marginTop:"10px",fontSize:"12px"}}>Hiver</h3>
          <img src={imageUrl} alt="Simulation Result" style={{marginLeft:"20%",borderStyle:"solid",borderRadius:"8px",borderColor:"#05C7F2", height:"1000px",width:"800px"}} />
        </div>
      )}
      <style>{
            `
            td,p,div{ color:black;}
            `}</style>
   </div>
    </Layout>
  );
};

export default Electricity;


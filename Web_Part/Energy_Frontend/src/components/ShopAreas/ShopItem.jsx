// import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShopItem = ({ challenge }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    country: '',
    profession: '',
    picture:"",
    aboutMe:"",
    facebookLink:"",
    instagramLink:"",
    linkedInLink:"",
    githubLink:"",
    cv:"",
  });
  const [followersCount, setFollowersCount] = useState(110);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('tell us about yourself!');
  const [facebookLink, setFacebookLink] = useState('your facebook link');
  const [instagramLink, setInstagramLink] = useState('your instagram link');
  const [githubLink, setGithubLink] = useState('your gitbub link');
  const [linkedInLink, setLinkedInLink] = useState('your linkedIn link');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const access_token = localStorage.getItem('access_Token');
        if (!access_token) {
          throw new Error('Access Token not found');
        }

        const response = await axios.get('http://localhost:3000/api/user/current', {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: access_token,
          },
        });
        setUserData(  ({
          ...userData,
          firstname: response.data.result?.firstname || '',
          lastname: response.data.result?.lastname || '',
          email: response.data.result?.email || '',
          phone_number: response.data.result?.phone_number || '',
          country: response.data.result?.country || '',
          profession: response.data.result?.profession || '',
          picture: response.data.result?.picture || '',
          aboutMe: response.data.result?.aboutMe || '', 
          facebookLink: response.data.result?.facebookLink || '', 
          githubLink: response.data.result?.githubLink || '',
          linkedInLink: response.data.result?.linkedInLink || '',
          instagramLink: response.data.result?.instagramLink || '',
        }));
        setUserType(response.data.result?.userType || '');

        console.log(' userData:' ,userData)
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUserData();
  }, []);
  const handleSolutionSubmit = (challengeId) => {
    navigate(`/solution/${challengeId}`);
  };
  const handleSolutionBrowse = (challengeId) => {
    navigate(`/solutions/${challengeId}`);
  };
  const handleCreateTeam = (challengeId) => {
    navigate(`/createteam/${challengeId}`);
  };
  const handleEvaluateSolution = async () => {
    try {
      const access_token = localStorage.getItem('access_Token');
      if (!access_token) {
        throw new Error('Access Token not found');
      }

      await axios.get(`http://localhost:3000/api/solution/evaluate/${challenge._id}`, {
        headers: {
          Authorization: access_token,
        },
      });

      console.log('Évaluation des solutions terminée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'évaluation des solutions:', error.message);
    }
  };


  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/solution/getSolutionOutputAndIdByChallengeId/${challenge.challengeId}`);
        setSolutions(response.data);

      } catch (error) {
        console.error('Failed to fetch solutions:', error.message);
      }
    };

    fetchSolutions();
  }, [challenge._id]);

  const [isFavorite, setIsFavorite] = useState(false);

 
  return (
    <>
   <ToastContainer />

<div className="shop-item" style={{ marginBottom: '20px', padding: '13px', border: '4px solid darkblue', borderRadius: '20px' }}>
  <div className="shop-thumb">
    <Link to={`/challenge/${challenge._id}`}>
      <img src={`data:${challenge.picture.contentType};base64,${challenge.picture.data}`} alt={challenge.challengeName} style={{ width: '100%', borderRadius: '5px' }} />
    </Link>

    <div className="shop-action">
      <Link to={`/blog-details/${challenge._id}`}>
        <i className="fas fa-eye" />
      </Link>
      
     
    </div>
    
  </div>

  <div className="shop-content">
    <Link to={`/challenge/${challenge._id}`} className="tag">
      {challenge.category}
    </Link>

    <h2 className="title">
      <Link to={`/blog-details/${challenge._id}`}>{challenge.challengeName}</Link>
    </h2>

    <h3 className="price">{challenge.price}</h3>
    <p className="price">Start Date: {challenge.startDate}</p>
    <p className="price">Deadline: {challenge.deadline}</p>
    <p className="price">Status: {challenge.status}</p>
    
       {userType === 'user' && (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <button
            type="button"
            className="abt"
            onClick={handleSolutionSubmit}
            style={{
              borderStyle:'solid',
              boredrColor:"darkblue",
              backgroundColor:"darkblue",
              marginRight: '10px',
              fontSize: '12px',
              fontWeight: 'normal',
              width: '110px',
              textAlign: 'center',
              borderRadius:"10px",
              color:"white",

            }}
          >
            Solo join
          </button>

          <button
            type="button"
            className="abt"
            onClick={() => handleCreateTeam(challenge._id)}
            style={{
              borderStyle:'solid',
              boredrColor:"darkblue",
              backgroundColor:"darkblue",
              borderRadius:"10px",
              marginRight: '10px',
              fontSize: '12px',
              fontWeight: 'normal',
              width: '125px',
              textAlign: 'center',
              color:"white",

            }}
          >
            Create Team
          </button>
        </div>
      )}

      {userType != 'user' && (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', marginBottom: '20px' }}>
          <button
            type="button"
            className="btn"
            onClick={() => handleSolutionBrowse(challenge._id)}

            // onClick={handleSolutionBrowse}
            style={{
              borderStyle:'solid',
              boredrColor:"darkblue",
              backgroundColor:"darkblue",
              marginRight: '10px',
              fontSize: '12px',
              fontWeight: 'normal',
              width: '150px',
              textAlign: 'center'
            }}
          >
            Solutions
          </button>
        </div>
      )}

      </div>
    </div>
   
    </>
  
  );
  
};

export default ShopItem;

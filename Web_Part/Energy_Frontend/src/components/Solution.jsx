import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../layouts/Layout";
import axios from 'axios';

const Solution = () => {
  const { challengeId } = useParams(); // Collecting challengeId from the URL
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/solution/getSolutionOutputAndIdByChallengeId/${challengeId}`);
        const data = response.data;
        if (!data || !data.solutions) {
          throw new Error('Solutions not found');
        }
        setSolutions(data.solutions);
      } catch (error) {
        console.error('Failed to fetch solution data:', error.message);
      }
    };
  
    fetchSolutionData();
  }, [challengeId]);

  const getSolutionResultByIdSolution = async (solutionId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/solution/result/${solutionId}`);
      return response.data.result;
    } catch (error) {
      console.error('Failed to get solution result:', error.message);
      return null;
    }
  };

  useEffect(() => {
    const updateSolutionsWithResults = async () => {
      const updatedSolutions = await Promise.all(
        solutions.map(async (solution) => {
          const result = await getSolutionResultByIdSolution(solution.id);
          return { ...solution, result };
        })
      );
      setSolutions(updatedSolutions);
    };
  
    updateSolutionsWithResults();
  }, [solutions]);

  return (
    <Layout header={1} footer={1}>
      <style>
        {
          `.solution-table-container {
            margin: 20px;
          }
          
          .table-wrapper {
            overflow-x: auto;
          }
          
          .solution-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          }
          
          .solution-table th,
          .solution-table td {
            padding: 8px;
            border: 1px solid #ddd;
          }
          
          .solution-table th {
            background-color: #f2f2f2;
            text-align: left;
          }
          
          /* Responsive styles */
          @media screen and (max-width: 600px) {
            .solution-table th,
            .solution-table td {
              font-size: 14px;
            }
          }
          .ba{
            background-color:green;
            color:black;
          }
          `
        }
      </style>
      <div className="solution-table-container">
        <h2>Solutions for Challenge {challengeId}</h2>
        <div className="table-wrapper">
          <table className="solution-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Output</th>
                <th>Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((solution) => (
                <tr key={solution.id}>
                  <td>{solution.id}</td>
                  <td>{solution.output}</td>
                  <td>{solution.result}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Solution;
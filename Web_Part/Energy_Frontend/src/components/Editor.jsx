import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';
import { gsapTitleAnimation } from '../lib/gsap-lib/gsapTitleAnimation';
function Editor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run', { code });
      setOutput(response.data.output);
      setError(response.data.error);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    gsapTitleAnimation();
  }, []);
  return (
    <>
    <Layout header={1} footer={1}>
  
   
    <div className="editor-container">
      <div className="code-editor-wrapper">
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your Python code here"
        />
      </div>
      <style>
        {
          `
          .editor-container {
            display: flex;
            flex-direction: column;
            width: 60%; 
            margin: 1rem; 
            margin-left:20%;
            margin-top:90px;
           
          }
          
          .code-editor-wrapper {
            margin-bottom: 1rem;
          }
          
          .code-editor {
            width: 100%;
            height: 200px; /* Adjust height as needed */
            font-family: monospace;
            font-size: 14px;
            border: 1px solid #ddd;
            padding: 0.5rem;
            resize: vertical; /* Allow resizing the textarea */
            border-style:solid;
            border-color: darkblue;
            border-width:2px;
          }
          
          .button-wrapper {
            text-align: center;
          }
          
          .run-button {
            padding: 0.5rem 1rem;
            background-color: #1845AD; /* Green color */
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            margin-top:20px;
            margin-bottom:50px;
            width:100px;
            margin-left:85%;
          }
          
          .run-button:hover {
            background-color: #3e8e41; /* Darker green on hover */
          }
          
          .output-wrapper,
          .error-wrapper {
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            padding: 0.5rem;
            border-style:solid;
            border-color: darkblue;
            border-width:2px;
          }
          
          .output,
          .error {
            width: 100%;
            height: 100px; /* Adjust height as needed */
            font-family: monospace;
            font-size: 14px;
            padding: 0;
           background-color: #94BDF2; /* Light gray background */
          }
          
          .error {
            background-color: #F29B9B; /* Light red background for error */
          }
          
          `
        }
      </style>
      <div className="button-wrapper">
        <button className="run-button" onClick={runCode}>
          Run
        </button>
      </div>
      <div className="output-wrapper">
        <h3>Output:</h3>
        <textarea
          className="output"
          value={output}
          readOnly
          placeholder="Output will be displayed here"
        />
      </div>
      <div className="error-wrapper">
        <h3>Error:</h3>
        <textarea
          className="error"
          value={error}
          readOnly
          placeholder="Error messages will be displayed here"
        />
      </div>
    </div>
    </Layout>
  </>
  );
}

export default Editor;

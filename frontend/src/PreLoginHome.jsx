import React from "react";
import "./PreLoginHome.css";
import Web3 from "web3";
import { useState } from "react";
import Navbar from "./Components/Navbar";

function PreLoginHome() {
  const contractAddress = "";
  const [address, setAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const connectToWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      //const Contract = new web3.eth.Contract(EMAILBLOCK, contractAddress);
      const accounts = await web3.eth.getAccounts();
      //setContract(Contract);
      window.location = "/user/";
    } else {
      alert("Please install MetaMask to use this application");
    }
  };
  return (
    <div className="PreLogin">
      <Navbar />
      <div className="PreLogin-Container">
        <div className="Home">
          <div className="Titles">
            <span id="Main-Title">Three</span>
            <span id="Main-Title-Color">Mail</span>
          </div>
          <div id="Main-Title-Sub">The future of Emails</div>
          <div id="Main-Sub">Allow no-one to read your messages!</div>
          <button id="Connect" onClick={connectToWeb3}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreLoginHome;

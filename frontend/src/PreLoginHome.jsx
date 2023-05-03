import React from "react";
import "./PreLoginHome.css";
import Web3 from "web3";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import { EMAILBLOCK } from "./abi/abi";
//import CryptoJS from "crypto-js";
//import crypto from "browserify-cipher";

function PreLoginHome() {
  const contractAddress = "0x5fe682F8484C6279C43572f909647B186770C772";
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  const connectToWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      // const EmailContract = new web3.eth.Contract(EMAILBLOCK, contractAddress);
      // setContract(EmailContract);
      const accounts = await web3.eth.getAccounts();
      setaddress(accounts[0]);
    /*
       var pubkey = await contract.methods
        .getpublickey(address)
        .call({ from: accounts[0] });
      console.log(pubkey);
      if (pubkey == "" || pubkey == " ") {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 2048,
        });
        const publicKeyBytes = publicKey.export({
          type: "spki",
          format: "der",
        });
        const privateKeyBytes = privateKey.export({
          type: "pkcs8",
          format: "der",
        });
        await contract.methods
          .setpublickey(publicKeyBytes)
          .send({ from: accounts[0] });
        await contract.methods
          .setprivatekey(privateKeyBytes)
          .send({ from: accounts[0] });
        alert("Keys Set");
        console.log(body);
      }*/

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

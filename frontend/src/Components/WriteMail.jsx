import { React } from "react";
import "./WriteMail.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { EMAILBLOCK } from "../abi/abi";

import CryptoJS from "crypto-js";
import forge from "node-forge";

const WriteMail = (props) => {
  const [reciever, setReciever] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [issecure, setIssecure] = useState(false);
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const contractAddress = "0xDD883BAB25a50D499b5dD0D14A31a65863027647";
  const [contract, setContract] = useState(null);
  const [recieverkey, setRecieverkey] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [bodyencrypt, setBodyencrypt] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const EmailContract = new web3.eth.Contract(
          EMAILBLOCK,
          contractAddress
        );
        setContract(EmailContract);
        setAccounts(await web3.eth.getAccounts());
        setaddress(accounts[0]);
        add();
      }
    };
    fetchdata();
    // console.log(address);
  }, []);

  const getrecieverkey = async () => {
    if (contract) {
      const resikey = await contract.methods
        .getpublickey(reciever)
        .call({ from: accounts[0] });
      if (!resikey) {
        console.log("Reciever has no keys");
        setIssecure(false);
        setRecieverkey(reciever);
        alert(
          "The receiver of this message, is not at threemail. Therefore this message is not secure"
        );
      } else {
        console.log("Reciever has keys");
        setIssecure(true);
        console.log(resikey);
        const publicKey = forge.pki.publicKeyFromPem(resikey);
        const encryptedMessage = publicKey.encrypt(body, "RSA-OAEP", {
          md: forge.md.sha256.create(),
        });
        // console.log(encryptedMessage);
        const enc = forge.util.encode64(encryptedMessage);

        setBodyencrypt(enc);

        //encrypt message using secure method(Asymmetric Cryptography)
        return enc;
      }
    }
    return true;
  };

  const setkeys = async () => {
    if (contract) {
      var pubkey = await contract.methods
        .getprivatekey()
        .call({ from: accounts[0] });
      if (pubkey) {
        console.log("Key exists");
      } else {
        const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        // Get the public and private keys in PEM format

        const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
        const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
        console.log(publicKeyPem);
        console.log(privateKeyPem);
        await contract.methods
          .setpublickey(publicKeyPem)
          .send({ from: accounts[0] });

        await contract.methods
          .setprivatekey(privateKeyPem)
          .send({ from: accounts[0] });

        alert("Keys set");
      }
    }
  };

  const add = async () => {
    if (contract) {
      const content = await getrecieverkey();
      console.log(content);
      const accounts = await web3.eth.getAccounts();
      if (content) {
        await contract.methods
          .sendEmail(reciever, content, true)
          .send({ from: accounts[0] });
        alert("Email sent!");
      }
    }
  };

  const check = async () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    // Get the public and private keys in PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

    console.log("Public Key PEM:");
    console.log(publicKeyPem);

    console.log("Private Key PEM:");
    console.log(privateKeyPem);
    console.log(typeof privateKeyPem);

    // Encrypt a message using the public key
    const message = "Hello, world!";
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedMessage = publicKey.encrypt(message, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });

    console.log("Encrypted Message:");
    console.log(forge.util.encode64(encryptedMessage));

    // Decrypt the message using the private key
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decryptedMessage = privateKey.decrypt(encryptedMessage, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });

    console.log("Decrypted Message:");
    console.log(decryptedMessage);
  };


  return (
    <div className="WriteMail">
      <input
        type="text"
        value={reciever}
        name="reciever"
        placeholder="To"
        onChange={(e) => setReciever(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        id="content"
        value={body}
        name="body"
        placeholder="Compose email..."
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="WriteMail-buttons">
        <button onClick={setkeys}>encrypt</button>
        <button onClick={add}>Send</button>
        <button onClick={check}>check</button>
        <button onClick={props.handleCloseClick}>Close</button>
      </div>
    </div>
  );
};

export default WriteMail;

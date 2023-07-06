import React from "react";
import "./MailsView.css";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { EMAILBLOCK } from "../abi/abi";
import CryptoJS from "crypto-js";
import forge from "node-forge";

function MailsView() {
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const contractAddress = "0xDD883BAB25a50D499b5dD0D14A31a65863027647";
  const [contract, setContract] = useState(null);
  const [storedmails, setStoredMails] = useState([]);
  const [body, setBody] = useState("");
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  var accounts;
  useEffect(() => {
    const fetchdata = async () => {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const EmailContract = new web3.eth.Contract(EMAILBLOCK, contractAddress);
      setContract(EmailContract);
      const accounts = await web3.eth.getAccounts();
      setaddress(accounts[0]);
    };
    fetchdata();
    // console.log(address);
    // console.log(accounts);
  }, []);

  const getall = async () => {
    const accounts = await web3.eth.getAccounts();
    var storedmail = [];
    storedmail = await contract.methods.getEmails().call({ from: accounts[0] });
    setStoredMails(storedmail);
  };

  const changebody = async (_body, _issecure, _reciever) => {
    if (contract) {
      const accounts = await web3.eth.getAccounts();
      if (_issecure) {
        try {
          const privatekey = await contract.methods
            .getprivatekey()
            .call({ from: accounts[0] });
          const privateKey = forge.pki.privateKeyFromPem(privatekey);
          const encryptedMessage = forge.util.decode64(_body);
          const decryptedMessage = privateKey.decrypt(
            encryptedMessage,
            "RSA-OAEP",
            {
              md: forge.md.sha256.create(),
            }
          );
          var msg = decryptedMessage;
          console.log(msg);
          return msg;
        } catch (error) {
          console.log(error);
          console.log("error detected");
        }
      } else {
        console.log("not true");
      }
    }
  };

  const changetimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const decryptMessages = async () => {
      const decryptedMessages = await Promise.all(
        storedmails.map((mail) =>
          changebody(mail.content, mail.isSecure, mail.sender)
        )
      );
      setDecryptedMessages(decryptedMessages);
    };
    decryptMessages();
  }, [storedmails]);

  return (
    <div className="MailsView">
      <div className="MailsView-Container">
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={getall}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            color="white"
            fill="currentColor"
            class="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
        <div className="MailsView-MailsContainer">
          <a href="#">
            <div className="MailsView-Mail">
              <div className="MailSender">Team ThreeMail</div>
              <div className="MailTitle">0-0-0</div>
              <div className="MailContent">
                Hi, this is Team ThreeMail, Thanks for trusting us with your
                privacy and safety online. Threemail is a decentralized mailing
                platform that allows users to send and receive emails securely.
              </div>
            </div>
          </a>
          {storedmails.map((mails, index) => (
            <a href={`/user/mail/${index}`} key={index}>
              <div className="MailsView-Mail">
                <div className="MailSender">{mails.sender}</div>
                <div className="MailTitle">
                  {changetimestamp(mails.timestamp)}
                </div>
                <div className="MailContent">{decryptedMessages[index]}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MailsView;

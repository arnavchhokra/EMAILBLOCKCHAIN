import React from "react";
import "./MailsView.css";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { EMAILBLOCK } from "../abi/abi";

function MailsView() {
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const contractAddress = "0x937f1002ce56A94D753C44eA85D27413168d474b";
  const [contract, setContract] = useState(null);
  const [storedmails, setStoredMails] = useState([]);
  const [body, setBody] = useState("");
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
      //getall();
      /*  EmailContract.events.NewEmailSent(
        {
          fromBlock: 0,
          toBlock: "latest",
        },
        function (error, event) {
          if (!error) {
            console.log(event.returnValues.recipient);
            console.log(event.returnValues.sender);
            console.log(event.returnValues.subject);
            console.log(event.returnValues.body);

              const newEmail = {
                sender: event.returnValues.sender,
                timestamp: event.returnValues.timestamp,
                content: event.returnValues.body,
              };
            

            // update the storedmails state with the new email object
            setStoredMails((prevMails) => [...prevMails, newEmail]);
          }
        }
      );*/
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
    console.log(storedmail);
  };
  const changetimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="MailsView">
      <div className="MailsView-Container">
        <button onClick={getall}>Getter</button>
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
                <div className="MailContent">{mails.content}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MailsView;

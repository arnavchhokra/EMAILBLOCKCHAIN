import { React } from "react";
import "./WriteMail.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { EMAILBLOCK } from "../abi/abi";
const WriteMail = (props) => {
  const [reciever, setReciever] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const contractAddress = "0x937f1002ce56A94D753C44eA85D27413168d474b";
  const [contract, setContract] = useState(null);

  var accounts;
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
        const accounts = await web3.eth.getAccounts();
        setaddress(address);
        add();
      }
    };
    fetchdata();
    // console.log(address);
  }, []);
  useEffect(() => {});
  const validate = async () => {};

  const add = async () => {
    if (contract) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .sendEmail(reciever, body)
        .send({ from: accounts[0] });
      console.log(body);
      alert("Email sent!");
    }
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
        <button onClick={add}>Send</button>
        <button onClick={props.handleCloseClick}>Close</button>
      </div>
    </div>
  );
};

export default WriteMail;

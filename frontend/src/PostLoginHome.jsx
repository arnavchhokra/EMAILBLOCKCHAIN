import React from "react";
import "./PostLoginHome.css";
import Web3 from "web3";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import MailsView from "./Components/MailsView";
import LeftBar from "./Components/LeftBar";
import "./PostLoginHome.css";

function PostLoginHome() {
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);

  var accounts;
  useEffect(() => {
    const fetchdata = async () => {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setaddress(accounts[0]);
    };
    fetchdata();
    //console.log(address);
  }, []);

  return (
    <div className="PostLoginHome">
      <Navbar />
      <div className="PostLoginhome-Container">
        <LeftBar />
        <MailsView />
      </div>
    </div>
  );
}

export default PostLoginHome;

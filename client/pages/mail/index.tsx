import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { Avatar, AvatarFallback, } from "@/components/ui/avatar"

import Mailcard from './mailcard';





import Web3 from "web3";
import { useState, useEffect } from "react";
import { EMAILBLOCK } from "../abi/abi";
import forge from "node-forge";


const index = ()=> {
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
          "The receiver of this message, is not registered at threemail. Therefore this message is not secure"
        );
        return body;
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

  return (
    <div style={{marginTop:'80px', borderTop:'1px solid grey', marginLeft:'7%', marginRight:'7%', borderLeft:'1px solid grey', borderRight:'1px solid grey', borderBottom:'1px solid grey'}}>
      <ResizablePanelGroup direction='horizontal' className="het">
      <ResizablePanel className='em' maxSize={60} minSize={30} style={{ height:'90vh', }}>
        <div style={{fontSize:'20px', fontWeight:'700', margin:'10px'}}>Inbox</div>
        <div>
          <Mailcard/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle  />
      <ResizablePanel  style={{borderLeft:'1px solid grey'}} defaultSize={30}>
        <div style={{display:'flex', paddingLeft:'20px', alignItems:'center', paddingTop:'10px', gap:'20px', borderBottom:'1px solid grey', paddingBottom:'10px'}}>
        <Avatar >
        <AvatarFallback style={{borderRadius:'50px', padding:'20px', background:'#8952E0'}}>TM</AvatarFallback>
        </Avatar>
        <div style={{display:'flex',justifyContent:'space-between', alignitems:'center',width:'100%', marginRight:'20px',}}>
          <span style={{fontWeight:'600', fontSize:'20px', paddingRight:'30%'}}>{accounts[0]}</span>
        </div>
        </div>
        <div style={{padding:'20px', paddingBottom:'60px', borderBottom:'1px solid grey', fontSize:'16px', }}>
          <span style={{ width:'80%',}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, quaerat quis quae beatae aperiam dolorem magnam fugiat, animi deserunt quo sed tempore molestiae deleniti necessitatibus fugit expedita voluptate error ullam adipisci reprehenderit, modi velit. Veniam, sint non! Facilis rerum eveniet saepe. Fuga necessitatibus vitae natus maxime, id labore blanditiis odio eaque dolor. Veritatis esse praesentium explicabo alias sequi tenetur numquam, adipisci, natus, aspernatur qui eos doloremque? Officiis tempora magni neque cum. Modi doloremque quo, doloribus odit fugiat ipsa maiores fugit deserunt ducimus? Ullam illo provident ut delectus ratione voluptatem incidunt quae accusantium, excepturi deserunt dolorem praesentium saepe, magni architecto quia.</span>
        </div>
        <div className="inp" style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:'20px', borderBottom:'1px solid grey',}}>
          <input         type="text"

value={reciever}

name="reciever"

onChange={(e) => setReciever(e.target.value)}  placeholder="Reciever's Wallet address" style={{borderRadius:'5px', padding:'5px', marginBottom:'20px'}}></input>

          <input
          style={{marginBottom:'20px'}}
        type="text"
        placeholder="Subject"
        onChange={(e) => setSubject(e.target.value)}
      />
          <textarea         id="content"

value={body}

name="body"

onChange={(e) => setBody(e.target.value)}
placeholder="Write the mail" style={{borderRadius:'5px', padding:'5px', height:'30vh'}}>
          </textarea>
          <div>
            <button onClick={()=>{setkeys(); add(); }} style={{float:'right', marginTop:'10px',borderRadius:'5px', paddingLeft:'30px', paddingRight:'30px', paddingTop:'10px', paddingBottom:'10px', background:'#8952E0' }}>Send</button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default index
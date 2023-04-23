// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EMAILBLOCK{
    
    struct mail{
        address sender;
        address reciever;
        uint timestamp;
        string content;
    }
    
    mapping(address=>mail[])  public  inbox;
    //mail[] mails;

    function sendEmail(address _reciever, string memory _body) public
    {
       // require(publicKeys[_reciever].length > 0, "Recipient private key not set");
        mail memory newmail = mail({ sender: msg.sender,
        reciever : _reciever, timestamp: block.timestamp, content: _body});
        inbox[_reciever].push(newmail);
    }

    function getEmails() public view returns(mail[] memory)
    {
      //  require(privateKeys[msg.sender].length > 0, "Recipient private key not set");
        uint n = inbox[msg.sender].length;
        mail[] memory result = new mail[](n);
        uint256 index = 0;
        for (uint256 i = 0; i < n; i++) {
                result[index] = inbox[msg.sender][i];
                index++;
        }
        return result;    
    }

    function getEmail(uint num) public view returns(mail memory)
    {
     //   require(privateKeys[msg.sender].length > 0, "Recipient private key not set");
        mail memory result = inbox[msg.sender][num];
        return result;
    }
    
}


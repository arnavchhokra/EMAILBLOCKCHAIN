# Threemail Documentation

Threemail is a decentralized application (dApp) designed for secure communication between blockchain wallet holders. Leveraging Next.js with TypeScript on the frontend, and Solidity for smart contract development on the Ethereum network, Threemail ensures secure and decentralized communication using asymmetric encryption. Threemail integrates Redux for state management, Shadcn for cryptographic operations, Chakra UI for user interface components, Web3.js for interaction with Ethereum blockchain, and Truffle for smart contract deployment.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Architecture Overview](#architecture-overview)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Development](#development)
7. [Smart Contracts](#smart-contracts)
8. [Security Considerations](#security-considerations)

## Introduction
Threemail aims to provide a decentralized communication platform for blockchain wallet holders, ensuring privacy and security through asymmetric encryption. It enables users to exchange messages securely without relying on centralized servers.

## Features
- Secure and decentralized messaging
- Asymmetric encryption for message privacy
- Integration with Ethereum blockchain for decentralized storage
- User-friendly interface with Chakra UI
- State management using Redux

## Architecture Overview
Threemail is built using the following technologies:
- **Frontend**: Next.js with TypeScript, Redux for state management, Chakra UI for UI components
- **Backend**: Solidity smart contracts for Ethereum blockchain interactions, Web3.js for communication with Ethereum nodes
- **Security**: Shadcn for cryptographic operations, asymmetric encryption for message privacy
- **Deployment**: Truffle for deploying smart contracts on the Sepolia Ethereum network

## Setup Instructions
1. Clone the Threemail repository from GitHub.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Configure your Ethereum network settings in the `.env` file.
5. Compile and deploy smart contracts using Truffle.
6. Start the frontend development server with `npm run dev`.

## Usage
1. Sign in with your blockchain wallet.
2. Compose a new message by entering the recipient's address and your message content.
3. Send the message.
4. Receive messages from other users securely.
5. Decrypt messages using your private key.

## Development
To contribute to Threemail development, follow these steps:
1. Fork the Threemail repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test thoroughly.
5. Create a pull request to merge your changes into the main branch.

## Smart Contracts
Threemail smart contracts are written in Solidity. They handle message encryption, decryption, and storage on the Ethereum blockchain. Contracts are compiled and deployed using Truffle. Refer to the `contracts/` directory for contract code.

## Security Considerations
1. **Asymmetric Encryption**: Threemail uses asymmetric encryption for message privacy, ensuring that only the intended recipient can decrypt messages.
2. **Smart Contract Security**: Threemail smart contracts undergo rigorous testing to ensure they are secure and resistant to attacks.
3. **Secure Communication**: Threemail communication with Ethereum nodes is encrypted and secure to prevent tampering or eavesdropping.

**Disclaimer**: Threemail is a decentralized application and does not store any user data centrally. Users are responsible for securely managing their private keys and maintaining the confidentiality of their messages. Threemail developers are not liable for any loss of data or security breaches resulting from user negligence or misuse of the application.

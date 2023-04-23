var MyContract = artifacts.require("EMAILBLOCK");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
require('dotenv').config(); // Load environment variables from .env file
const { RESTDataSource } = require("apollo-datasource-rest");

// Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
    this.apiKey = process.env.ETHER_API; // Access ETHER_API value from .env file
  }

  async etherBalanceByAddress(ethAddress) {
    const params = {
      module: "account",
      action: "balance",
      address: eth_address,
      tag: "latest",
      apikey: this.apiKey,
    };

    const response = await this.get("", params, {
      headers: {
        accept: "application/json",
      },
    });

    return response;
  }

  async totalSupplyOfEther() {
    const params = {
      module: "stats",
      action: "ethsupply",
      apikey: this.apiKey,
    };

    const response = await this.get("", params, {
      headers: {
        accept: "application/json",
      },
    });

    return response;
  }
}

module.exports = EtherDataSource;


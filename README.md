# Food Delivery App Using Blockchain and ReactJS

## Vision

The vision of this project is to revolutionize the food delivery industry by leveraging blockchain technology to create a transparent, secure, and efficient system. The aim is to ensure that all transactions are immutable, trustworthy, and decentralized, empowering both customers and restaurants with seamless and reliable services. By integrating blockchain, we aim to eliminate middlemen, reduce costs, and provide a more direct connection between food providers and consumers.

## Features

- **Blockchain-Powered Transactions**: Secure, decentralized transactions using blockchain to ensure transparency and integrity.
- **Real-Time Food Tracking**: Track orders in real-time from preparation to delivery, ensuring a seamless customer experience.
- **Smart Contracts**: Automated, self-executing contracts to manage payments, refunds, and promotions without third-party interference.
- **User-Friendly Interface**: A clean and responsive UI built with ReactJS, providing an intuitive experience for users.
- **Decentralized Review System**: Customer feedback and reviews stored on the blockchain to prevent manipulation and ensure honest ratings.
- **Tokenized Rewards System**: Loyalty and reward tokens for users and restaurants, encouraging engagement and repeat business.

## Tech Stack

- **Frontend**: ReactJS, CSS, HTML
- **Blockchain**: Ethereum (or any preferred blockchain), Smart Contracts (Solidity)
- **Backend**: Node.js, Express
- **Database**: IPFS (InterPlanetary File System) for decentralized storage, or a traditional database like MongoDB for non-blockchain data
- **APIs**: Integration with Web3.js or Ethers.js for blockchain interaction

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/food-delivery-blockchain.git
   ```
2. **Install Dependencies**:
   ```bash
   cd food-delivery-blockchain
   npm install
   ```
3. **Setup Blockchain Environment**:
   - Install [MetaMask](https://metamask.io/) for browser blockchain interactions.
   - Configure a local Ethereum blockchain using [Ganache](https://trufflesuite.com/ganache/) or connect to a testnet like Rinkeby.
   - Deploy Smart Contracts using [Truffle](https://trufflesuite.com/truffle/) or [Hardhat](https://hardhat.org/).
4. **Environment Variables**:
   - Create a `.env` file with the following details:
     ```
     REACT_APP_INFURA_API_KEY=your_infura_key
     REACT_APP_CONTRACT_ADDRESS=your_smart_contract_address
     ```
5. **Run the Application**:
   ```bash
   npm start
   ```
6. **Smart Contract Deployment** (Optional):
   ```bash
   npx hardhat compile
   npx hardhat deploy --network your_network
   ```

## Project Structure

├── .devcontainer/
│   ├── ...
│   └── ...
│       # Container development environment configuration

├── .git/
│   ├── ...
│   └── ...
│       # Git version control system files

├── .github/
│   ├── ...
│   └── ...
│       # GitHub-specific configuration and workflows

├── _agstate/
│   ├── ...
│   └── ...
│       # Temporary state files for various tools

├── api/
│   ├── ...
│   └── ...
│       # API-related code and resources

├── contract/
│   ├── ...
│   └── ...
│       # Smart contract code and related files

├── node_modules/
│   ├── ...
│   └── ...
│       # Node.js project dependencies

├── scripts/
│   ├── ...
│   └── ...
│       # Scripts for automation and other tasks

├── ui/
│   ├── ...
│   └── ...
│       # User interface code and assets

├── .gitignore
│       # Specifies intentionally untracked files and directories

├── yarnrc
│       # Yarn configuration file

├── CONTRIBUTING.md
│       # Guidelines for contributing to the project

├── docker-compose.yml
│       # Docker Compose configuration file for defining and running multi-container Docker applications

├── make_ports_public.sh
│       # Script to expose container ports to the host machine

├── package.json
│       # Node.js package manifest file

├── README.md
│       # General project documentation and instructions

├── README-local-chain.md
│       # Documentation specific to local blockchain setup

└── yarn.lock
│       # Locked dependency versions for Yarn


**React Components:**

* **Header.js:** Contains the top navigation bar with the YumKart logo, search bar, cart icon, and user profile.
* **InventoryList.js:** Displays the list of food items with their images, names, prices, and quantity counters.
* **FoodItem.js:** Represents a single food item in the list, including its image, name, price, and quantity counter.
* **Footer.js:** Contains the bottom navigation bar with links to different sections of the app, such as home, cart, and profile.
* **BlockchainIntegration.js:** Handles interactions with the blockchain, such as fetching product information, verifying authenticity, and tracking supply chain data.

**Blockchain Components:**

* **Smart Contracts:**
    * `ProductRegistry.sol`: Stores information about products, including their origin, certifications, and supply chain data.
    * `MarketPlace.sol`: Manages the buying and selling of products, including payments and order fulfillment.
    * `Token.sol`: (Optional) Implements a token system for reward points or loyalty programs.

**Additional Considerations:**

* **API Integration:** The app likely interacts with an API to fetch product data, user information, and order details.
* **State Management:** A state management library like Redux or Context API is likely used to manage the app's state, including the user's cart, current inventory, and blockchain data.
* **Styling:** The app's design and layout are implemented using CSS or a CSS-in-JS library like styled-components.
* **Testing:** Unit and integration tests are essential to ensure the app's functionality and reliability.

**Note:**

This analysis is based on the provided image and assumptions about the app's functionality. The actual implementation might vary depending on the specific requirements and design choices of the project.


## How It Works

1. **Order Creation**: Users select their desired food items and confirm the order.
2. **Smart Contract Interaction**: Order details are stored in the blockchain through smart contracts.
3. **Payment Processing**: Users can pay using cryptocurrencies. The payment triggers the smart contract.
4. **Order Tracking**: The status of the order is updated in real-time using blockchain.
5. **Delivery and Review**: Upon delivery, users can leave reviews stored immutably on the blockchain.

## Roadmap

- [x] Basic React setup with blockchain integration.
- [x] Implement Smart Contracts for food ordering and payments.
- [ ] Enhance UI with advanced animations and responsive design.
- [ ] Add decentralized storage using IPFS.
- [ ] Implement tokenized reward system.
- [ ] Expand to include a decentralized dispute resolution system.
- [ ] Optimize gas fees and explore Layer-2 solutions.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
Email:- kranupam101@gmail.com
        harshitamugdha@gmail.com

Linkedin:-  linkedin.com/in/kumaranupam1
            [harshitaMughdha](https://www.linkedin.com/in/harshita-mugdha-554a57320/)
            https://www.linkedin.com/in/avika-gupta-a0b5b3330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
            

## Acknowledgments

- The creators of ReactJS and blockchain platforms for enabling this innovative technology.
- Open-source libraries and tools that made this project possible.
- Community contributors for their valuable feedback and insights.

Feel free to reach out for any queries or suggestions! Happy coding! 😊

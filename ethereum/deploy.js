const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    // FIRST ARGUMENT: METAMASK MNEMONIC
    // SECOND ARGUMENT: INFURA RINKEBY API KEY
    'fabric acquire cover must pepper demand achieve rebel soap coral harvest wild',
    'https://rinkeby.infura.io/v3/4ae92064a2e04c468edf0f69fcc5b097',    
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
        .deploy({ data: compiledFactory.evm.bytecode.object })
        // most recent truffle hd wallet provider
        .send({ from: accounts[0], gas: '4500000' });
    console.log('Contract deployed to', result.options.address);
};

deploy();


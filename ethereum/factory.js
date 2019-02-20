import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(CampaignFactory.abi)),
    '0x0b7df807d8fe1466606453f685D6D058c8e09995'
);

export default instance;
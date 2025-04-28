const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default;
const tinysecp = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp);

const getBitcoinNetwork = () => {
  return process.env.BITCOIN_NETWORK === 'testnet'
    ? bitcoin.networks.testnet
    : bitcoin.networks.bitcoin;
};

const generateAddress = () => {
  const network = getBitcoinNetwork();
  const keyPair = ECPair.makeRandom({ network });

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(keyPair.publicKey), // <-- Fix here
    network,
  });

  return {
    address,
    publicKey: keyPair.publicKey.toString('hex'),
    privateKey: keyPair.toWIF(),
  };
};

module.exports = {
  generateAddress,
};

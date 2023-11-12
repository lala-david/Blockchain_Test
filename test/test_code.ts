import { expect } from "chai";
import { createBlockchain, addBlock } from "../src/Blockchain";
import { createProofOfWork, validate } from "../src/ProofOfWork";

describe('Blockchain Test', () => {
  it('should create new blockchain', () => {
    const blockchain = createBlockchain();
    expect(blockchain.blocks).to.have.lengthOf(1);  
  });

  it('should add new block to blockchain', () => {
    const blockchain = createBlockchain();
    addBlock(blockchain, "New Block");
    expect(blockchain.blocks).to.have.lengthOf(2);
  });

  it('should validate Proof of Work', () => {
    const blockchain = createBlockchain();
    addBlock(blockchain, "New Block");
    const block = blockchain.blocks[1];
    const pow = createProofOfWork(block);
    expect(validate(pow)).to.equal(true);
  });
});

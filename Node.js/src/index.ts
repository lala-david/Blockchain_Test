import { writeFileSync } from "fs";
import { performance } from "perf_hooks";
import { addBlock, createBlockchain } from "./Blockchain";
import { createProofOfWork, validate } from "./ProofOfWork";

let blockNumber = 1;

function generateBlockName() {
  let result = `Block${blockNumber}`;
  blockNumber += 1;

  return result;
}

function main() {
  const blockchain = createBlockchain();
  const numBlocks = 1000;
  const results = [];

  const miningStartTime = performance.now();

  for (let i = 0; i < numBlocks; i++) {
    const blockStartTime = performance.now();
    const startMem = process.memoryUsage().heapUsed;

    addBlock(blockchain, generateBlockName());

    const blockEndTime = performance.now();
    const endMem = process.memoryUsage().heapUsed;

    const block = blockchain.blocks[i];

    const result = {
      blockNumber: i + 1,
      prevBlockHash: block.prevBlockHash,
      data: block.data,
      hash: block.hash,
      nonce: block.nonce,
      timestamp: block.timestamp,
      memoryUsage: endMem - startMem,
      responseTime: blockEndTime - blockStartTime,
    };

    results.push(result);

    console.log(`Prev. hash: ${block.prevBlockHash}`);
    console.log(`Data: ${block.data}`);
    console.log(`Hash: ${block.hash}`);
    console.log(`nonce: ${block.nonce}`);
    console.log(`timestamp: ${block.timestamp}`);
    console.log(`Memory usage: ${result.memoryUsage}`);
    console.log(`Response time: ${result.responseTime}`);

    const pow = createProofOfWork(block);
    console.log(`PoW: ${validate(pow)}`);
  }

  const miningEndTime = performance.now();
  const totalMiningTimeSecs = (miningEndTime - miningStartTime) / 1000;

  results.push({
    totalBlocks: numBlocks,
    totalMiningTime: totalMiningTimeSecs,
  });

  writeFileSync("results.json", JSON.stringify(results, null, 2));

  console.log(`
채굴된 블록 수: ${numBlocks}
채굴시간 : ${totalMiningTimeSecs}
`);
}

main();

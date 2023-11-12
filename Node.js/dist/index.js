"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const perf_hooks_1 = require("perf_hooks");
const Blockchain_1 = require("./Blockchain");
const ProofOfWork_1 = require("./ProofOfWork");
let blockNumber = 1;
function generateBlockName() {
    let result = `Block${blockNumber}`;
    blockNumber += 1;
    return result;
}
function main() {
    const blockchain = (0, Blockchain_1.createBlockchain)();
    const numBlocks = 1000;
    const results = [];
    const miningStartTime = perf_hooks_1.performance.now();
    for (let i = 0; i < numBlocks; i++) {
        const blockStartTime = perf_hooks_1.performance.now();
        const startMem = process.memoryUsage().heapUsed;
        (0, Blockchain_1.addBlock)(blockchain, generateBlockName());
        const blockEndTime = perf_hooks_1.performance.now();
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
        const pow = (0, ProofOfWork_1.createProofOfWork)(block);
        console.log(`PoW: ${(0, ProofOfWork_1.validate)(pow)}`);
    }
    const miningEndTime = perf_hooks_1.performance.now();
    const totalMiningTimeSecs = (miningEndTime - miningStartTime) / 1000;
    results.push({
        totalBlocks: numBlocks,
        totalMiningTime: totalMiningTimeSecs,
    });
    (0, fs_1.writeFileSync)("results.json", JSON.stringify(results, null, 2));
    console.log(`
채굴된 블록 수: ${numBlocks}
채굴시간 : ${totalMiningTimeSecs}
`);
}
main();
//# sourceMappingURL=index.js.map
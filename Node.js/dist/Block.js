"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlock = void 0;
const crypto_1 = require("crypto");
const ProofOfWork_1 = require("./ProofOfWork");
function setHash(block) {
    const timeStamp = block.timestamp.toString();
    const headers = `${block.prevBlockHash}${block.data}${timeStamp}`;
    return (0, crypto_1.createHash)("sha256").update(headers).digest("hex");
}
function createBlock(data, prevBlockHash) {
    const block = {
        timestamp: Date.now(),
        data,
        prevBlockHash,
    };
    const pow = (0, ProofOfWork_1.createProofOfWork)(block);
    const { nonce, hash } = (0, ProofOfWork_1.run)(pow);
    block.hash = hash;
    block.nonce = nonce;
    return block;
}
exports.createBlock = createBlock;
//# sourceMappingURL=Block.js.map
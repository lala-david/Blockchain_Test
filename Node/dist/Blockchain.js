"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlockchain = exports.addBlock = void 0;
const Block_1 = require("./Block");
function addBlock(blockchain, data) {
    const prevBlock = blockchain.blocks[blockchain.blocks.length - 1];
    const newBlock = (0, Block_1.createBlock)(data, prevBlock.hash);
    blockchain.blocks.push(newBlock);
}
exports.addBlock = addBlock;
function createGenesisBlock() {
    return (0, Block_1.createBlock)("Genesis Block", "");
}
function createBlockchain() {
    return {
        blocks: [createGenesisBlock()],
    };
}
exports.createBlockchain = createBlockchain;
//# sourceMappingURL=Blockchain.js.map
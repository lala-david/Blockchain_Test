"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.run = exports.createProofOfWork = void 0;
const crypto_1 = require("crypto");
const targetBits = BigInt(4n);
function createProofOfWork(block) {
    const target = BigInt(1n << (256n - targetBits));
    const pow = { block, target };
    return pow;
}
exports.createProofOfWork = createProofOfWork;
function prepareData(pow, nonce) {
    const data = `${pow.block.prevBlockHash}${pow.block.data}${pow.block.timestamp.toString(16)}${targetBits.toString(16)}${nonce.toString(16)}`;
    return data;
}
function run(pow) {
    let hashInt, hash, nonce = 0;
    console.log(`Mining the block containing "${pow.block.data}"`);
    while (nonce < Number.MAX_SAFE_INTEGER) {
        const data = prepareData(pow, nonce);
        hash = (0, crypto_1.createHash)("sha256").update(data).digest("hex");
        hashInt = BigInt(`0x${hash}`);
        if (hashInt < pow.target) {
            console.log(`\r${hash}`);
            break;
        }
        else {
            nonce++;
        }
    }
    console.log("\n");
    return { nonce, hash };
}
exports.run = run;
function validate(pow) {
    let hashInt;
    const data = prepareData(pow, pow.block.nonce);
    const hash = (0, crypto_1.createHash)("sha256").update(data).digest("hex");
    hashInt = BigInt(`0x${hash}`);
    const isVaild = hashInt < pow.target;
    return isVaild;
}
exports.validate = validate;
//# sourceMappingURL=ProofOfWork.js.map
// 실행: node test.js
const assert = require("assert");
const { calcQuote } = require("./calc.js");

// 예시 B: MG01 건조 망고 1kg (단가 9,500원, 박스당 10개), 125개, 마진 12%, 환율 1,380
const r = calcQuote({ price: 9500, perBox: 10 }, 125, 12, 1380);
assert.strictEqual(r.boxes, 13);
assert.strictEqual(r.fob, 1213500);
assert.strictEqual(r.krw, 1359120);
assert.strictEqual(r.usd, 984.87);

console.log("예시 B 통과:", r);

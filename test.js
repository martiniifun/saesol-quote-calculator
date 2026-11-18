// 실행: node test.js
const assert = require("assert");
const { calcQuote } = require("./calc.js");

// 예시 B: MG01 건조 망고 1kg (단가 9,500원, 박스당 10개), 125개, 마진 12%, 환율 1,380 (FOB)
const r = calcQuote({ price: 9500, perBox: 10 }, 125, 12, 1380);
assert.strictEqual(r.boxes, 13);
assert.strictEqual(r.fob, 1213500);
assert.strictEqual(r.krw, 1359120);
assert.strictEqual(r.usd, 984.87);
console.log("예시 B 통과:", r);

// 예시 B에 FOB를 명시해도 같은 결과
const rf = calcQuote({ price: 9500, perBox: 10 }, 125, 12, 1380, { term: "FOB", region: "일본" });
assert.strictEqual(rf.krw, 1359120);
assert.strictEqual(rf.cif, null);

// 예시 A: YJ01 유자차 1kg 병 (단가 6,800원, 박스당 12개), 300병, 일본, CIF, 마진 15%, 환율 1,380
const a = calcQuote({ price: 6800, perBox: 12 }, 300, 15, 1380, { term: "CIF", region: "일본" });
assert.strictEqual(a.boxes, 25);
assert.strictEqual(a.fob, 2090000);
assert.strictEqual(a.freight, 45000);
assert.strictEqual(a.insurance, 4180);
assert.strictEqual(a.cif, 2139180);
assert.strictEqual(a.krw, 2460057);
assert.strictEqual(a.usd, 1782.65);
console.log("예시 A 통과:", a);

// 동남아 CIF: 운임 박스당 2,500원 (MG01 125개 → 13박스, 12%)
const s = calcQuote({ price: 9500, perBox: 10 }, 125, 12, 1380, { term: "CIF", region: "동남아" });
assert.strictEqual(s.freight, 32500);
assert.strictEqual(s.insurance, 2427); // 1,213,500 × 0.002 = 2,427
assert.strictEqual(s.cif, 1213500 + 32500 + 2427);
assert.strictEqual(s.krw, Math.round(s.cif * 1.12));
console.log("동남아 CIF 통과:", s);

// 알 수 없는 지역은 오류
assert.throws(() => calcQuote({ price: 1, perBox: 1 }, 1, 0, 1, { term: "CIF", region: "미주" }));
console.log("모든 테스트 통과");

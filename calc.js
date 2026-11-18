// 견적 계산 (화면과 무관한 순수 계산). 브라우저(<script>)와 node(require) 양쪽에서 쓴다.
(function (root) {
  const PACK = 1200, INLAND = 800;
  const FREIGHT = { "일본": 1800, "동남아": 2500 }; // 박스당 해상운임(원)
  const INSURANCE_RATE = 0.002; // 보험료율: FOB 원가의 0.2%

  // item: { price, perBox }, qty: 개수, marginPct: 마진율(%), rate: 환율(원/USD)
  // opts: { term: "FOB" | "CIF", region: "일본" | "동남아" } — 생략하면 FOB
  function calcQuote(item, qty, marginPct, rate, opts) {
    const term = (opts && opts.term) || "FOB";
    const goods = item.price * qty;
    const boxes = Math.ceil(qty / item.perBox);
    const fob = goods + boxes * PACK + boxes * INLAND;

    let freight = 0, insurance = 0, cif = null, base = fob;
    if (term === "CIF") {
      const perBox = FREIGHT[opts.region];
      if (perBox === undefined) throw new Error("알 수 없는 도착 지역: " + opts.region);
      freight = boxes * perBox;
      insurance = Math.round(fob * INSURANCE_RATE);
      cif = fob + freight + insurance;
      base = cif;
    } else if (term !== "FOB") {
      throw new Error("알 수 없는 조건: " + term);
    }

    const krw = Math.round(base * (1 + marginPct / 100));
    const usd = Math.round(krw / rate * 100) / 100;
    return { boxes, fob, freight, insurance, cif, base, krw, usd };
  }

  const api = { PACK, INLAND, FREIGHT, INSURANCE_RATE, calcQuote };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Calc = api;
})(typeof window !== "undefined" ? window : globalThis);

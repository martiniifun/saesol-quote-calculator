// 견적 계산 (화면과 무관한 순수 계산). 브라우저(<script>)와 node(require) 양쪽에서 쓴다.
(function (root) {
  const PACK = 1200, INLAND = 800;

  // item: { price, perBox }, qty: 개수, marginPct: 마진율(%), rate: 환율(원/USD)
  function calcQuote(item, qty, marginPct, rate) {
    const goods = item.price * qty;
    const boxes = Math.ceil(qty / item.perBox);
    const fob = goods + boxes * PACK + boxes * INLAND;
    const krw = Math.round(fob * (1 + marginPct / 100));
    const usd = Math.round(krw / rate * 100) / 100;
    return { boxes, fob, krw, usd };
  }

  const api = { PACK, INLAND, calcQuote };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Calc = api;
})(typeof window !== "undefined" ? window : globalThis);

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개요

새솔물산(가상 회사) 해외영업팀용 수출 견적 계산기. 빌드·서버·패키지 없이 `index.html`을 브라우저에서 바로 열어 쓴다 (`file://`에서 동작해야 함). 문서와 UI는 한국어.

## 명령

- 테스트: `node test.js` (프레임워크 없음, `assert`만 사용. 개별 실행 개념 없이 파일 하나가 전부)
- 실행: `index.html`을 브라우저로 열기. 린트/빌드 없음.

## 구조

- `calc.js` — 화면과 무관한 순수 계산 `calcQuote(item, qty, marginPct, rate, opts)`. UMD 방식이라 브라우저에서는 `window.Calc`, node에서는 `require`로 쓴다. 요금 상수(포장비, 내륙운송비, 지역별 해상운임, 보험료율)도 여기에 있다.
- `index.html` — UI와 인쇄용 견적서(`#sheet`, A4, `@media print`에서만 보임). `calc.js`를 `<script src>`로 불러온다.
- `test.js` — `요구사항.md`의 예시 A(CIF), 예시 B(FOB)를 검증한다.
- `요구사항.md` — 계산 규칙의 기준 문서. 계산을 바꾸면 여기와 `test.js`를 함께 갱신한다. `해외영업팀_추가요청.txt`는 CIF 요청 원문.

## 주의

- **단가표가 두 곳에 있다**: `단가표.csv`와 `index.html` 안의 `CSV` 템플릿 문자열(`file://`에서는 CSV를 fetch할 수 없어 내장). 품목을 바꾸면 둘 다 수정해야 한다.
- 반올림은 전부 `Math.round` (0.5는 올림). USD는 소수 둘째 자리까지.
- 환율은 실제 환율이 아닌 사용자 입력값이며 화면에 그렇게 표시한다.
- 조건은 FOB(기본)/CIF, 지역은 CIF일 때만 사용. 알 수 없는 조건·지역은 예외를 던진다.
- 인쇄용 견적서는 현재 USD 총액만 보여 준다(원가 내역 미표시).

## 규칙
- 금액 표기: 원화는 천 단위 쉼표, 달러는 소수 둘째 자리까지.
- 계산을 바꾸면 반드시 `node test.js`를 실행해 확인한다.
- 주석은 한국어로 쓴다.

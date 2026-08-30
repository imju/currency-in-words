"use strict";

const sharp = require("sharp");
const path = require("path");

const output = path.join(__dirname, "..", "store-upload-assets");

const optionOne = `
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560" viewBox="0 0 1400 560">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1400" y2="560">
      <stop stop-color="#253797"/><stop offset="1" stop-color="#526aff"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#132170" flood-opacity=".4"/></filter>
  </defs>
  <rect width="1400" height="560" fill="url(#bg)"/>
  <circle cx="1320" cy="40" r="270" fill="#fff" opacity=".07"/>
  <circle cx="80" cy="590" r="270" fill="#fff" opacity=".06"/>
  <g font-family="Arial,sans-serif" fill="#fff">
    <text x="95" y="117" font-size="20" font-weight="800" letter-spacing="3">CURRENCY IN WORDS</text>
    <text x="95" y="190" font-size="52" font-weight="800">Numbers become words.</text>
    <text x="95" y="247" font-size="52" font-weight="800">In the right language.</text>
    <text x="95" y="304" font-size="23" opacity=".82">Fast, local and automatically matched to your currency.</text>
  </g>
  <g filter="url(#shadow)">
    <rect x="95" y="364" width="1210" height="126" rx="22" fill="#fff"/>
    <image href="../icons/icon-128.png" x="124" y="381" width="92" height="92"/>
    <g font-family="Arial,sans-serif">
      <text x="252" y="410" font-size="13" font-weight="800" fill="#405cf5" letter-spacing="2">KRW · SOUTH KOREAN WON</text>
      <text x="252" y="455" font-size="28" font-weight="800" fill="#18233a">12,345,678</text>
      <path d="M485 427h74m-18-16 18 16-18 16" fill="none" stroke="#405cf5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="605" y="446" font-size="26" font-weight="700" fill="#18233a">천이백,삼십사만오천,육백칠십팔 원</text>
    </g>
  </g>
  <g font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#fff" opacity=".86">
    <text x="1050" y="112">USD · English</text><text x="1050" y="145">EUR · French</text>
    <text x="1050" y="178">JPY · Japanese</text><text x="1050" y="211">KRW · Korean</text>
    <text x="1050" y="244">+ more currencies</text>
  </g>
</svg>`;

const optionTwo = `
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="560" viewBox="0 0 1400 560">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1400" y2="560"><stop stop-color="#eef1ff"/><stop offset="1" stop-color="#dfe6ff"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#18233a" flood-opacity=".2"/></filter>
  </defs>
  <rect width="1400" height="560" fill="url(#bg)"/>
  <circle cx="120" cy="60" r="210" fill="#405cf5" opacity=".08"/>
  <g font-family="Arial,sans-serif" fill="#18233a">
    <text x="82" y="197" font-size="20" font-weight="800" fill="#405cf5" letter-spacing="3">HIGHLIGHT · RIGHT-CLICK · CONVERT</text>
    <text x="82" y="268" font-size="50" font-weight="800">Currency words</text>
    <text x="82" y="325" font-size="50" font-weight="800">without leaving the page.</text>
    <text x="82" y="381" font-size="22" fill="#69748a">Copy localized results while you keep reading.</text>
  </g>
  <g filter="url(#shadow)">
    <rect x="775" y="54" width="535" height="452" rx="24" fill="#fff"/>
    <rect x="805" y="85" width="475" height="72" rx="12" fill="#f4f6fa"/>
    <text x="830" y="114" font-family="Georgia,serif" font-size="16" fill="#69748a">Approved project budget:</text>
    <rect x="830" y="124" width="185" height="24" rx="4" fill="#cfd6ff"/>
    <text x="840" y="142" font-family="Georgia,serif" font-size="17" font-weight="700" fill="#18233a">12,345,678 KRW</text>
    <rect x="850" y="181" width="400" height="292" rx="18" fill="#fff" stroke="#dce3ee"/>
    <image href="../icons/icon-48.png" x="875" y="206" width="42" height="42"/>
    <text x="935" y="233" font-family="Arial,sans-serif" font-size="18" font-weight="800" fill="#18233a">Currency in Words</text>
    <text x="1220" y="233" text-anchor="end" font-family="Arial,sans-serif" font-size="24" fill="#69748a">×</text>
    <rect x="875" y="268" width="350" height="46" rx="10" fill="#fff" stroke="#dce3ee"/>
    <text x="893" y="297" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#18233a">KRW — South Korean Won</text>
    <text x="875" y="348" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="#405cf5" letter-spacing="1.5">IN WORDS · KOREAN</text>
    <text x="875" y="385" font-family="Arial,sans-serif" font-size="17" fill="#18233a">천이백,삼십사만오천,육백칠십팔 원</text>
    <rect x="875" y="414" width="165" height="36" rx="8" fill="#405cf5"/>
    <text x="958" y="437" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#fff">Copy result</text>
    <rect x="1056" y="414" width="169" height="36" rx="8" fill="#f3f5ff" stroke="#ccd3ff"/>
    <text x="1140" y="437" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#405cf5">Open full page</text>
  </g>
</svg>`;

async function render(svg, filename) {
  await sharp(Buffer.from(svg))
    .flatten({ background: "#ffffff" })
    .removeAlpha()
    .png({ palette: false, compressionLevel: 9 })
    .toFile(path.join(output, filename));
}

Promise.all([
  render(optionOne, "marquee-promo-option-1-1400x560.png"),
  render(optionTwo, "marquee-promo-option-2-1400x560.png")
]).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

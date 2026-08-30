(function (root) {
  "use strict";
  const CURRENCIES = {
    USD:["US Dollar","$","US dollar","US dollars","cent","cents",2],
    EUR:["Euro","€","euro","euros","cent","cents",2],
    GBP:["British Pound","£","British pound","British pounds","penny","pence",2],
    CAD:["Canadian Dollar","C$","Canadian dollar","Canadian dollars","cent","cents",2],
    AUD:["Australian Dollar","A$","Australian dollar","Australian dollars","cent","cents",2],
    JPY:["Japanese Yen","¥","Japanese yen","Japanese yen",null,null,0],
    CNY:["Chinese Yuan","¥","Chinese yuan","Chinese yuan","fen","fen",2],
    INR:["Indian Rupee","₹","Indian rupee","Indian rupees","paisa","paise",2],
    CHF:["Swiss Franc","CHF","Swiss franc","Swiss francs","rappen","rappen",2],
    SGD:["Singapore Dollar","S$","Singapore dollar","Singapore dollars","cent","cents",2],
    KRW:["South Korean Won","₩","South Korean won","South Korean won",null,null,0],
    AED:["UAE Dirham","د.إ","UAE dirham","UAE dirhams","fils","fils",2],
    BHD:["Bahraini Dinar","BD","Bahraini dinar","Bahraini dinars","fils","fils",3]
  };
  Object.entries(CURRENCIES).forEach(([code,v]) => CURRENCIES[code] = {code,name:v[0],symbol:v[1],major:[v[2],v[3]],minor:v[4]?[v[4],v[5]]:null,precision:v[6]});
  const ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const SCALES=["","thousand","million","billion","trillion","quadrillion"];
  const MAX=999999999999999999n;
  function under1000(n){const p=[];if(n>=100){p.push(`${ONES[Math.floor(n/100)]} hundred`);n%=100;}if(n>=20){const o=n%10;p.push(o?`${TENS[Math.floor(n/10)]}-${ONES[o]}`:TENS[Math.floor(n/10)]);}else if(n)p.push(ONES[n]);return p.join(" ");}
  function integerToWords(value){let n=BigInt(value);if(n<0n||n>MAX)throw new RangeError("Enter a value up to 999 quadrillion.");if(!n)return "zero";const p=[];let s=0;while(n){const g=Number(n%1000n);if(g)p.unshift(`${under1000(g)}${SCALES[s]?` ${SCALES[s]}`:""}`);n/=1000n;s++;}return p.join(", ");}
  function parseAmount(input,precision){const raw=String(input).trim();if(!raw)return null;const compact=raw.replace(/[\s,]/g,"");if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(compact))throw new TypeError("Enter a valid number, such as 1,234.56.");const neg=compact.startsWith("-");const [w="0",f=""] = compact.replace(/^[+-]/,"").split(".");let major=BigInt(w||"0");if(major>MAX)throw new RangeError("Enter a value up to 999 quadrillion.");const factor=10n**BigInt(precision);let minor=precision?BigInt(f.slice(0,precision).padEnd(precision,"0")||"0"):0n;if(Number(f.charAt(precision)||"0")>=5){minor++;if(minor===factor){major++;minor=0n;}}if(major>MAX)throw new RangeError("The rounded value is above 999 quadrillion.");return{negative:neg&&(major!==0n||minor!==0n),major,minor};}
  function formatNumericInput(input){const raw=String(input),c=raw.replace(/[\s,]/g,"");if(!/^[+-]?(?:\d*(?:\.\d*)?)$/.test(c))return raw;const sign=c.match(/^[+-]/)?.[0]||"",u=sign?c.slice(1):c,i=u.indexOf("."),w=i<0?u:u.slice(0,i),f=i<0?"":u.slice(i+1);return sign+w.replace(/\B(?=(\d{3})+(?!\d))/g,",")+(i<0?"":`.`+f);}
  function convertCurrency(input,code){const c=CURRENCIES[code];if(!c)throw new TypeError("Choose a supported currency.");const a=parseAmount(input,c.precision);if(!a)return"";const major=`${integerToWords(a.major)} ${a.major===1n?c.major[0]:c.major[1]}`;const minor=c.precision&&a.minor?`${integerToWords(a.minor)} ${a.minor===1n?c.minor[0]:c.minor[1]}`:"";const out=`${a.negative?"minus ":""}${major}${minor?` and ${minor}`:""}`;return out[0].toUpperCase()+out.slice(1);}
  root.CurrencyWords={CURRENCIES,convertCurrency,formatNumericInput,integerToWords,parseAmount};
  if(typeof module!=="undefined")module.exports=root.CurrencyWords;
})(typeof globalThis!=="undefined"?globalThis:this);

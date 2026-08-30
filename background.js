"use strict";
const MENU="currency-words-convert-selection";
const CODES=/\b(USD|EUR|GBP|CAD|AUD|JPY|CNY|INR|CHF|SGD|KRW|AED|BHD)\b/;
const get=area=>new Promise(r=>area.get(["defaultCurrency","defaultCurrencyUpdatedAt"],r));
async function defaultCurrency(){const v=await Promise.all([get(chrome.storage.sync),get(chrome.storage.local)]);return v.filter(x=>x.defaultCurrency).sort((a,b)=>(b.defaultCurrencyUpdatedAt||0)-(a.defaultCurrencyUpdatedAt||0))[0]?.defaultCurrency||"USD";}
function extract(text){return text.replace(/[−–—]/g,"-").match(/[+-]?(?:\d[\d,\s]*(?:\.\d*)?|\.\d+)/)?.[0]?.trim()||"";}
function send(tabId,frameId,message){return new Promise((res,rej)=>chrome.tabs.sendMessage(tabId,message,{frameId},r=>chrome.runtime.lastError?rej(chrome.runtime.lastError):res(r)));}
function openPage(amount,currency){chrome.tabs.create({url:chrome.runtime.getURL(`result.html?${new URLSearchParams({amount,currency})}`)});}
chrome.runtime.onInstalled.addListener(()=>chrome.contextMenus.removeAll(()=>chrome.contextMenus.create({id:MENU,title:"Convert “%s” to currency words",contexts:["selection"]})));
chrome.contextMenus.onClicked.addListener(async(info,tab)=>{if(info.menuItemId!==MENU||!tab?.id)return;const amount=extract(info.selectionText||"");if(!amount)return;const currency=(info.selectionText||"").toUpperCase().match(CODES)?.[1]||await defaultCurrency(),frameId=Number.isInteger(info.frameId)?info.frameId:0,message={type:"showCurrencyWords",amount,currency};try{await send(tab.id,frameId,message);return;}catch{}try{await chrome.scripting.executeScript({target:{tabId:tab.id,frameIds:[frameId]},files:["number-words.js","localized-words.js","content.js"]});await send(tab.id,frameId,message);}catch{/* Never navigate automatically. */}});
chrome.runtime.onMessage.addListener(m=>{if(m?.type==="openCurrencyWordsPage")openPage(m.amount||"",m.currency||"USD");});

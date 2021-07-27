// import BlockingResponse = chrome.webRequest.BlockingResponse;
// import RequestFilter = chrome.webRequest.RequestFilter;
// import ResourceType = chrome.webRequest.ResourceType;
// import WebRequestDetails = chrome.webRequest.WebRequestDetails;

import { Message } from "./types";

let instance : string;
let setup : boolean;
renew();


function renew(): void{  
  chrome.storage.sync.get(['urtweet_url'], function(result) {
    instance = result.urtweet_url.url;
    setup = result.urtweet_url.set;
  });
}


const urls = ["*://twitter.com/*", "*://mobile.twitter.com/*"]
const types : chrome.webRequest.ResourceType[] = ["main_frame"]
const filter : chrome.webRequest.RequestFilter = {urls: urls, types: types}
chrome.webRequest.onBeforeRequest.addListener(details =>{
   const source = new URL(details.url);
   if (setup && source.pathname !== "/"){
     return {redirectUrl: instance}
   } else{
       return
   }
}, filter, ["blocking"]);

chrome.webRequest.onBeforeRedirect.addListener(details =>{
    const url = new URL(details.url);
    const pathname = url.pathname;
    fetch(`${instance}/api/tw${pathname}`);
}, {urls: ["<all_urls>"]});



chrome.runtime.onMessage.addListener((message: Message) => {
    switch (message.type){
        case "SAVE_URL":
            instance = message.url;
            setup = true;
            break;
        case "CLEAR_URL":
            setup = false;
            instance = "";
            break;
    }
});


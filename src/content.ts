// This file is injected as a content script
console.log("Urtweet translator loaded")
console.log("you are at")
console.log(window.location)
// declare const window: any;



async function redirectTwitter(url : URL, urtweetURL : URL) : Promise<any> {
    const endpoint = `${urtweetURL.origin}/api/tw${url.pathname}`
    const res = await fetch(endpoint);
    // window.location = urtweetURL;
    return "oh hai"
  }
  

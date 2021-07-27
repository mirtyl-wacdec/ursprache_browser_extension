import * as React from "react";
import { useState } from 'react';
import "../App.css";
import { SaveRequest, ClearRequest } from "../types";
import Saved from "./Saved"
import Form from "./Form"





const App = () => {

  const [url, setUrl] = useState('http://localhost:4000');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  let content;

  chrome.storage.sync.get(['urtweet_url'], function (result) {
    if (result.urtweet_url.set) {
      setSaved(true);
      setUrl(result.urtweet_url.url);
    }
  });

  function saveurl(url: string): void {
    const data = { urtweet_url: { set: true, url: url } };
    chrome.storage.sync.set(data, function () {
      const m: SaveRequest = { type: "SAVE_URL", url: url }
      chrome.runtime.sendMessage(m)
    });
  }

  function reset(): void {
    chrome.storage.sync.set({ urtweet_url: { url: "", set: false } }, function () {
      const m: ClearRequest = { type: "CLEAR_URL" }
      chrome.runtime.sendMessage(m)
    });
    setSaved(false);

  }


  async function handleClick(event: React.MouseEvent): Promise<any> {
    try {
      const res = await validate(url);
      if (res == "ok") {
        saveurl(url)
        setSaved(true);
      } else{
        setError("There was an error accessing your Urtweet instance");
        setSaved(false);
      }
    } catch {
      setError("Not a valid Urtweet instance");
      setSaved(false);
    }
  }

  async function validate(url: string): Promise<string> {
    const res = await fetch(url + "/api/running");
    const json = await res.json()
    return await json;
  }

  if (saved){
   content =  <Saved url={url} reset={reset} />;
  } else{
    content = <Form url={url} error={error} setUrl={setUrl} handleClick={handleClick}/>;

  }


    return (
      <div className="App">
        <header className="App-header">
          <img src="clipart2177986.png" className="App-logo" alt="logo" />
          <h1>
            Ursprache Helper
          </h1>
          {content}
          </header>
      </div>
    );
};

export default App;

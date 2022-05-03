import React, { useState } from "react";

import "./App.css";

const links = require("./links.json");

function App() {
  const renderLinks = (e) => {
    let out = [];
    Object.keys(links).map((e, i) => {
      out.push(
        <a href={links[e]} key={i}>
          {e}
        </a>
      );
    });
    return out;
  };

  const [text, setText] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const copyText = () => navigator.clipboard.writeText(text);
  const clearText = () => setText("");

  return (
    <div className="App">
      <h1>App for Central grading</h1>
      <hr />

      <section id="btm">
        <div id="left">{renderLinks()}</div>
        <div id="right">
          <textarea onChange={handleChangeText} value={text} />
          <button onClick={copyText}>Copy</button>
          <button onClick={clearText}>Clear</button>
        </div>
      </section>
    </div>
  );
}

export default App;

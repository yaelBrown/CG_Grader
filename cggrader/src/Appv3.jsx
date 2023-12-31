import React from "react";
import { useEffect, useState } from "react";
import feedbackJSON from "./feedback.json";
import ybLogo from "./assets/images/ybLogo.jpg";
import "./assets/css/stylev3.css";

function Appv3() {
  return (
    <main>
      <section id="top_section" className="wborder">
        <div id="assignment_btns">
          <button type="button">Mod 1</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
          <button type="button">Mod ##</button>
        </div>
        <div className="vert_divider" />
        <div>
          <div>
            <button className="feedback_btn_lg">Perfect</button>
          </div>
          <div className="hor_divider" />
          <div id="feedback_default_btn_grp">
            <button className="feedback_default_btn">Init</button>
            <button className="feedback_default_btn">Finish</button>
            <button className="feedback_default_btn">Skip</button>
            <button className="feedback_default_btn">No Assets Folder</button>
            <button className="feedback_default_btn">Develop Folder</button>
          </div>
          <div className="hor_divider" />
        </div>
        <div className="vert_divider" />
        <div id="feedback_text">
          <textarea id="feedback_text_area"></textarea>
          <div>
            <button className="feedback_text_btn copy_btn">Copy</button>
            <br />
            <button className="feedback_text_btn clear_btn">Clear</button>
            <br />
            <button className="feedback_text_btn save_btn">Save</button>
            <br />
            <button className="feedback_text_btn">Mem</button>
          </div>
        </div>
        <div className="vert_divider" />
        <div>4</div>
      </section>
      <section id="bottom">Bottom</section>
    </main>
  );
}

export default Appv3;

// Add timer at the time
// Add previous assignments section with a clear button

// Connect with ChatGPT

// Create application logic

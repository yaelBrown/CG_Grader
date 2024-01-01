import React from "react";
import { useEffect, useState } from "react";
import feedbackJSON from "./feedbackv2.json";
import "./assets/css/stylev3.css";
import GraderHelper from "./lib/GraderHelper";

const GH = new GraderHelper()

function Appv3() {
  const initialState = {
    currentModSelected: "",
    feedback: "",
    mem: "",
    positiveItems: [],
    negativeItems: []
  }

  const [state, setState] = useState(initialState)

  const addFeedbackFromJSON = evt => {
    try {
      const dataTemp = evt.target.getAttribute('data-button').split(".")
      if (dataTemp[0] === "perfect") return setState({ ...state, feedback: feedbackJSON[state.currentModSelected].perfect })
      return setState({ ...state, feedback: state.feedback + feedbackJSON[dataTemp[0]][dataTemp[1]] })
    } catch (error) {
      if (error instanceof TypeError) {
        return setState({ ...state, feedback: evt })
      }
    }
  }

  const generateFeedback = async evt => {
    const res = await GH.makeOpenAIRequest()
    addFeedbackFromJSON(res)
  }

  const updateCurrentModSelected = evt => {
    const mod = evt.target.getAttribute('data-button')
    setState({...state, currentModSelected: mod})
  }

  const updateFeedback = evt => {
    setState({...state, feedback: evt.target.value})
  }

  const updateMemory = () => {
    setState({...state, mem: state.feedback})
  }

  const reciteMemory = () => {
    setState({...state, feedback: state.mem})
  }

  const clearFeedback = () => {
    setState({...state, feedback: ""})
  }

  const copyFeedbackToClipboard = () => {
    navigator.clipboard.writeText(state.feedback)
  }

  return (
    <main>
      <section id="top_section">
        <div id="assignment_btns">
          <button type="button" data-button="mod1" onClick={updateCurrentModSelected}>Mod 1</button>
        </div>
        <div className="vert_divider" />
        <div>
          <div>
            <button className="feedback_btn_lg" data-button="perfect" onClick={addFeedbackFromJSON}>Perfect</button>
          </div>
          <div className="hor_divider" />
          <div id="feedback_default_btn_grp">
            <button className="feedback_default_btn" data-button="default.init" onClick={addFeedbackFromJSON}>Init</button>
            <button className="feedback_default_btn" data-button="default.finish" onClick={addFeedbackFromJSON}>Finish</button>
            <button className="feedback_default_btn" data-button="default.skip" onClick={addFeedbackFromJSON}>Skip</button>
            <button className="feedback_default_btn" data-button="default.noAssetsFolder" onClick={addFeedbackFromJSON}>No Assets Folder</button>
            <button className="feedback_default_btn" data-button="default.developFolder" onClick={addFeedbackFromJSON}>Develop Folder</button>
            <button className="feedback_default_btn" data-button="default.badCommitHistory" onClick={addFeedbackFromJSON}>Bad Commit History</button>
          </div>
          <div className="hor_divider" />
        </div>
        <div className="vert_divider" />
        <div id="feedback_text">
          <textarea id="feedback_text_area" value={state.feedback} onChange={updateFeedback}></textarea>
          <div>
            <button className="feedback_text_btn" onClick={generateFeedback}>Generate</button>
            <br />
            <button className="feedback_text_btn copy_btn" onClick={copyFeedbackToClipboard}>Copy</button>
            <br />
            <button className="feedback_text_btn clear_btn" onClick={clearFeedback}>Clear</button>
            <br />
            <button className="feedback_text_btn save_btn" onClick={updateMemory}>Save</button>
            <br />
            <button className="feedback_text_btn" onClick={reciteMemory}>Mem</button>
          </div>
        </div>
        <div className="vert_divider" />
        <div id="feedback_prev">
          <div className="feedback_prev_table_row feedback_prev_table_head">
            <div className="feedback_prev_table_id">ID</div>
            <div className="feedback_prev_table_module">Mod</div>
            <div className="feedback_prev_table_score">Score</div>
            <div className="feedback_prev_table_datetime">Datetime</div>
          </div>
          <div className="feedback_prev_table_row feedback_prev_item">
            <div className="feedback_prev_table_id">99</div>
            <div className="feedback_prev_table_module">99</div>
            <div className="feedback_prev_table_score">100</div>
            <div className="feedback_prev_table_datetime">Sun Dec 31 2023 21:11:58</div>
          </div>
        </div>
      </section>
      <section id="bottom">2024</section>
    </main>
  );
}

export default Appv3;


// Connect with ChatGPT

// Create application logic

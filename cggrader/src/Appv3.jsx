import { useEffect, useState } from "react";
import feedbackJSON from "./feedbackv2.json";
import "./assets/css/stylev3.css";
import GraderHelper from "./lib/GraderHelper";
import RubricRenderer from "./lib/RubricRenderer";
import LocalStorageHelper from "./lib/LocalStorageHelper";

const GH = new GraderHelper()
const RR = new RubricRenderer()
const LSH = new LocalStorageHelper()

function Appv3() {
  const initialState = {
    currentModSelected: "",
    feedback: "",
    mem: "",
    negItemsSelectedScore: 0,
    negItems: [],
    positiveItems: [],
    modCriteria: " "
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

  const generateFeedback = async () => {
    const res = await GH.makeOpenAIRequest()
    addFeedbackFromJSON(res)
  }

  const updateCurrentModSelected = evt => {
    const mod = evt.target.getAttribute('data-button')
    const feedbackData = RR.renderFeedbackFromObject(feedbackJSON[mod].rubric, updateNegIemsSelectedScore)
    console.log(feedbackData)
    setState({...state, currentModSelected: mod, positiveItems: feedbackData.items, modCriteria: feedbackData.jsx})
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
    setState(initialState)
  }

  const copyFeedbackToClipboard = () => {
    LSH.addToLocalStorage(state)
    navigator.clipboard.writeText(state.feedback)
  }

  const updateNegIemsSelectedScore = evt => {
    if (evt.target.textContent === " ") return
    let newScore = state.negItemsSelectedScore
    let newNegItems = state.negItems || []

    if (evt.target.style.backgroundColor === '') {
      evt.target.style.backgroundColor = "#410000"
      newScore += parseInt(evt.target.getAttribute('data-score'))
      newNegItems.push(evt.target.textContent)
    } else {
      evt.target.style.backgroundColor = ""
      newScore -= parseInt(evt.target.getAttribute('data-score'))
      newNegItems = newNegItems.filter(i => i !== evt.target.textContent)
    }

    setState({...state, negItemsSelectedScore: newScore, negItems: newNegItems})
  }

  const calculateScore = () => {
    let out = 100 - state.negItemsSelectedScore
    if (isNaN(out)) return 100
    return out
  }

  return (
    <main>
      <section id="top_section">
        <div id="assignment_btns">
          <button type="button" data-button="mod1" onClick={updateCurrentModSelected}>Mod 1</button>
        </div>
        <div className="vert_divider" />
        <div id="feedback_items">
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
          <div id="feedback_rubric" dangerouslySetInnerHTML={{__html: state.modCriteria}} onClick={updateNegIemsSelectedScore} />
        </div>
        <div className="vert_divider" />
        <div id="feedback_text">
          <textarea id="feedback_text_area" value={state.feedback} onChange={updateFeedback}></textarea>
          <div>
            <div id="current_score">
              <h1>{calculateScore()}</h1>
            </div>
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
          <div className="feedback_prev_table_items" dangerouslySetInnerHTML={{__html: LSH.renderItems()}} />
        </div>
      </section>
      <section id="bottom"></section>
    </main>
  );
}

export default Appv3;


// Get previous items to populate.
// clear previous items.
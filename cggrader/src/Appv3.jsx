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
    previousItems: "",
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
    const res = await GH.makeOpenAIRequest(state.negItems, state.positiveItems)
    const generatedFeedback = feedbackJSON.default.init + res + feedbackJSON.default.finish
    addFeedbackFromJSON(generatedFeedback)
  }

  const updateCurrentModSelected = evt => {
    const mod = evt.target.getAttribute('data-button')
    const feedbackData = RR.renderFeedbackFromObject(feedbackJSON[mod].rubric, updateNegIemsSelectedScore)
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
    const tempPreviousItems = state.previousItems
    const tempMem = state.mem
    setState({...initialState, previousItems: tempPreviousItems, mem: tempMem})
  }

  const clearPrevItems = () => {
    LSH.clearItems()
    refreshPreviousItems()
    alert("Cleared previous items")
  }

  const copyFeedbackToClipboard = () => {
    LSH.addToLocalStorage(state)
    navigator.clipboard.writeText(state.feedback)
    refreshPreviousItems()
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

  const refreshPreviousItems = () => {
    setState({...state, previousItems: LSH.renderItems()})
  }

  const calculateScore = () => {
    let out = 100 - state.negItemsSelectedScore
    if (isNaN(out)) return 100
    return out
  }

  const retrievePrevItem = evt => {
    const prevItem = LSH.getFeedbackByID(evt.target.getAttribute('data-id'))
    console.log(prevItem)
    setState({...state, feedback: prevItem.feedback, negItemsSelectedScore: (100 - prevItem.score)})
  }

  useEffect(() => {
    refreshPreviousItems()
  }, [])

  return (
    <main>
      <section id="top_section">
        <div id="feedback_items">
        <div id="assignment_btns">
          <select name="assignment_sel" id="assignment_sel">
            <option>Mod 1  (Semantic HTML)</option>
            <option>Mod 2  (Porfessional Profile)</option>
            <option>Mod 3  (Password Generator)</option>
            <option>Mod 3  (Employee Tracker)</option>
            <option>Mod 4  (Javascript Quiz)</option>
            <option>Mod 4  (Personal Blog)</option>
            <option>Mod 4  (Console Finances)</option>
            <option>Mod 5  (Workday Scheduler)</option>
            <option>Mod 5  (Task Scheduler)</option>
            <option>Mod 6  (Weather Dashboard)</option>
            <option>Mod 8  (Weather Dashboard (Open Weather Map API))</option>
            <option>Mod 9  (Professional Readme Generator)</option>
            <option>Mod 10 (SVG Logo Generator)</option>
            <option>Mod 10 (Team Profile Generator)</option>
            <option>Mod 12 (Employee Tracker (OOP and NodeJS))</option>
            <option>Mod 12 (Employee Tracker (MySQL and NodeJS))</option>
            <option>Mod 14 (Tech Blog)</option>
            <option>Mod 19 (Progressive Web App)</option>
            <option>Mod 21 (Book Search Engine)</option>
          </select>
        </div>
        <br/>
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
            <button className="feedback_default_btn" data-button="default.noProfReadme" onClick={addFeedbackFromJSON}>No Professional Readme</button>
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
          <div className="feedback_prev_table_items" dangerouslySetInnerHTML={{__html: state.previousItems}} onClick={retrievePrevItem} />
          <br/>
          <button className="feedback_prev_btn clear_btn" onClick={clearPrevItems}>Clear Prev Items</button>
        </div>
      </section>
      <section id="bottom"></section>
    </main>
  );
}

export default Appv3;

// Add other mods to JSON
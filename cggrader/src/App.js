import { useEffect, useState } from 'react';
import './App.css';
import feedbackJSON from './feedback.json'

function App() {
  const initialState = {
    feedback: '',
    score: 100
  }

  useEffect(() => {
    document.title = "CG Grader"
  })

  const [state, setState] = useState(initialState)

  const resetHandler = () => setState(initialState)
  const addFeedback = (v) => setState({ ...state, feedback: v })
  const addFeedbackFromJson = (v) => setState({ ...state, feedback: (state.feedback + ` ${v}`)})
  const copyText = () => {
    const fb = state.feedback.trim()
    localStorage.setItem("CG-" + new Date().getTime(), fb)
    navigator.clipboard.writeText(fb)
  }

  return (
    <div className="App">
      <h1>CG Grader</h1>
      <main>
        <section>
          <textarea
            value={state.feedback}
            name="feedback"
            onChange={e => addFeedback(e.target.value)}
            cols="100"
            rows="10"
            spellCheck="true"
          />
        </section>
        <section>
          <button id="btn-copy" onClick={copyText}>Copy</button>
          <button onClick={resetHandler}>Reset</button>
        </section>
        <section id="btns">
          <span>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.init)}>init</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.finish)}>finish</button>
          </span>
          <span>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.perfect)}>perfect</button>
          </span>
          <span>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.noCss)}>No CSS Consolidation</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.noProfReadme)}>No Professional Readme</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.noUniqueRepoName)}>No Unique Repo name</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.onlyRepoName)}>Only Repo Name</button>
          </span>
          <span>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.linkSemantic)}>Link Semantic</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.linkProfessionalReadme)}>Link Professional Readme</button>
            <button onClick={() => addFeedbackFromJson(feedbackJSON.linkSemanticCommit)}>Link Semantic Commit</button>
          </span>
            {/* <button onClick={() => addFeedbackFromJson(feedbackJSON.x)}>x</button> */}
        </section>
      </main>
    </div>
  );
}

export default App;

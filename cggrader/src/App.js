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
  const copyText = () => navigator.clipboard.writeText(state.feedback.trim())

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
        <section>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.init)}>init</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.finish)}>finish</button>
          <br/>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfect)}>perfect</button>
          <br/>
        </section>
      </main>
    </div>
  );
}

export default App;

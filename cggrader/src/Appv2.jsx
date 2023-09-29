import {useEffect, useState} from 'react'
import './assets/css/stylev2.css'
import feedbackJSON from './feedback.json'
import ybLogo from './assets/images/ybLogo.jpg'
import mod1 from './assets/images/mod1-code-refactor-reqs.png'
import mod2 from './assets/images/mod2-personalprofile-grading-reqs.png'
import mod3 from './assets/images/mod3-css-grading-reqs.png'
import mod4 from './assets/images/mod4-web-apis-reqs.png'
import mod5 from './assets/images/mod5-workday-scheduler-grading-reqs.png'
import mod9 from './assets/images/mod9-readme-generator-reqs.png'
import mod14 from './assets/images/mod14-tech-blog.png'
import mod19 from './assets/images/mod19-text-editor.png'
import mod21 from './assets/images/mod21-book-search-engine.png'

export default function Appv2() {
  const initialState = {
    feedback: '',
    saved: '',
    numInLocalStorage: 0,
    imgSrc: ybLogo,
    lsData: []
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    document.title = "CG Grader"
    const data = JSON.parse(localStorage.getItem("cggrader_data"))
    if (data) {
      setState({...state, lsData: data, numInLocalStorage: data.length})
    }
  }, [state.feedback])

  const resetHandler = () => {
    setState({...state, feedback: '', imgSrc: ybLogo})
  }
  const addFeedback = (v) => setState({ ...state, feedback: v })
  const addFeedbackFromJson = (v, i=ybLogo) => {
    if (i === false) {
      setState({ ...state, feedback: (state.feedback + ` ${v}`)})
    } else {
      setState({ ...state, feedback: (state.feedback + ` ${v}`), imgSrc: i})
    }
  }
  // const setImage = (i) => setState({...state, imgSrc: i})
  const saveCurText = () => setState({ ...state, saved: state.feedback})
  const retrieveSaved = () => addFeedback(state.saved)
  const copyText = () => {
    const fb = state.feedback.trim()
    const lsItem = {feedback: fb, img: state.imgSrc, dt: new Date().toString()}
    const newState = {...state, numInLocalStorage: (state.numInLocalStorage + 1)}
    newState.lsData.push(lsItem)
    setState(newState)
    localStorage.setItem("cggrader_data", JSON.stringify(newState.lsData))
    navigator.clipboard.writeText(fb)
  }

  const renderLocalStorageItems = () => {
    let out = "<ul>"
    for (let i = 0;i < state.lsData.length; i++) {
      out += `<li><button>${state.lsData[i].dt.slice(0,24)}</button></li>`
    }
    out += "</ul>"

    if (out === "<ul></ul>") {
      return ""
    } else {
      return out
    }
  }

  const sidebarbtnclick = (e) => {
    for (let i = 0;i < state.lsData.length; i++) {
      if (state.lsData[i].dt.slice(0,24) === e.target.innerText) {
        addFeedbackFromJson(state.lsData[i].feedback, state.lsData[i].img)
        return
      }
    }
  }

  const clearLocalStorageItems = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmSel = confirm("Are you sure you want to clear LocalStorage Items?")
    let isCleared = false;
    if (confirmSel) {
      localStorage.setItem("cggrader_data", JSON.stringify([]))
      setState({...state, numInLocalStorage: 0, lsData: [], imgSrc: ybLogo})
      isCleared = true
    }
    if (isCleared) alert("Cleared items in local storage")
  }


  return (
    <>
      <header>
        <h1>CG_Grader (v2)</h1>
      </header>
      <hr/>
      <main className='container'>
        <section className='left-section'>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.init, false)}>init</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.finish, false)}>finish-m1</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.finishNormal, false)}>finish</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.skip, false)}>skip</button>
          <hr/>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod1, mod1)} style={{backgroundColor: "#d3f6ff"}}>perfect-m1</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod2, mod2)} style={{backgroundColor: "#d3f6ff"}}>perfect-m2</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod3, mod3)} style={{backgroundColor: "#d3f6ff"}}>perfect-m3</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod4, mod4)} style={{backgroundColor: "#d3f6ff"}}>perfect-m4</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod5, mod5)} style={{backgroundColor: "#d3f6ff"}}>perfect-m5</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod9, mod9)} style={{backgroundColor: "#d3f6ff"}}>perfect-m9</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod10, false)} style={{backgroundColor: "#d3f6ff"}}>perfect-m10</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod14, mod14)} style={{backgroundColor: "#d3f6ff"}}>perfect-m14</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod19, mod19)} style={{backgroundColor: "#d3f6ff"}}>perfect-m19</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.perfectMod21, mod21)} style={{backgroundColor: "#d3f6ff"}}>perfect-m21</button>
          <hr/>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.noCss, false)}>No CSS Consolidation</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.noProfReadme, false)}>No Professional Readme</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.noScreenshotOrDeploymentLink, false)}>No SS / Dep Link</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.noUniqueRepoName, false)}>No Unique Repo name</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.noAssetsFolder, false)}>No Assets Folder</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.onlyRepoName, false)}>Only Repo Name</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.badCommitHistory, false)}>Bad Commit History</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.developFolder, false)}>Develop Folder</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.readmeIsProjectDirections, false)}>Project Directions</button>
          <hr/>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.linkSemantic, false)}>Link Semantic</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.linkProfessionalReadme, false)}>Link Professional Readme</button>
          <button onClick={() => addFeedbackFromJson(feedbackJSON.linkSemanticCommit, false)}>Link Semantic Commit</button>
        </section>
        <section className='middle-section'>
          <textarea
            value={state.feedback}
            name="feedback"
            onChange={e => addFeedback(e.target.value)}
            cols="80"
            rows="10"
            spellCheck="true"
          />
          <div className='middle-row'>
            <button
              id="btn-copy"
              onClick={copyText}
            >
              Copy
            </button>
            <button
              id="btn-reset"
              onClick={saveCurText}
            >
              Save
            </button>
            <button
              id="btn-reset"
              onClick={resetHandler}
            >
              Reset
            </button>
            <span
              onClick={retrieveSaved}
              style={{cursor: "pointer"}}
            >S</span>
          </div>
          <div className='image-row'>
            <img src={state.imgSrc} alt='/' />
          </div>
        </section>
        <aside>
          <button
            onClick={() => clearLocalStorageItems()}
          >
            Clear
          </button>
          <span id="summary">
            <h4>Total: {state.numInLocalStorage}</h4>
          </span>
          <div onClick={e => sidebarbtnclick(e)} dangerouslySetInnerHTML={{__html: renderLocalStorageItems()}} />
        </aside>
      </main>
    </>
  )
}

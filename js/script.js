console.log("script.js")

// constants

const HOVER_GREY = "rgb(222, 222, 222)"
const SELECTED_GREY = "rgb(215, 215, 215)"

// utils

// State

const initialState = {
  current: {},
  queue: [],
  graded: [],
  uncommited: [],
  idx: 0,
  options: {
    limit: 25
  }
}

const state = initialState


// Models

class Assignment {
  constructor(assignment, name, githubUrl, deployUrl, index) {
    this.assignment = assignment
    this.date = new Date
    this.name = name
    this.githubUrl = githubUrl
    this.deployUrl = deployUrl
    this.grade = 0
    this.index = index
    this.flag = false
  }
}


// Test Data

const a1 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a2 = new Assignment(1, "Jim Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a3 = new Assignment(1, "James Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a4 = new Assignment(1, "Sean Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a5 = new Assignment(1, "Yael Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a6 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a7 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a8 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a9 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a10 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a11 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a12 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a13 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a14 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a15 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a16 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a17 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a18 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a19 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)

const tempDataArr = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19]

const populateWithTestData = () => {
  try {
    if (tempDataArr) {
      state.queue = tempDataArr
      state.graded = tempDataArr
    }
  } catch (err) {
    console.log("tempDataArr not found")
  }
}

populateWithTestData()


// Renderers
const renderCurrent = asmnt => console.log(asmnt)

const renderQueue = (limit=false) => {
  const queueEl = document.getElementById("queue")
  queueEl.innerHTML = ""
  let out = ""
  let temp = ""
  if (state.queue.length > 0) {
    if (!limit) {
      state.queue.forEach((e) => {
        temp += `<div class='queueItem row'>`
        temp += `<div class='queueAssignment col'>${e.assignment}</div>`
        temp += `<div class='queueName col'>${e.name}</div>`
        temp += `<div class='queueDate col'>${e.date.toLocaleDateString('en-US')}</div>`
        temp += `</div>`
        out += temp
        temp = ""
      })
    } else {
      let e;
      for (let i = 0; i < limit; i++) {
        e = state.queue[i]
        if (e == undefined) continue
        temp += `<div class='queueItem row'>`
        temp += `<div class='queueAssignment col'>${e.assignment}</div>`
        temp += `<div class='queueName col'>${e.name}</div>`
        temp += `<div class='queueDate col'>${e.date.toLocaleDateString('en-US')}</div>`
        temp += `</div>`
        out += temp
        temp = ""
      }
    }
  } else {
    out = "<em>No assignments to show yet</em>"
  }
  queueEl.innerHTML = out
}

const renderLatest = (limit=false) => {
  const latestEl = document.getElementById("latest-assignments")
  latestEl.innerHTML = ""
  let out = ""
  let temp = ""
  if (state.graded.length > 0) {
    if (!limit) {
      state.graded.forEach(e => {
        temp += `<div class='gradedItem row'>`
        temp += `<div class='gradedAssignment col'>${e.assignment}</div>`
        temp += `<div class='gradedName col'>${e.name}</div>`
        temp += `<div class='gradedDate col'>${e.date.toLocaleDateString('en-US')}</div>`
        temp += `<div class='gradedGrade col'>${e.grade}</div>`
        temp += `<div class='gradedFlag col'>${e.flag ? "Yes" : "No"}</div>`
        temp += `</div>`
        out += temp
        temp = ""
      })
    } else {
      let e;
      for (let i = 0; i < limit; i++) {
        e = state.graded[i]
        if (e == undefined) continue
        temp += `<div class='gradedItem row'>`
        temp += `<div class='gradedAssignment col'>${e.assignment}</div>`
        temp += `<div class='gradedName col'>${e.name}</div>`
        temp += `<div class='gradedDate col'>${e.date.toLocaleDateString('en-US')}</div>`
        temp += `<div class='gradedGrade col'>${e.grade}</div>`
        temp += `<div class='gradedFlag col'>${e.flag ? "Yes" : "No"}</div>`
        temp += `</div>`
        out += temp
        temp = ""
      }
    }
  } else {
    out = "<em>No assignments to show yet</em>"
  }
  latestEl.innerHTML = out
}

const renderLatestQueue = () => {
  const graderQueueEl = document.getElementById("grader-queue")
  graderQueueEl.innerHTML = ""
  let temp = ""
  if (state.queue.length > 0) {
    temp = '<div class="card"><ul class="list-group list-group-flush">'
    state.graded.forEach(e => temp += `<li class="list-group-item">${e.assignment} ${e.date.toLocaleDateString('en-US')} </br> ${e.name} </li>`)
    temp += '</ul>'
  } else {
    temp = "<em>Queue Is Empty</em>"
  }
  graderQueueEl.innerHTML = temp
  
  const latestQueueCards = document.getElementsByClassName("card")
  // here
  // Array.from(latestQueueCards).forEach(e => e.addEventListener("click", ))
  // Array.from(latestQueueCards).forEach(e => e.addEventListener("dblclick",))
}

renderLatestQueue()

// Listeners

const queueRefreshEl = document.getElementsByClassName('queueRefresh')
Array.from(queueRefreshEl).forEach(e => e.addEventListener("click", renderQueue(state.options.limit)))

const latestRefreshEl = document.getElementsByClassName('latestRefresh') 
Array.from(latestRefreshEl).forEach(e => e.addEventListener("click", renderLatest(state.options.limit))) 









// Init

renderQueue(state.options.limit)
renderLatest(state.options.limit)
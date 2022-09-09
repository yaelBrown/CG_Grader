console.log("script.js")

// State

const initialState = {
  current: {},
  queue: [],
  graded: [],
  uncommited: [],
  idx: 0
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
const a2 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a3 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a4 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
const a5 = new Assignment(1, "Bob Turner", "https://github.com/bob", "https://bob.github.io/pages",0)
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

const renderQueue = () => {
  const queueEl = document.getElementById("queue")
  let out = ""
  let temp = ""
  if (state.queue.length > 0) {
    state.queue.forEach((e) => {
      temp += `<div class='queueItem'>`
      temp += `<div class='queueAssignment'>${e.assignment}</div>`
      temp += `<div class='queueName'>${e.name}</div>`
      temp += `<div class='queueDate'>${e.date.toLocaleDateString('en-US')}</div>`
      temp += `</div>`
      temp += `<br/>`
      out += temp
    })
  }
  queueEl.innerHTML = out
}

renderQueue()
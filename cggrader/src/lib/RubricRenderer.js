class RubricRenderer {
  __renderRubricTitle(title, score) {
    if (score === undefined) {
      return `<p className="feedback_rubric_title" data-score=${0}>${title}</p>`
    } else {
      return `<p className="feedback_rubric_title" data-score=${score.slice(0,2)}>${title}</p>`
    }
  }

  __renderRubricItem(item, score) {
    if (score === undefined) {
      return `<p className="feedback_rubric_item" data-score=${0}>${item}</p>`
    } else {
      return `<p className="feedback_rubric_item" data-score=${score.toString().slice(0,2)}>${item}</p>`
    }
  }

  renderFeedbackFromObject(rubricObj) {
    const sections = Object.keys(rubricObj)
    let jsx = ""
    let items = []

    sections.forEach(e => {
      jsx += this.__renderRubricTitle(e, rubricObj[e].percentage)
      let weight = rubricObj[e].percentage ? parseInt(rubricObj[e].percentage.slice(0,2)) / rubricObj[e].criteria.length : 0

      if (rubricObj[e].criteria) {
        rubricObj[e].criteria.forEach(e => {
          items.push(e)
          jsx += this.__renderRubricItem(e, weight)
        })
      }
    })

    return {jsx, sections, items}
  }
}

export default RubricRenderer


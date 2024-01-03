class RubricRenderer {
  __renderRubricTitle(title, score, updater) {
    if (score === undefined) {
      return `<strong><p className="feedback_rubric_title" data-score=${0}>${title}</p></strong>`
    } else {
      return `<strong><p className="feedback_rubric_title" data-score=${score.slice(0,2)}>${title}</p></strong>`
    }
  }

  __renderRubricItem(item, score, updater) {
    if (score === undefined) {
      return `<p className="feedback_rubric_item" data-score=${0}>${item}</p>`
    } else {
      return `<p className="feedback_rubric_item" data-score=${score.toString().slice(0,2)}>${item}</p>`
    }
  }

  renderFeedbackFromObject(rubricObj, negItemsUpdater) {
    const sections = Object.keys(rubricObj)
    let jsx = ""
    let items = []

    sections.forEach(e => {
      jsx += this.__renderRubricTitle(e, rubricObj[e].percentage, negItemsUpdater)
      let weight = rubricObj[e].percentage ? parseInt(rubricObj[e].percentage.slice(0,2)) / rubricObj[e].criteria.length : 0

      if (rubricObj[e].criteria) {
        rubricObj[e].criteria.forEach(e => {
          items.push(e)
          jsx += this.__renderRubricItem(e, weight, negItemsUpdater)
        })
      }
    })

    return {jsx, sections, items}
  }
}

export default RubricRenderer


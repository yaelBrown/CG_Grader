class LocalStorageHelper {
  __getAllItemsFromLocalStorage() {
    const data = localStorage.getItem("gradedItems")
    if (data === null || data === "") return []
    return JSON.parse(data)
  }

  __getOneItemFromLocalStorage(id) {
    return this.__getAllItemsFromLocalStorage().filter(item => item.id === id)
  }

  __setAllItemsToLocalStorage(items) {
    return localStorage.setItem("gradedItems", JSON.stringify(items))
  }

  __gradedItemSerializer(stateObj) {
    return {
      id: this.__getAllItemsFromLocalStorage().length + 1,
      mod: stateObj.currentModSelected.slice(3),
      score: (100 - stateObj.negItemsSelectedScore),
      dateTime: new Date().toString().split("GMT")[0].trim(),
      feedback: stateObj.feedback
    }
  }

  addToLocalStorage(sObj) {
    let allItems = this.__getAllItemsFromLocalStorage()
    allItems.push(this.__gradedItemSerializer(sObj))
    console.log(allItems)
    this.__setAllItemsToLocalStorage(allItems)
  }

  __renderItemToJSX(item) {
    return `<div className="feedback_prev_table_row feedback_prev_item"><div className="feedback_prev_table_id">${item.id}</div><div className="feedback_prev_table_module">${item.mod}</div><div className="feedback_prev_table_score">${item.score}</div><div className="feedback_prev_table_datetime">${item.dateTime}</div></div>`
  }

  _renderAllItemsToJSX(allItems) {
    console.log(allItems)
    let jsx = ""
    allItems.forEach(item => {
      jsx += this.__renderItemToJSX(item)
    });
    return jsx
  }

  renderItems() {
    const itemsFromLocalStorage = this.__getAllItemsFromLocalStorage()

    if (itemsFromLocalStorage === null || itemsFromLocalStorage.length === 0) {
      localStorage.setItem("gradedItems", JSON.stringify([]))
      return '<em>No Items in Graded and in LocalStorage</em>'
    } else {
      return this._renderAllItemsToJSX(itemsFromLocalStorage) + `<br/><em>${itemsFromLocalStorage.length} graded item(s)</em>`
    }
  }

  clearItems () {
    localStorage.setItem("gradedItems", [])
  }
}

export default LocalStorageHelper
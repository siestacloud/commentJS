class Storage {


  Load(el) {
    let item = localStorage.getItem(el)
    if (!item) { return [] }
    return JSON.parse(item)
  }

  Save(el) {
    
    localStorage.setItem("comments", el)
  }
  SaveFavorites(el) {
    localStorage.setItem("favorites", el)
  }
}

export default Storage

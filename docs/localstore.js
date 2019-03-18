const Storage =  {}

Storage.get = function (name) {
  return JSON.parse(localStorage.getItem(name))
}

Storage.set = function (name, val) {
  if(Storage.get(name)){
    localStorage.removeItem(name)
  }
  localStorage.setItem(name, JSON.stringify(val))
}


export default Storage

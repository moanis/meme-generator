const STORAGE_KEY = 'MemeDatabase'
let gId = 1
let gFilter
const gImg


function _createImg(name, keywords) {
  let img = {
    id: gId++,
    url: `img/${name}`,
    kewords: keywords,
  }

  gImg.push(img)
}

function _createImgs() {
  _createImg('1.jpg', ['trump', 'politics'])
  _createImg('2.jpg', ['dogs', 'animals', 'kiss'])
  _createImg('3.jpg', ['dogs', 'animals', 'baby'])
  _createImg('4.jpg', ['cat', 'animals'])
}

function filterImgs(key) {
  gFilter = key ? key : undefined
}

function getImgById(id) {
  return gImg.findIndex((img) => img.id === id)
}

function getImgs() {
  if (gFilter) {
    let filteredImgs = gImg.filter((img) => {
      if (
        img.keywords.some((key) => {
          return key.includes(gFilter)
        })
      )
        return img
    })
    return filteredImgs
  } else return gImg
}

function resetData() {
  gImg = []
  _createImgs()
  saveData()
}

function getStorageData() {
  const database = loadFromStorage('MemeDatabase')
  if (!database) resetData()
  else 
  gId = database.gId
  gImg = database.gImg
  gKeywordSCMap = database.gKeywordSCMap
}

function saveData() {
  const database = {
    gImg,
  }
  saveToStorage('MemeDatabase', database)
}

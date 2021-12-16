function renderImgs() {
  const images = getImgs()
  let strHtml = ''
  if (!images.length) {
    strHtml = `<span style=" text-align: center">no matching....try again</span>`
  } else {
    strHtml = images.map((img) => {
      return `<figure
      class="gallery-item">
      <img src="${img.url}" alt="" class="gallery-img img-${img.id}" onclick="onEditMeme(${img.id})"/>
      </figure>`

      // `<div class="gallery-img image-item">
      //   <img src="${img.url}" onclick="onEditImage(${img.id})"/>
      //   </div>
      //   </div>`
    })
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHtml.join('')
  }
}

function _renderDataList() {
  const elSearchBox = document.querySelector('.search-input')
  elSearchBox.value = ''
  let strHtmls = ''
  for (let category in gKeywordSCMap) {
    strHtmls += `<option>${category}</option>`
  }
  const elCategoryList = document.querySelector('#category-list')
  elCategoryList.innerHTML = strHtmls
}

function onSearchClick(el) {
  let searchStr = el.value.toLowerCase()

  filterImgs(searchStr)
  renderImgs()
}

function _RenderCloudBox() {
  let elWordCloud = document.querySelector('.search-keywords')
  let words = []
  let idxs = []
  for (let word in gKeywordSCMap) {
    words.push(word)
    idxs.push(gKeywordSCMap[word])
  }
  elWordCloud.innerHTML = _renderCategoryWords(words, idxs, 5)

  if (words.length) {
    elWordCloud.innerHTML += `
        <span class="more" onclick="onMoreClicked(this)">more...</span>
        <span class="more-words"></span>
        `
    let moreWords = document.querySelector('.more-words')
    moreWords.innerHTML = _renderCategoryWords(words, idxs, idxs.length)
  }
}

function _renderCategoryWords(words, idxs, maxWords) {
  if (!idxs.length) return
  let strHTML = ''
  for (let i = 0; i < maxWords; i++) {
    let idx = getRandomInt(0, idxs.length)
    let word = words.splice(idx, 1)
    let count = idxs.splice(idx, 1)
    console.log(count)
    let ratio = (count / Object.keys(gKeywordSCMap).length) * 0.5
    let fontSize = 0.7 + ratio
    console.log(fontSize + ' ' + word + '  ' + ratio)
    strHTML += `
        <span class="search-words" onclick="onCloudWordSearch(this)" style="font-size: ${fontSize}em;"> ${word} </span>
        `
  }
  return strHTML
}

function onMoreClicked(el) {
  el.style.display = 'none'
  document.querySelector('.more-words').style.display = 'block'
}

function onCloudWordSearch(el) {
  let word = el.innerText.trim()
  gKeywordSCMap[word]++
  saveData()
  _RenderCloudBox()
  document.querySelector('.search-input').value = word.trim()
  onSearchClick(document.querySelector('.search-input'))
}

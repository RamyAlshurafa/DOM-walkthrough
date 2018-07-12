var form = document.getElementById('form')
var searchInput = document.getElementById('searchInput')
var container = document.getElementById('container')
var filteredArray = []
form.addEventListener('submit', function(event) {
  event.preventDefault()
  //clear the old result
  clearResults()

  // get input value and filter data to match the search
  var searchedWord = searchInput.value
  filteredArray = searchInArray(data, searchedWord)

  //render the results
  renderData(filteredArray)
})


// this function filters the data
function searchInArray(array, word) {
  return array.filter(function(el) {
    return el.text.includes(word)
  })
}


// this function to render the results
function renderData(array) {
  //check if there is results
  if (array.length > 0) {

    array.forEach(function(tweet, index) {
      var tweetDiv = document.createElement('div')
      tweetDiv.setAttribute('class', 'tweetDiv')

      var text = document.createElement('p')
      text.textContent = tweet.text
      tweetDiv.appendChild(text)

      //check if the tweet is contain image or not
      if (tweet.post_image) {

        //create a button to show the image
        var viewImage = document.createElement('button')
        viewImage.textContent = 'View the image'
        tweetDiv.appendChild(viewImage)

        // add addEventListener to the button
        viewImage.addEventListener('click', function(event) {

          //get the image url
          var imgUrl = getImgUrl(filteredArray, index);
          var img = document.createElement('img')
          img.setAttribute('src', imgUrl)
          tweetDiv.appendChild(img)
        })
      }
      //put the tweet div inside the container
      container.appendChild(tweetDiv)
    })


    //check if there is no results and show sorry message
  } else {
    var noResult = document.createElement('h4')
    noResult.textContent = 'Sorry, there is no results!'
    container.appendChild(noResult)
  }
}

//this function return the image url from the array
function getImgUrl(array, index) {
  return array[index].post_image
}

//this function removes all children elements from the container div
function clearResults() {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

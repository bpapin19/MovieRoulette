var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var clickCount = 0;


function getRandomInt() {
    return Math.floor(Math.random() * (250) + 1);
}

function addClick() {
    // var target = document.getElementById("clickCount");
    // clickCount++;
    // target.innerHTML = clickCount.toString();
    // return clickCount;
}

function Generate() {
    console.log("button clicked");
    var randomNum = getRandomInt();
    var clicks = addClick();
    var data = {randomNum, clicks};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/', options).then(response => {
        console.log(response);
    });
    window.location.reload();
    //setDetails(randomMovieImage, randomMovieTitle, randomMovieRating, randomMovieGenre, randomMovieLength, randomMoviePlot, randomMovieDirector, randomMovieActors);
    //showDetails();
}

function showDropdownElements() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


function setDetails(imageURL, titleText, ratingText, genreText, 
    lengthText, plotText, directorText, actorsText) {

    'use strict';
    var detailImage = document.querySelector('[data-image-role="image"]');
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector('[data-image-role="title"]');
    detailTitle.textContent = titleText;

    var detailRating = document.querySelector('[data-image-role="rating"]');
    detailRating.textContent = ratingText;

    var detailGenre = document.querySelector('[data-image-role="genre"]');
    detailGenre.textContent = genreText;

    var detailLength = document.querySelector('[data-image-role="length"]');
    detailLength.textContent = lengthText;

    var detailPlot = document.querySelector('[data-image-role="plot"]');
    detailPlot.textContent = plotText;

    var detailDirector = document.querySelector('[data-image-role="director"]');
    detailDirector.textContent = directorText;

    var detailActors = document.querySelector('[data-image-role="actors"]');
    detailActors.textContent = actorsText;
}

function showDetails() {  
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}




// Get elements from HTML
var movieTitle = document.getElementById("title");
var movieRating = document.getElementById("rating");
var movieGenre = document.getElementById("genre");
var movieLength = document.getElementById("length");
var moviePlot = document.getElementById("plot");
var movieDirector = document.getElementById("director");
var movieActors = document.getElementById("actors");
var movieImage = document.getElementById("image");

// Random int for movie generation
function getRandomInt() {
    return Math.floor(Math.random() * (250) + 1);
}

// Get the selected genre from the dropdown menu
function getGenre() {
    var e = document.getElementById("genreDropdown");
    return e.value;
}

// Generate button is clicked
function Generate() {
    var randomNum = getRandomInt();
    var genre = getGenre();
    var data = {randomNum, genre};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/', options)
    .then(response => response.json())
    // set HTML elements to generated movie
    .then(data => {
      movieTitle.innerHTML = data.title;
      movieRating.innerHTML = data.rating;
      movieGenre.innerHTML = data.genre;
      movieLength.innerHTML = data.length_;
      moviePlot.innerHTML = data.plot;
      movieDirector.innerHTML = data.director;
      movieActors.innerHTML = data.actors;
      movieImage.src = data.link;
    });
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

  var divContainer, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
divContainer = document.getElementsByClassName("custom-select");
l = divContainer.length;
for (i = 0; i < l; i++) {
  selElmnt = divContainer[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  divContainer[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        console.log("select-element" + e);
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  divContainer[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);



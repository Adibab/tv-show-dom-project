// use of API level -350

const header = document.getElementById("header");
const searchBox = document.querySelector("#search-shows");
const paragraphforSearch = document.querySelector("#paragraphforSearch");
const content = document.querySelector(".content");
const selectShow = document.querySelector("#select-show");
const selectEpisode = document.querySelector("#select-episode");
const title = document.querySelector(".title");
const goBackBtn = document.querySelector("#goBackBtn");
let allEpisodes;
const allShows = getAllShows();

function loadShowOnPage(allShows) {
  header.innerHTML = "";
  allShows.sort((a, b) => a.name.localeCompare(b.name));
  loadShow(allShows);
  searchShows(allShows);
}

window.onload = () => {
  loadShowOnPage(allShows);
};

// creating function for shows
function loadShow(shows) {
  for (let show of shows) {
    const title = document.createElement("h2");
    const span = document.createElement("span");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");
    const titleDiv = document.createElement("div");
    const newbody = document.createElement("div");
    //  adding episod name
    title.innerText = `${show.name}`;
    // title.appendChild(span)
    // span.innerText = `S0${show.season}E0${show.number}`;
    titleDiv.appendChild(title);
    //  titleDiv.appendChild(span);
    newbody.appendChild(titleDiv);
    header.appendChild(newbody);
    // episod image
    // console.log(show.image);
    image.src =
      show.image == null
        ? "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/summer-flowers-star-flower-1648071187.jpg"
        : show.image.original;

    newbody.appendChild(image);
    header.appendChild(newbody);
    image.classList.add("img");
    // paragraph
    paragraph.innerHTML = show.summary;
    newbody.appendChild(paragraph);
    header.appendChild(newbody);
    newbody.classList.add("content");
    titleDiv.classList.add("title-class");
    paragraphforSearch.innerHTML = `Displaying ${allShows.length} / ${allShows.length} episodes`;
    // console.log(paragraphforSearch)
  }
}

// search button to show specific shows
function searchShows(allShows) {
  searchBox.addEventListener("keyup", (e) => {
    // paragraphforSearch.classList.toggle("hidden");
    const value = e.target.value.toLowerCase();
    // console.log(value);
    // console.log(allShows);
    const remainingEpisodes = allShows.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
    // console.log(remainingEpisodes);
    header.innerHTML = "";
    loadShow(remainingEpisodes);
    if (value) {
      paragraphforSearch.innerHTML = `Displaying ${remainingEpisodes.length}/ ${allShows.length} episodes`;
    } else {
      paragraphforSearch.innerHTML = " ";
    }
  });
}

//  level-400
// get all the shows in select menu
function selectMovies(allShows) {
  allShows
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((shows) => {
      let option = document.createElement("option");
      option.innerText = `${shows.name}`;
      selectShow.appendChild(option);
    });
}
selectMovies(allShows);

//  selecting episode & showing episode accoridngly
selectShow.addEventListener("change", function () {
  // console.log(selectEpisode);
  if (selectShow.value === "none") {
    loadShowOnPage(allShows);
    selectEpisode.innerHTML = "Episodes";
    // console.log(selectEpisode);
  } else {
    const showId = allShows.find((show) => show.name === selectShow.value).id;
    getTheEpisodesList(showId);
  }
});

// getting the episode list in the select-episode  dropdown menu
function getTheEpisodesList(showId) {
  fetchEpisodes(showId);
  searchBox.value = "";
}

//  generating episode list in the body
function fetchEpisodes(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      allEpisodes = data;
      //  console.log(allEpisodes)
      header.innerHTML = " ";
      // function for loading episode in the body
      loadEpisodes(allEpisodes);
      // for episode option
      selectEpisode.innerHTML = "Episodes";
      episodeOption(allEpisodes);
      allEpisodes.forEach((episode) => {
        let option = document.createElement("option");
        option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
        selectEpisode.appendChild(option);
        // paragraphforSearch.classList.toggle("hidden");
        paragraphforSearch.innerHTML = `Displaying ${allEpisodes.length} episodes`;
        // console.log(paragraphforSearch)
        //
      });

      searchEpisodesList(allEpisodes);
    });
}

// function for loading episode in the body
function loadEpisodes(allEpisodes) {
  for (let episode of allEpisodes) {
    const title = document.createElement("h2");
    const span = document.createElement("span");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");
    const titleDiv = document.createElement("div");
    const newbody = document.createElement("div");
    //  adding episod name
    title.innerText = `${episode.name}`;
    // title.appendChild(span)
    // span.innerText = `S0${episode.season}E0${episode.number}`;
    titleDiv.appendChild(title);
    titleDiv.appendChild(span);
    newbody.appendChild(titleDiv);
    header.appendChild(newbody);
    // episod image
    // console.log(show.image);
    image.src =
      episode.image == null
        ? "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/summer-flowers-star-flower-1648071187.jpg"
        : episode.image.original;

    newbody.appendChild(image);
    header.appendChild(newbody);
    image.classList.add("img");

    // paragraph
    paragraph.innerHTML = episode.summary;
    newbody.appendChild(paragraph);
    header.appendChild(newbody);
    newbody.classList.add("content");
    titleDiv.classList.add("title-class");
  }
}

// for episode option
function episodeOption() {
  selectEpisode.value = " ";
  const optionEl = document.createElement("option");
  optionEl.innerText = "Episodes";
  selectEpisode.appendChild(optionEl);
  fetchEpisodes(allEpisodes);
  loadEpisodes(allEpisodes);
}

// search button to show specific episodes

function searchEpisodesList(allEpisodes) {
  searchBox.addEventListener("keyup", (e) => {
    // paragraphforSearch.classList.toggle("hidden");

    const value = e.target.value.toLowerCase();
    const remainingEpisods = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
 
     header.innerHTML = "";
     loadShow(remainingEpisods);

    if (value) {
     paragraphforSearch.innerHTML = `Displaying ${remainingEpisods.length}/ ${allShows.length} episodes`;
       console.log(paragraphforSearch)
     
    } else {
      paragraphforSearch.innerHTML = " ";
    }
 
  });
}

// level 500
// selecting episode from the drop down menu  & generating  episode in the body

selectEpisode.addEventListener("change", function () {
  const value = selectEpisode.value.slice(9);
  // console.log(value);
  let remainingEpisodes = allEpisodes.filter(
    (episode) => episode.name === value
  );
  // console.log(remainingEpisodes);
  // if (!value) {
  //   remainingEpisodes = allEpisodes;
  // }
  if (value) {
    paragraphforSearch.innerHTML = `Displaying ${remainingEpisodes.length}/ ${allEpisodes.length} episodes`;
  } else {
    paragraphforSearch.innerHTML = " ";
  }
  searchBox.value = "";
  header.innerHTML = "";
  // paragraphforSearch.innerHTML = "";
  loadEpisodes(remainingEpisodes);
  // goBackBtn.addEventListener("click" , gobackFromEpisode)
  goBackBtn.addEventListener("click", gobackFromShowPage);
});

// add event listner to goback btn to go back from movie show list page
goBackBtn.addEventListener("click", gobackFromShowPage);

function gobackFromShowPage() {
  header.innerHTML = " ";
  loadShow(allShows);
  selectShow.value = "none";
  selectEpisode.innerText = "Episodes";
  paragraphforSearch.innerHTML = "Displaying 301 episodes";
  searchBox.value = "";
}

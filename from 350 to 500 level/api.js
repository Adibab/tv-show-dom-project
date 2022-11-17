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
// // console.log(title)
// const episodeList = getAllEpisodes();

// popping up the episode in the window while it loads
function loadShowOnPage(allShows) {
  header.innerHTML = "";
  allShows.sort((a, b) => a.name.localeCompare(b.name));
  loadShow(allShows);
  searchShows(allShows);
}

loadShowOnPage(allShows);

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
  }
}

// search button to show specific shows
function searchShows(allShows) {

  searchBox.addEventListener("keyup", (e) => {
    paragraphforSearch.classList.toggle("hidden");
    const value = e.target.value.toLowerCase();
    console.log(value);
    console.log(allShows);
    const remainingEpisods = allShows.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
    console.log(remainingEpisods);
    if (value) {
      paragraphforSearch.innerHTML = `Displaying ${remainingEpisods.length}/ ${allShows.length} episodes`;
    } else {
      paragraphforSearch.innerHTML = " ";
    }
    header.innerHTML = "";
    loadShow(remainingEpisods);
  });
}

//  level-400
// get all the shows in select menu
function selectMovies() {
  allShows
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((shows) => {
      let option = document.createElement("option");
      //  console.log(option)
      option.innerText = `${shows.name}`;
      selectShow.appendChild(option);
      // console.log(option)
    });

}
selectMovies(allShows);

//  selecting episode & showing episode accoridngly
selectShow.addEventListener("change", function () {
  getTheEpisodesList();
  // searchEpisodesList();
  // goBackBtn.classList.toggle("hidden");

 
})



// getting the episode list in the select-episode  dropdown menu
function getTheEpisodesList() {
  const value = selectShow.value;
   
  // console.log(value);
  const showId = allShows.find((show) => show.name === value).id;
  // console.log(showId)
  // generating episode list in the body
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
      allEpisodes.forEach((episode) => {
        let option = document.createElement("option");
        option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
        selectEpisode.appendChild(option);

      paragraphforSearch.classList.toggle("hidden");
      paragraphforSearch.innerHTML = `Displaying ${allEpisodes.length} episodes`;
        
      });
      header.innerHTML = " ";
      // function for loading episode in the body
      loadEpisodes(allEpisodes);
      searchEpisodesList(allEpisodes);
    });
}

// search button to show specific episodes

function searchEpisodesList(allEpisodes) {
  searchBox.addEventListener("keyup", (e) => {
     paragraphforSearch.classList.toggle("hidden");
    const value = e.target.value.toLowerCase();
    console.log(value);
    console.log(allEpisodes);
    const remainingEpisods = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
    console.log(remainingEpisods);
    if (value) {
      paragraphforSearch.innerHTML = `Displaying ${remainingEpisods.length}/ ${allShows.length} episodes`;
    } else {
      paragraphforSearch.innerHTML = " ";
    }
    header.innerHTML = "";
    loadShow(remainingEpisods);
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
    span.innerText = `S0${episode.season}E0${episode.number}`;
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

// level 500
// selecting episode from the drop down menu  & generating  episode in the body

selectEpisode.addEventListener("change", function () {
  const value = selectEpisode.value.slice(9);
  console.log(value);
  let remainingEpisodes = allEpisodes.filter(
    (episode) => episode.name === value
  );
  console.log(remainingEpisodes);
  if (!value) {
    remainingEpisodes = allEpisodes;
  }
  searchBox.value = "";
  header.innerHTML = "";
  paragraphforSearch.innerHTML = ""
  loadEpisodes(remainingEpisodes);
goBackBtn.addEventListener("click" , gobackFromEpisode)
});



// add event listner to goback btn to go back from movie show list page 
 goBackBtn.addEventListener("click", gobackFromShowPage);
//  console.log(goBackBtn);
function gobackFromShowPage() {
  // console.log(allShows);
  header.innerHTML = " ";
  loadShow(allShows);
  selectShow.value = "none";
  selectEpisode.value = "none";
  paragraphforSearch.innerHTML = " ";
}


//  to go back from episode  list page 
 function gobackFromEpisode () {
  header.innerHTML = " ";
  loadEpisodes(allEpisodes);
  selectShow.value = "none";
  selectEpisode.value = "none";
  paragraphforSearch.innerHTML = " ";
 }

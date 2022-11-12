// use of API level -350

const header = document.getElementById("header");
const searchBox = document.querySelector("#search-shows");
const paragraphforSearch = document.querySelector("#paragraphforSearch");
const content = document.querySelector(".content");
const selectShow = document.querySelector("#select-show");
const selectEpisode = document.querySelector("#select-episode");
let allEpisodes;
const allShows = getAllShows();
// console.log(title)

loadShowOnPage(allShows);
// popping up the episode in the window while it loads
function loadShowOnPage(ShowList) {
  header.innerHTML = "";
  ShowList.sort((a, b) => a.name.localeCompare(b.name));
  loadShow(ShowList);
}

// creating function for shows
function loadShow(shows) {
  for (let show of shows) {
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");
    const titleDiv = document.createElement("div");
    const newbody = document.createElement("div");
    //  adding episod name
    title.innerText = `${show.name}`;
    // title.appendChild(span)
    titleDiv.appendChild(title);
    // titleDiv.appendChild(span);
    newbody.appendChild(titleDiv);
    header.appendChild(newbody);
    // episod image
    console.log(show.image);
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

//  level-400
// get all the shows in select menu

// console.log(allEpisodes)
function selectMovies(allEpisodes) {
  //  console.log(allEpisodes)
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
selectMovies(allEpisodes);

// get the episode list
function fetchEpisodes(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      allEpisodes = data;
      console.log(allEpisodes)
      allEpisodes.forEach((episode) => {
        let option = document.createElement("option");
        option.innerText = episode.name;
        selectEpisode.appendChild(option);
      });
      header.innerHTML = " ";
      loadShow(allEpisodes);
    });
}
fetchEpisodes();

//  selcting episode & showing episode accoridngly
selectShow.addEventListener("change", function () {
  getTheEpisodes();
});

function getTheEpisodes() {
  const value = selectShow.value;
  console.log(value);
  const showId = allShows.find((show) => show.name === value).id;
  // console.log(showId)
  fetchEpisodes(showId)
  searchBox.value = "";
}
getTheEpisodes();

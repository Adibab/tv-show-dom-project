// You can edit ALL of the code here
let allEpisodes;

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  populateSearchItem(allEpisodes);
  selectMovies(allEpisodes)
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;



const selectEpisode = document.querySelector("#select-episode");
function makePageForEpisodes(episodes) {
  const header = document.getElementById("header");
  header.innerHTML = "";
  for (let episode of episodes) {
    // const titleDiv = document.createElement("div")
    const title = document.createElement("h2");
    // console.log(title)
    const span = document.createElement("span");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");

    const titleDiv = document.createElement("div");
    const newbody = document.createElement("div");

    //  adding episod name
    title.innerText = `${episode.name}`;
    // adding episod & season
    //  console.log( `${episodsObjs.name}`)
    span.innerText = `S0${episode.season}E0${episode.number}`;
    // title.appendChild(span);

    // title.appendChild(span)
    titleDiv.appendChild(title);
    titleDiv.appendChild(span);
    newbody.appendChild(titleDiv);
    header.appendChild(newbody);

    // console.log(newbody)
    // newbody.appendChild(span);
    // newbody.appendChild(titleDiv)

    // episod image
    image.src = episode.image.medium;
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

const title = document.querySelector(".title");
const searchBox = document.querySelector("#search-shows");

function populateSearchItem(allEpisodes) {
  
  searchBox.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    const paragraphforSearch = document.querySelector("#paragraphforSearch");
    // const content = document.querySelector(".content");
    const remainingEpisods = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
    //  console.log(remainingEpisods)
    if (value) {
      paragraphforSearch.innerHTML = `Displaying ${remainingEpisods.length}/ ${allEpisodes.length} episods`;
    } else {
      paragraphforSearch.innerHTML = " ";
    }
    makePageForEpisodes(remainingEpisods);
  });

}

//  for select option
const select = document.querySelector("#select-episode")
// console.log(select)

function selectMovies (allEpisodes){
  // array = episodes
  allEpisodes.forEach((episodes) => {
    let option = document.createElement("option");
    // console.log(option)
    option.innerText = `S0${episodes.season}E0${episodes.number} - ${episodes.name}`;
    select.appendChild(option)
    // console.log(option)
  });
  select.addEventListener("change", function (){
const value = select.value
// console.log(value)
// console.log(value)
let  remainingEpisodes = allEpisodes.filter ((episode)=> episode.name === value)
  console.log(remainingEpisodes)
 if (!value) {
  remainingEpisodes = allEpisodes
 } 
 searchBox.value = ""
 makePageForEpisodes(remainingEpisodes);
  })
  
  // console.log(optionValue);
}
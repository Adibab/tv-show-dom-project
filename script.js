// You can edit ALL of the code here
let allEpisodes;

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  populateSearchItem(allEpisodes);
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

function populateSearchItem(allEpisodes) {
  const searchBox = document.querySelector("#search-shows");
  searchBox.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();
    const paragraphforSearch = document.querySelector("#paragraphforSearch");
    // const content = document.querySelector(".content");
    const remainingEpisods = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
    );
    if (value) {
      paragraphforSearch.innerHTML = `Displaying ${remainingEpisods.length}/ ${allEpisodes.length} episods`;
    } else {
      paragraphforSearch.innerHTML = " ";
    }
    makePageForEpisodes(remainingEpisods);
  });

}


function 

<body>
  <input type="text" id="search-box">
  <label for="episode-select">Choose an episode:</label>

  <select name="episodes" id="episode-select">
    <option value="">--Please choose an option--</option>
    <option value="1">LOTR</option>
    <option value="82">Breaking Bad</option>
  </select>
  <script>
    const showSelect = document.querySelector("#episode-select");
    showSelect.addEventListener("change", (event) => {
      const showId = event.target.value;

      getEpisodes(showId);
    });

    function getEpisodes(showId) {
      const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
      console.log({ url })
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => { console.log(data); })
    }




  </script>
</body>
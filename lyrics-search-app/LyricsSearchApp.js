let str = "";
let url = `https://api.lyrics.ovh/suggest/`;
let songList = "";
let lyrics = "";

const displayLyrics = (songTitle, artist) => {
  lyrics = lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  const div = document.getElementById("result");
  div.innerHTML = "";
  div.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;
};

const getLyrics = async (songTitle, artist) => {
  const div = document.getElementById("result");
  div.innerHTML = "";
  div.innerHTML = `
    <h2>Loading...</h2>
  `;
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
  const data = await res.json();
  console.log(data.lyrics);
  lyrics = data.lyrics;
  displayLyrics(songTitle, artist);
};

const assignClickEvent = () => {
  const getLyricsBtn = document.querySelectorAll(".get-lyrics");
  for (let lyric of getLyricsBtn) {
    lyric.addEventListener("click", function () {
      const songTitle = this.getAttribute("data-songTitle");
      const artist = this.getAttribute("data-artist");
      getLyrics(songTitle, artist);
    });
  }
};

const dispplayList = () => {
  const div = document.getElementById("result");

  div.innerHTML = `
       <ul class="songs">
            ${songList
              .map((songs) => {
                return `<li>
                    <span><strong>${songs.artist.name}</strong> -${songs.title}</span>
                    <button 
                      class='get-lyrics' 
                      data-songTitle=${songs.title}
                      data-artist=${songs.artist.name}
                      >

                      Get lyrics

                    </button>                    
                  </li>`;
              })
              .join("")}
       </ul>

    `;
  assignClickEvent();
};

const fetchLyrics = async () => {
  const res = await fetch(url + str);
  const data = await res.json();
  songList = data.data;
  dispplayList();
};

document.getElementById("search-btn").addEventListener("click", fetchLyrics);
document.getElementById("input").addEventListener("change", function () {
  str = this.value;
  //   console.log(str);
});

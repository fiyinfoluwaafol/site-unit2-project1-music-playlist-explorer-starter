const playlistData = data.playlists
let searchInput = document.getElementById("search-input");

function loadPlaylists(filterText = '') {
    let filteredPlaylistData = playlistData.filter(item => item['playlist_name'].toLowerCase().includes(filterText.toLowerCase()) || item['playlist_creator'].toLowerCase().includes(filterText.toLowerCase()))

    let cardList = document.getElementById('playlist-container');
    cardList.innerHTML = '';
    for (let i=0; i < filteredPlaylistData.length; i++){
        let card = filteredPlaylistData[i];
        cardList.innerHTML += `
            <div class="playlist-card">
                <div>
                    <img src="${card.playlist_art}" class="playlist-art">
                </div>
                <div class = "playlist-info">
                    <h3>${card.playlist_name}</h3>
                    <p>${card.playlist_creator}</p>
                <div>
                    <i id="likeButton" class="fa-regular fa-heart likeButton"></i>
                    <span>${card.likeCount}</span>
                </div>
            </div>
        `;
    }
    // if (filteredPlaylistData.length === 0) { // Additional feature to show when no playlists are found

    //}

    // Add event listeners to each card
    let cardElements = document.getElementsByClassName("playlist-card");
    for (let i = 0; i < cardElements.length; i ++) {
        cardElements[i].addEventListener('click',  (event) => { // What does event do?
            if (event.target.classList.contains('likeButton')) {
                toggleLike(event.target);
              } else {
                loadModalOverlay(playlistData[i]);
                document.getElementsByClassName('modal-overlay')[0].style.display = 'block';
              }
        });
    }
}

function toggleLike(button) {
    const likeCountSpan = button.nextElementSibling;
    let likeCount = parseInt(likeCountSpan.textContent);

    if (button.classList.contains('liked')) {
      button.classList.remove('liked');
      button.classList.add('fa-regular');
      button.classList.remove('fa-solid');
      likeCount = 0;
    } else {
      button.classList.add('liked');
      button.classList.add('fa-solid');
      button.classList.remove('fa-regular');
      likeCount = 1;
    }

    likeCountSpan.textContent = likeCount;
  }

searchInput.addEventListener('input', (event) => {
    loadPlaylists(event.target.value);
})

function loadModalOverlay(playlist){ // playlist contains the specific playlist object
    let modalOverlay = document.getElementsByClassName('modal-overlay')[0];
    modalOverlay.innerHTML = `
    <div class="modal-content">
    <span class="close">&times;</span>
    <div class="playlist-head">
        <img src="${playlist.playlist_art}" class="playlist-art">
        <div class="playlist-info">
        <h1>${playlist.playlist_name}</h1>
        <h3>${playlist.playlist_creator}</h3>
        </div>
    </div>
    <button id="shuffle-button">Shuffle <i class="fa-solid fa-shuffle"></i></button>
    `;
    // Time to work on the songs
    let modalContent = document.getElementsByClassName('modal-content')[0];
    for (let i=0; i < playlist.songs.length; i++){
        let song = playlist.songs[i];
        modalContent.innerHTML += `
        <div class="song">
            <div class="song-cover">
                <img src="${song.cover_art}">
            </div>
            <div class="song-text">
                <div class="song-info">
                    <p>
                        ${song.title}
                        <br>
                        ${song.artist}
                        <br>
                        ${song.album}
                    </p>
                </div>
                <div class="song-duration">
                    <p>${song.duration}</p>
                </div>
            </div>
        </div>
        `;
    }
    modalOverlay.innerHTML += `
    </div>
    `;
    let closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click',  (event) => { // What does event do?
        document.getElementsByClassName('modal-overlay')[0].style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalOverlay){
            document.getElementsByClassName('modal-overlay')[0].style.display = 'none';
        }
        });

    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', () => {
        shuffleSongs(playlist);
    });

}

function shuffleSongs(playlist) {
    for (let i = playlist.songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist.songs[i], playlist.songs[j]] = [playlist.songs[j], playlist.songs[i]];
    }

    loadModalOverlay(playlist);
  }

loadPlaylists();

// function loadFeaturedPage() {
//     let randPosition = Math.floor(Math.random() * playlistData.length);
//     let featuredPlaylist = playlistData[randPosition];
//     let featuredPage = document.getElementById('featured-page');
//     featuredPage.innerHTML = `
//     <div id="feau-playlist-info">
//     <div class="modal-playlist-info">
//         <img src="${featuredPlaylist.playlist_art}" class="modal-playlist-cover">
//         <div class="playlist-info">
//         <h1>${featuredPlaylist.playlist_name}/h1>
//         <h3>${featuredPlaylist.playlist_creator}</h3>
//         </div>
//     </div>
//     `;
//     for (let i=0; i < playlist.songs.length; i++){
//         let song = playlist.songs[i];
//         featuredPage.innerHTML += `
//         <div class="song">
//             <div class="song-cover">
//                 <img src="${song.cover_art}">
//             </div>
//             <div class="song-text">
//                 <div class="song-info">
//                     <p>
//                         ${song.title}
//                         <br>
//                         ${song.artist}
//                         <br>
//                         ${song.album}
//                     </p>
//                 </div>
//                 <div class="song-duration">
//                     <p>${song.duration}</p>
//                 </div>
//             </div>
//         </div>
//         `;
//     }
//     modalOverlay.innerHTML += `
//     </div>
//     `;
// }

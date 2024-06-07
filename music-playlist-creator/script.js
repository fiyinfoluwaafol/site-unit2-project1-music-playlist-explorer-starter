const playlistData = data.playlists

const songDeck = playlistData[0].songs;

function loadPlaylists() {
    let cardList = document.getElementById('playlist-container');
    for (let i=0; i < playlistData.length; i++){
        let card = playlistData[i];
        cardList.innerHTML += `
            <div class="playlist-cards">
                <div>
                    <img src="${card.playlist_art}" class="playlist-cover">
                </div>
                <div class = "playlist-info">
                    <h3>${card.playlist_name}</h3>
                    <p>${card.playlist_creator}</p>
                <div>
                    <i id="likeButton" class="fas fa-heart"></i>
                    <span>${card.likeCount}</span>
                </div>
            </div>
        `;
    }
}

function loadModalOverlay(playlist){ // playlist contains the specific playlist object
    let modalOverlay = document.getElementsByClassName('modal-overlay')[0];
    modalOverlay.innerHTML = `
    <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-playlist-info">
        <img src="${playlist.playlist_art}" class="modal-playlist-cover">
        <div class="playlist-info">
        <h1>${playlist.playlist_name}</h1>
        <h3>${playlist.playlist_creator}</h3>
        </div>
    </div>
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
        `;
    }
    modalOverlay.innerHTML += `
    </div>
    `;
}


loadPlaylists();
var cardElements = document.getElementsByClassName("playlist-cards");
    for (let i = 0; i < cardElements.length; i ++) {
        cardElements[i].addEventListener('click',  (event) => { // What does event do?
            loadModalOverlay(playlistData[i]);
            document.getElementsByClassName('modal-overlay')[0].style.display = 'block';
            // console.log(playlistData[i]);
        });
    }

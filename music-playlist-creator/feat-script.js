const playlistData = data.playlists;

function loadFeaturedPage() {
    let randPosition = Math.floor(Math.random() * playlistData.length);
    console.log(playlistData[randPosition]);
    let featuredPlaylist = playlistData[randPosition];
    let featuredPage = document.getElementById('featured-page');
    featuredPage.innerHTML = `
    <div id="feau-playlist-info">
        <div class="modal-playlist-info">
            <img src="${featuredPlaylist.playlist_art}" class="modal-playlist-cover">
            <div class="playlist-info">
                <h1>${featuredPlaylist.playlist_name}</h1>
                <h3>${featuredPlaylist.playlist_creator}</h3>
            </div>
        </div>

    `;
    let songsContainer = document.createElement('div');
    songsContainer.classList.add('song-container');
    featuredPage.appendChild(songsContainer);
    songsContainer = document.getElementsByClassName('song-container')[0];
    for (let i=0; i < featuredPlaylist.songs.length; i++){
        let song = featuredPlaylist.songs[i];
        songsContainer.innerHTML += `
        <div class="song-feat">
            <div class="song-cover">
                <img src="${song.cover_art}">
            </div>
            <div class="song-text">
                <div class="song-info">
                    <p>
                        <i class="fas fa-music"></i> ${song.title}
                        <br>
                        <i class="fas fa-user"></i> ${song.artist}
                        <br>
                        <i class="fas fa-compact-disc"></i> ${song.album}
                    </p>
                </div>
                <div class="song-duration">
                    <p>${song.duration}</p>
                </div>
            </div>
        </div>
        `;
    }
    featuredPage.innerHTML += `
    </div>
    `;
}

loadFeaturedPage();

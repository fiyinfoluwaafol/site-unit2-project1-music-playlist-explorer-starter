const playlistData = data.playlists

function loadPlaylists() {
    let cardList = document.getElementById('playlist-container');
    for (let i=0; i < playlistData.length; i++){
        let card = playlistData[i];
        const div = document.createElement('div');
        div.className = 'playlist-cards';
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
loadPlaylists();

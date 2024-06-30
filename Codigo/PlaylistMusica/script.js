let playlists = [];

// Carregar playlists do sessionStorage ao iniciar a aplicação
if (sessionStorage.getItem('playlists')) {
    playlists = JSON.parse(sessionStorage.getItem('playlists'));
}

function savePlaylists() {
    sessionStorage.setItem('playlists', JSON.stringify(playlists));
}

function createPlaylist() {
    const name = document.getElementById('playlist-name').value;
    const description = document.getElementById('playlist-description').value;
    if (name && description) {
        const newPlaylist = {
            name: name,
            description: description,
            links: []
        };
        playlists.push(newPlaylist);
        savePlaylists();
        displayPlaylists();
        document.getElementById('playlist-name').value = '';
        document.getElementById('playlist-description').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

function addLinkToPlaylist(playlistIndex) {
    const linkInput = document.getElementById(`link-input-${playlistIndex}`);
    const link = linkInput.value;
    const videoId = extractVideoId(link);
    if (videoId) {
        playlists[playlistIndex].links.push(link);
        savePlaylists();
        displayPlaylists();
    } else {
        alert('Invalid YouTube link.');
    }
}

function editPlaylist(playlistIndex) {
    const newName = prompt('Enter new name for the playlist:');
    const newDescription = prompt('Enter new description for the playlist:');
    if (newName && newDescription) {
        playlists[playlistIndex].name = newName;
        playlists[playlistIndex].description = newDescription;
        savePlaylists();
        displayPlaylists();
    }
}

function deletePlaylist(playlistIndex) {
    playlists.splice(playlistIndex, 1);
    savePlaylists();
    displayPlaylists();
}

function displayPlaylists() {
    const playlistsList = document.getElementById('playlists-list');
    playlistsList.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist');
        playlistElement.classList.add('col-4');
        playlistElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${playlist.name}</h5>
                <p class="card-text">${playlist.description}</p>
                <ul class="list-group list-group-flush">
                    ${playlist.links.map(link => `<li class="list-group-item"><a href="#" onclick="playVideo('${link}')">${link}</a></li>`).join('')}
                </ul>
                <div class="playlist-buttons">
                    <input type="text" id="link-input-${index}" placeholder="Add YouTube link">
                    <button onclick="addLinkToPlaylist(${index})">Add Link</button>
                    <button onclick="editPlaylist(${index})">Edit</button>
                    <button onclick="deletePlaylist(${index})">Delete</button>
                </div>
            </div>
        </div>
    `;
        playlistsList.appendChild(playlistElement);
    });
}

function extractVideoId(link) {
    const videoIdMatch = link.match(/(?:\?v=|\/embed\/|\.be\/|\/v\/|\/e\/|watch\?v=|watch\?.+&v=)([^&?/\n]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

function playVideo(link) {
    const videoId = extractVideoId(link);
    if (videoId) {
        const playerDiv = document.getElementById('youtube-player');
        playerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        alert('Invalid YouTube link.');
    }
}

displayPlaylists();
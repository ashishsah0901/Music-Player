const artist = document.getElementById('artist');
const title = document.getElementById('title');
const image = document.querySelector('img');
const music = document.querySelector('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const progress_bar = document.getElementById('progress');
const total_duration = document.getElementById('duration');
const total_currentTime = document.getElementById('current_time');
const progress_division = document.getElementById('progress_div');

const songs = [{
    name: "Name: 1",
    artist: "Artist: 1",
    title: "Song: 1"
}, {
    name: "Name: 2",
    artist: "Artist: 2",
    title: "Song: 2"
}, {
    name: "Name: 3",
    artist: "Artist: 3",
    title: "Song: 3"
}, {
    name: "Name: 4",
    artist: "Artist: 4",
    title: "Song: 4"
}];

let isplaying = false;

const playMusic = () => {
    isplaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    image.classList.add('anime');
}
const pauseMusic = () => {
    isplaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    image.classList.remove('anime');
}
play.addEventListener('click', () => {
    if (isplaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});
const loadSongs = songs => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music.mp3"
    image.src = "../Project6/background.jpg";
};
songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic()
}
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic()
}

music.addEventListener('timeupdate', (e) => {
    let current = e.srcElement.currentTime
    let eduration = e.srcElement.duration
    let progress_time = (current / eduration) * 100;
    progress.style.width = `${progress_time}%`;
    if (eduration) {
        if ((eduration % 60) < 10)
            total_duration.textContent = `${Math.floor(eduration / 60)}:0${Math.floor(eduration % 60)}`
        else
            total_duration.textContent = `${Math.floor(eduration / 60)}:0${Math.floor(eduration % 60)}`

    }
    if ((current % 60) < 10) {
        total_currentTime.textContent = `${Math.floor(current / 60)}:0${Math.floor(current % 60)}`
    } else {
        total_currentTime.textContent = `${Math.floor(current / 60)}:${Math.floor(current % 60)}`
    }
});
progress_div.addEventListener('click', (e) => {
    music.currentTime = (e.offsetX / e.srcElement.clientWidth) * music.duration
});
music.addEventListener('ended', nextSong)
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
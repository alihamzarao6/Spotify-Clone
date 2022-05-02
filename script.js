console.log('Welcome to Spotify');

// Initialize the events
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { coverPath: "covers/1.jpg", songName: "Salam-e-Ishq", filePath: "songs/1.mp3", timeStamp: "03:50" },
    { coverPath: "covers/2.jpg", songName: "Salam-e-Ishq", filePath: "songs/2.mp3", timeStamp: "02:33" },
    { coverPath: "covers/3.jpg", songName: "Salam-e-Ishq", filePath: "songs/3.mp3", timeStamp: "04:33" },
    { coverPath: "covers/4.jpg", songName: "Salam-e-Ishq", filePath: "songs/4.mp3", timeStamp: "04:27" },
    { coverPath: "covers/5.jpg", songName: "Salam-e-Ishq", filePath: "songs/5.mp3", timeStamp: "03:28" },
    { coverPath: "covers/7.jpg", songName: "Salam-e-Ishq", filePath: "songs/7.mp3", timeStamp: "04:33" },
    { coverPath: "covers/8.jpg", songName: "Salam-e-Ishq", filePath: "songs/8.mp3", timeStamp: "03:50" },
    { coverPath: "covers/10.jpg", songName: "Salam-e-Ishq", filePath: "songs/10.mp3", timeStamp: "04:27" },
];

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    // element.getElementsByClassName('timeStamp')[0].innerHTML = `${songs[i].timeStamp} &nbsp; <i id=${songIndex} class="songItemPlay far fa-play-circle"></i>`;
});


// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
    })
});

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
});

document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    }
    else {
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})


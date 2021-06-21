"use strict";

let playBtn = document.querySelector("#playBtn");
let song = document.querySelector("#song");
let progressBar = document.querySelector("#progressBar");
let musicDuration = document.querySelector("#musicDuration");
let musicCurrent = document.querySelector("#musicCurrent");
let main = document.querySelector("main");
let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
let playList = document.querySelectorAll("#playList li")

let isPlay = false;
let timer = null;
let num = 1;

// 播放暂停
playBtn.addEventListener("click", function () {
    if (isPlay == false) {
        toPlay();
        musicDuration.innerHTML = format(song.duration);
    } else {
        toPause();
    }
    isPlay = !isPlay;
});

function toPlay() {
    song.play();
    playBtn.style.animationPlayState = "running";
    progress();
}

function toPause() {
    song.pause();
    playBtn.style.animationPlayState = "paused";
    clearInterval(timer);
}

// 进度条
function progress() {
    let screenWidth = main.clientWidth;
    song.oncanplay = function () {
        musicDuration.innerHTML = format(song.duration);
    }

    timer = setInterval(function () {
        let progressWidth = song.currentTime / song.duration * screenWidth;
        progressBar.style.width = progressWidth + "px";
        musicCurrent.innerHTML = format(song.currentTime);
    }, 100);
}

// 结束时
song.addEventListener("ended", function () {
    progressBar.style.width = "100%";
    clearInterval(timer);
    num = num + 1;
    change();
});

// 时长转换
function format(time) {
    let seconds = parseInt(time);
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let result = minutes + ":" + seconds;
    return result;
}

// 切换歌曲
prev.addEventListener("click", function () {
    num = num - 1;
    change();
});

next.addEventListener("click", function () {
    num = num + 1;
    change();
});

function change() {
    if (num < 1) {
        num = 2;
    }
    if (num > 2) {
        num = 1;
    }
    // 切换歌曲文件和封面
    song.src = "music/" + num + ".mp3";
    playBtn.src = "images/" + num + ".jpg";
    // 旋转复位
    playBtn.classList.remove("play-rotate");
    // 播放音乐
    toPlay();
    isPlay = true;
    // 旋转重来
    playBtn.classList.add("play-rotate");
}

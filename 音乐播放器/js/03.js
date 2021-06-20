"use strict";

let playBtn = document.querySelector("#playBtn");
let song = document.querySelector("#song");
let isPlay = false;

playBtn.addEventListener("click", function () {
    if (isPlay == false) {
        song.play();
        this.style.animationPlayState = "running"
    } else {
        song.pause();
        this.style.animationPlayState = "paused"
    }
    isPlay = !isPlay;
});
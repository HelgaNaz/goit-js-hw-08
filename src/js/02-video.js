import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle (function () {
    
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem("videoplayer-current-time", seconds);
}).catch(function(error) {
    console.log(error);
});

}, 1000));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function (seconds) {
   console.log("Begin", seconds)
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log("The time was less than 0 or greater than the video’s duration")
            break;
        default:
            console.log("Some other error occurred")
            break;
    }
});




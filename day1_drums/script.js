document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('.composer button').addEventListener('click', () => {
    let keyInput = document.querySelector('#input').value;

    if(keyInput !== ''){
        let songArray = keyInput.split('');
        playSong(songArray);
    }
});

function playSound(sound) {
    let keyElement =  document.querySelector(`div[data-key=${sound}`); // select key div
    let audioElement = document.querySelector(`#s_${sound}`); // select key audio

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement) {
        keyElement.classList.add('active');

        setTimeout( () => {
            keyElement.classList.remove('active');
        }, 300);
    }
};

function playSong(song) {
    let wait = 0;

    for(let sound of song){
        setTimeout( () => {
            playSound(`key${sound}`);
        }, wait);
        wait += 250;
    }
};  












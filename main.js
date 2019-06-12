const maxCharacters = 200;
const url = 'https://api.voicerss.org';
const apiKey = '5b838ffd11ca404daa5cc7fe1d83c30b';

const tooLongError= 'Text exceeds 200 character maximum';
const whitespaceError= 'Text must contain text characters other than white space';

const playBtn = () => document.getElementById('play-btn');
const textInput = () => document.getElementById('text-input');
const errorMessage = () => document.getElementById('error-message');

const buildUrl = (str) => `${url}/?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
const tooLong = (str) => str.length >= maxCharacters;
const emptyString = (str) => str.split('').every(char => char === ' ' || char === '\n');

const listenerFn = (event) => {
    if(event.target.value || event.type === 'paste'){
        playBtn().disabled = false;
    }else{
        playBtn().disabled = true;
    }
}

const displayErrorMsg = (val) => {
    const errs = [];
    if(tooLong(val)){
        errs.push(tooLongError);
    }if(emptyString(val)){
        errs.push(whitespaceError);
    }
    errs.forEach(err => {
        const div = document.createElement('div');
        div.innerText = err;
        errorMessage().appendChild(div)
    })
}

const clearError = () => errorMessage().innerHTML = '';
playBtn().addEventListener('click', () => {
    clearError();
    if(!emptyString(textInput().value) && !tooLong(textInput().value)){
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
    } else {
        displayErrorMsg(textInput().value);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);
})
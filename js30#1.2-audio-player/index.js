document.addEventListener("DOMContentLoaded", function() {

let isPlay = false;
let playNum = 0;
let vol = .5;
let vol_on = true;

const all_audio = document.querySelectorAll('.audio');
const button = document.querySelector('.play');
const button_vol = document.querySelector('.vol_act');
const wrap_img = document.querySelector('.wrapper-img');
const autor = document.getElementById('autor_id')
const song_title = document.getElementById('song_id')

  const audio = all_audio[playNum];
  const start = document.querySelector('.start')
  const end = document.querySelector('.end')
  const progressBar = document.querySelector('.progress-bar')
  const now = document.querySelector('.now')

all_audio[playNum].onloadedmetadata = function () {
    end.innerHTML = conversion(audio.duration)
    start.innerHTML = conversion(audio.currentTime)
 }

function start_() {  
	const all_audio_1 = document.querySelectorAll('.audio');
const audio = all_audio_1[playNum];
    end.innerHTML = conversion(audio.duration)
    start.innerHTML = conversion(audio.currentTime)

start_bar();

}

function start_bar() {
const all_audio_2 = document.querySelectorAll('.audio');
 setInterval(() => {
    start.innerHTML = conversion(all_audio_2[playNum].currentTime)
    now.style.width = all_audio_2[playNum].currentTime / all_audio_2[playNum].duration.toFixed(3) * 100 + '%'
  }, 500)
}

function conversion (value) {
    let minute = Math.floor(value / 60)
    minute = minute.toString().length === 1 ? ('0' + minute) : minute
    let second = Math.round(value % 60)
    second = second.toString().length === 1 ? ('0' + second) : second
    return `${minute}:${second}`
  }

progressBar.addEventListener('click', function (event) {

const all_audio_1 = document.querySelectorAll('.audio');
    let coordStart = this.getBoundingClientRect().left
    let coordEnd = event.pageX
    let p = (coordEnd - coordStart) / this.offsetWidth
    now.style.width = p.toFixed(3) * 100 + '%'
    all_audio_1[playNum].currentTime = p * all_audio_1[playNum].duration
  })

start_();


function toggleBtn() {
if(!isPlay){
button.classList.add('pause');
  all_audio[playNum].play();
	all_audio[playNum].volume = vol;
  isPlay = true;
  if (vol_on){
    all_audio[playNum].volume = vol;
  }else{
    all_audio[playNum].volume = 0;
  }	
}else{
button.classList.remove('pause');
  all_audio[playNum].pause();
  isPlay = false;

}  
}

button.addEventListener('click', toggleBtn);

function toggleBtn_vol() {
if(vol_on){
button_vol.classList.add('vol_deact');
vol_on = false;
document.querySelector('.progress_1').value="0";
document.querySelector('.progress_1').style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 0%, #fff 0%, white 100%)`;
all_audio[playNum].volume = 0;
//vol = 0;
}else{
button_vol.classList.remove('vol_deact');
vol_on = true;
document.querySelector('.progress_1').value = vol;
document.querySelector('.progress_1').style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${vol * 100}%, #fff ${vol * 100}%, white 100%)`;
all_audio[playNum].volume = vol;
}
}

button_vol.addEventListener('click', toggleBtn_vol);


function playNext() {
if (playNum === (all_audio.length -1)){
playNum = 0;
}else{
playNum = playNum + 1;
}
start_(playNum);
playAudio(playNum);
wrapper_image();
}

function playPrev() {
if (playNum === 0){
playNum = (all_audio.length -1);
}else{
playNum = playNum - 1;
}
start_(playNum);
playAudio(playNum);
wrapper_image();
}

function playAudio() {
let i = 0;
while (i < (all_audio.length)) {
all_audio[i].pause();
i++;
}
all_audio[playNum].currentTime = 0;
all_audio[playNum].play();

if (vol_on){
  all_audio[playNum].volume = vol;
}else{
  all_audio[playNum].volume = 0;
}	
isPlay = true;
button.classList.add('pause');
}

function wrapper_image() {

playNum1 = playNum;
if (playNum1 === 0){
wrap_img.classList.remove('second-song');
autor.innerHTML = 'КиШ';
song_title.innerHTML = 'Лесник';
}else{
wrap_img.classList.add('second-song');
autor.innerHTML = 'Король и Шут';
song_title.innerHTML = 'Утренний рассвет';
}
}


const playNext_btn = document.querySelector('.next');
const pausePrev_btn = document.querySelector('.prev');

playNext_btn.addEventListener('click', playNext);
pausePrev_btn.addEventListener('click', playPrev);


const progress_1 = document.querySelector('.progress_1');
  
progress_1.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value * 100}%, #fff ${value * 100}%, white 100%)`;
 all_audio[playNum].volume = value;
vol = value;
if(!vol_on){
vol_on = true;
button_vol.classList.remove('vol_deact');
}

})

document.onkeydown = function probel(is)
{
if (is.keyCode == '32') {

toggleBtn();

}
};



});







 












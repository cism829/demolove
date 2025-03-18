
const current_song = document.getElementById('current_song');
const mp3 = document.getElementById('mp3_player')
const playpause = document.getElementById('playpause');
const last_song = document.getElementById('back');
const next_song = document.getElementById('next');
const song_title = document.getElementById('song_title')
const song_artist = document.getElementById('artist')
const song_pic = document.getElementById('song_pic');
const opener = document.getElementById('open')
const all_songs = document.getElementById('all_songs');
const slider = document.getElementById('slider');
// const one_length = document.getElementById('one_length')

songs = [
        {id: 1, file: 'oscar_winning_tears.mp3', title: 'Oscar Winning Tears', artist: 'RAYE', img: 'owt_cover.jfif'},
        {id: 2, file: 'residuals.mp3', title: 'Residuals', artist: 'Chris Brown', img: 'residuals.jpg'},
        {id: 3, file: 'conversation_pit.mp3', title: 'Conversation Pit', artist: 'Junetober', img: 'cp_cover.jpg'},
        {id: 4, file: 'myself.mp3', title: 'Myself', artist: 'Layton Greene', img: 'myself_cover.jpg'}, 
        {id: 5, file: 'mbn.mp3', title: 'Must Be Nice', artist: 'Lyfe Jennings', img: 'mbn_cover.jpg'},   
        {id: 6, file: 'ygwin.mp3', title: 'You Got What I Need', artist: 'Joshua Radin', img: 'ygwin_cover.jpg'},
        {id: 7, file: 'siy.mp3', title: 'Smash Into You', artist: 'Beyonce', img: 'siy_cover.png'},
        {id: 8, file: 'Balloon.mp3', title: 'Balloon (ft. Doechii)', artist: 'Tyler, The Creator', img: 'balloon.jpg'},
        {id: 9, file: 'rich.mp3', title: 'Rich $ex', artist: 'Future', img: 'rich.webp'},
        {id: 10, file: 'suffering.mp3', title: 'Suffering', artist: 'Jorge Rivera Herrans, Anna Lee', img: 'suffering.jpg'},
        {id: 11, file: 'wild.mp3', title: 'Wild Things', artist: 'Alessia Cara', img: 'wild.jpg'},
        {id: 12, file: 'scientist.mp3', title: 'The Scientist', artist: 'Corinne Bailey Rae', img: 'scientist.jpg'},
        {id: 13, file: 'love_for_you.mp3', title: 'Saving All My Love for You', artist: 'Whitney Houston', img: 'love_for_you_cover.jpg'}

        // {file: '', title: '', artist: '', img: ''}
    ]

let i = 0;

mp3.addEventListener("ended", playNext);

let song_length = "0:00";
const progressBar = document.getElementById('progress_bar');

mp3.addEventListener('loadedmetadata', () => {
    let total_minutes = Math.floor(mp3.duration / 60);
    let total_seconds = Math.floor(mp3.duration % 60).toString().padStart(2, '0');

    song_length = total_minutes + ':' + total_seconds;

    console.log(song_length);
    progressBar.max = mp3.duration
});

mp3.addEventListener('playing', () => {
    let one_length = document.getElementById('one_length');

    mp3.addEventListener('timeupdate', () => {

        let elapsed_minutes = Math.floor(mp3.currentTime / 60);
        let elapsed_seconds = Math.floor(mp3.currentTime % 60).toString().padStart(2, '0');

        let elapsed = elapsed_minutes + ':' + elapsed_seconds;
        one_length.textContent = elapsed + ' / ' + song_length;

        progressBar.value = mp3.currentTime;
        
    });
});

progressBar.addEventListener('input', () => {
    mp3.currentTime = progressBar.value;
});


next_song.addEventListener("click", playNext)


function playNext(){
    i = (i + 1) % songs.length; 
    current_song.src = 'mp3_files/' + songs[i].file; 
    song_title.textContent = songs[i].title
    song_artist.textContent = songs[i].artist
    song_pic.src = 'cover_art/' + songs[i].img;

    mp3.load(); 
    mp3.play(); 
}

last_song.addEventListener("click", playLast)

function playLast(){
    i = (i - 1) % songs.length;
    if( i < 0){
        i = songs.length - 1;
    }
    current_song.src = 'mp3_files/' + songs[i].file; 
    console.log(current_song)
    song_title.textContent = songs[i].title
    song_artist.textContent = songs[i].artist
    song_pic.src = 'cover_art/' + songs[i].img;
    console.log(song_pic.src)
    mp3.load(); 
    mp3.play(); 
}

mp3.addEventListener('playing', ()=>{
    playpause.src = 'assets/pause_button.png';
});

playpause.addEventListener("click", ()=>{
    if(mp3.paused){
        mp3.play();
        playpause.src = 'assets/pause_button.png';
    }
    else{
        mp3.pause();
        playpause.src = 'assets/play_button.png';
        
    }
});

opener.addEventListener('click', showSongs);

// document.addEventListener('click', ()=>{
//     if (all_songs.style.display === 'block') {
//         all_songs.style.display = 'none';
//     }
// });

function showSongs(){
    if (all_songs.style.display === 'block') {
        all_songs.style.display = 'none';
    } else if (all_songs.style.display === 'none' || all_songs.style.display === '') {
        all_songs.style.display = 'block';
    }

    console.log('clicked');
    const singular =document.querySelectorAll('.singular')

    if(singular.length===0){
        for(i=0;i<songs.length;i++){
            console.log(songs[i].title)
            one_song = document.createElement('div');
            one_song.classList.add('singular')
            one_song.id = songs[i].id

            img_song = document.createElement('img');
            img_song.src = 'cover_art/' + songs[i].img

            title_song = document.createElement('p');
            title_song.textContent = songs[i].title;

            all_songs.appendChild(one_song)
            one_song.appendChild(img_song)
            one_song.appendChild(title_song)
        }
        document.querySelectorAll('.singular').forEach(element => {
            element.addEventListener('click', function() {
                console.log(element.id)
                playSong(element.id)
                console.log('Element clicked:', this);
            });
        });
        console.log('done')
    }
    else{
        console.log('Playlist already created')
    }

}


function playSong(id){
    i = (id - 1);
    current_song.src = 'mp3_files/' + songs[i].file; 
    console.log(current_song)
    song_title.textContent = songs[i].title
    song_artist.textContent = songs[i].artist
    song_pic.src = 'cover_art/' + songs[i].img;
    console.log(song_pic.src)
    mp3.load(); 
    mp3.play();
}

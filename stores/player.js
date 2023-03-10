import { Howl, Howler } from "howler";
import helper from "@/utils/helper";

export default defineStore("player", {
   state: () => ({
      current_song: {},
      next_song: [],
      sound: {},
      seek: "00:00",
      duration: "00:00",
      playerProgress: "0%",
      volumeSlider: "100%",
      volume: 1.0,
      loop: false,
      randomize: false,
      muted: false,
   }),
   actions: {
      async newSong(song) {
         if (this.sound instanceof Howl) {
            this.sound.unload();
         }

         this.current_song = song;

         this.sound = new Howl({
            src: [song.url],
            html5: true,
            onend: this.checkNextSong
         });

         this.sound.play();

         this.sound.on("play", () => {
            requestAnimationFrame(this.progress);
         })

      },
      async addQueue(song) {
         this.next_song.push(song);
         if (Object.keys(this.current_song).length === 0) {
            this.newSong(this.next_song[0]);
            this.next_song = [];
         }
      },

      async toggleAudio() {
         if (!this.sound.playing) return
         if (this.sound.playing()) {
            this.sound.pause();
         } else {
            this.sound.play();
         }
      },

      async checkNextSong() {
         if (this.loop) {
            this.sound.play()
            return;
         }
         else if (this.next_song.length > 0 && this.randomize) {
            const randomNum = Math.floor(Math.random() * this.next_song.length)
            this.newSong(this.next_song[randomNum]);
            this.next_song.splice(randomNum, 1);
         }
         else if (this.next_song.length > 0) {
            this.newSong(this.next_song[0]);
            this.sendSignal(this.next_song[0])
            this.next_song.shift();
         }

      },

      async progress() {
         this.seek = helper.formatTime(this.sound.seek());
         this.duration = helper.formatTime(this.sound.duration());

         this.playerProgress = `${(this.sound.seek() / this.sound.duration() * 100)}%`
         if (this.sound.playing()) {
            requestAnimationFrame(this.progress);
         }
      },
      updateVolume(event) {
         const { x, width } = event.currentTarget.getBoundingClientRect();

         const clickX = event.clientX - x;
         this.volume = clickX / width;
         
         if(this.volume < 0) {
            this.volumeSlider = "0%"
            Howler.volume(0);
            this.muted = true
         } else {
            this.muted = false
            this.volumeSlider =  `${this.volume * 100}%`
            Howler.volume(this.volume);
         }
      },

      playPlaylist(songs) {
         this.randomize = false;
         this.next_song = songs.slice();
         this.newSong(this.next_song[0]);
         this.next_song.shift();
      },

      randomizePlaylist(songs) {
         this.next_song = songs.slice();
         this.randomize = true;
         const randomNum = Math.floor(Math.random() * this.next_song.length);
         this.newSong(this.next_song[randomNum]);
         this.next_song.splice(randomNum, 1);
      },

      updateSeek(event) {
         if (!this.sound.playing) return

         const { x, width } = event.currentTarget.getBoundingClientRect();

         const clickX = event.clientX - x;
         const percentage = clickX / width;
         const seconds = (this.sound.duration() * percentage);

         this.sound.seek(seconds);
         this.sound.once("seek", this.progress());  
      },
      sendSignal(currently_playing) {
         console.log(currently_playing)
         
      }
   },

   getters: {
      playing: (state) => {
         if (state.sound.playing) {
            return state.sound.playing()
         }
         return false;
      },
   },

   persist: {
      storage: persistedState.localStorage,
   },
})
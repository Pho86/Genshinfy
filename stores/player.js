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
      volume: 1.0,
      loop: false,
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
            volume: this.volume || 1.0,
            onend: this.checkNextSong
         });

         this.sound.play();

         this.sound.on("play", () => {
            requestAnimationFrame(this.progress);
         })

      },
      async addToQueue(song) {
         console.log(song)
         return;
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
         else if (this.next_song.length > 0) {
            this.newSong(this.next_song[0]);
            this.next_song.shift();
         }
      },

      async progress() {
         this.seek = helper.formatTime(this.sound.seek());
         this.duration = helper.formatTime(this.sound.duration());

         this.playerProgress = `${(this.sound.seek() / this.sound.duration() * 100)}%`
         if ((this.sound.seek() / this.sound.duration() * 100) > 98) {
         }
         if (this.sound.playing()) {
            requestAnimationFrame(this.progress);
         }
      },
      updateSeek(event) {
         if (!this.sound.playing) return

         const { x, width } = event.currentTarget.getBoundingClientRect();

         const clickX = event.clientX - x;
         const percentage = clickX / width;
         const seconds = (this.sound.duration() * percentage);

         this.sound.seek(seconds);
         this.sound.once("seek", this.progress);
      }
   },
   getters: {
      playing: (state) => {
         if (state.sound.playing) {
            return state.sound.playing()
         }

         return false;
      }
   },
   persist: {
      storage: persistedState.sessionStorage,
   },
})
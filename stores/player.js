import { Howl } from "howler";

export default defineStore("player", {
   state: () => ({
      current_song: {},
      sound: {},
      seek: "00:00",
      duration: "00:00"
   }),
   actions: {
      async newSong(song) {
         this.current_song = song;

         this.sound = new Howl({
            src: [song.url],
            html5: true,
         });
         this.sound.play();

         this.sound.on("play", () => {
            requestAnimationFrame(this.progress);
         })

      },

      async toggleAudio() {
         if (!this.sound.playing) return

         if (this.sound.playing()) {
            this.sound.pause();
         } else {
            this.sound.play();
         }
      },

      async progress() {
         this.seek = this.sound.seek();
         this.duration = this.sound.duration();
         
         if (this.sound.playing()) {
            requestAnimationFrame(this.progress);
         }
      }
   },
   getters: {
      playing: (state) => {
         if (state.sound.playing) {
            return state.sound.playing()
         }

         return false;
      }
   }
})
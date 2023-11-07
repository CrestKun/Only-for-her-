new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "8 LETTERS",
          artist: "WHT DON'T WE",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "https://audio.jukehost.co.uk/ioXik2OhkpTKSlIALT9FNja7hWGjH2Lu",      
          url:
"https://youtu.be/C3DlM19x4RQ?si=YUMndxRLSviDOOUQ",
          favorited: false
        },
        {
          name: "Make It With You",
          artist: "Ben & Ben",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://audio.jukehost.co.uk/lLYG1gt95relH4VslTv3nlqByhAauZGl",
          url:
"https://youtu.be/B4HD6aC4Wos?si=vf-L9xs0Xv8tzdON",        
          favorited: true
        },
        {
          name: "Happier",
          artist: "Marshmello",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://audio.jukehost.co.uk/T0OF0eHPvjZqzuC8rv3HAJ1CzBEFfh6D",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Those Eyes",
          artist: "New West",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://audio.jukehost.co.uk/RSRaTVA4gUcLycBg3ydoXgbtGdaF6Lw0",
          url: "https://youtu.be/i9UDD6zyCGs?si=6pryfay7pNBFS1f1",
          favorited: false
        },
        {
          name: "Sunflower",
          artist: "Post Malone",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://audio.jukehost.co.uk/aLJOoWRUMKmwURQdLzTjCPGSBugRxnqd",
          url: "https://youtu.be/ApXoWvfEYVU?si=dtB5JFAlJjSgJ5yf",
          favorited: true
        },
        {
          name: "Dandelions",
          artist: "Ruth B.",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://audio.jukehost.co.uk/UgRtSsUq5iZzSc7N7tk2owF9o9yJVR7A",
          url: "https://youtu.be/W8a4sUabCUo?si=Z2xNPOT7MK7IrqlC",
          favorited: false
        },
        {
          name: "Style",
          artist: "Taylor Swift",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://audio.jukehost.co.uk/gA41qM2XNsQ1gGcC9pG19iGqOoAGJChs",
          url: "https://youtu.be/2JgvVfOfoWI?si=5daMI6vBevaNqDOk",
          favorited: true
        },
        {
          name: "Bad",
          artist: "Wave To Earth",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://audio.jukehost.co.uk/DKDAKWXCU6EskjCYtnvaMISDIWJJzeSi",
          url: "https://youtu.be/6Q5xqNkCk7w?si=vaa97qYPHiCMroQt",
          favorited: false
        },
        {
          name: "Seasons",
          artist: "Wave To Earth",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://audio.jukehost.co.uk/kMOx9fpNxhAbf9IOoHAatXGsfV6m66j0",
          url: "https://youtu.be/CnVVjLOGVoY?si=ucds0DCzlroJ9DDG",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});

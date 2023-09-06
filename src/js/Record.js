export default class Record {
    #element;
    constructor(element) {
      this.#element = element;
  
      this.idSetInterval;
      this.stream;
      this.recorder;
      this.popup;
      this.videoWindow;
  
      this.panelCheck;
    }
  
    #innerHtmlAudio() {
      return `
          <div class="panel-record invisible">
              <div class="record"></div>
              <div class="time-record">00:00</div>
              <div class="stop"></div>
          </div>
      `;
    }
  
    bindToDom() {
      const htmlAudio = this.#innerHtmlAudio();
      this.#element.insertAdjacentHTML("beforeend", htmlAudio);
  
      this.panelRecord = this.#element.querySelector(".panel-record");
      this.record = this.#element.querySelector(".record");
      this.timeRecord = this.#element.querySelector(".time-record");
      this.stop = this.#element.querySelector(".stop");
    }
  
    visiblePanelRecord() {
      this.panelRecord.classList.toggle("invisible");
    }
  
    stopwatch() {
      let startTime = Date.now(),
        diff,
        minutes,
        seconds;
      this.idSetInterval = setInterval(() => {
        diff = Date.now() - startTime;
        minutes = Math.floor(diff / 60000);
        seconds = Math.floor((diff % 60000) / 1000);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        this.timeRecord.textContent = minutes + ":" + seconds;
      }, 1000);
    }
  
    recordAudioAndVideo = async (audio = true, video = true) => {
      const constraints = {
        audio: audio,
        video: video,
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (this.popup) this.popup.remove();
          this.stream = stream;
          this.recorder = new MediaRecorder(this.stream);
  
          this.recorder.addEventListener("start", () => {
            console.log("start");
          });
  
          this.recorder.start();
          this.stopwatch();
          this.visiblePanelRecord();
          this.panelCheck.classList.toggle("invisible");
  
          if (video === true) {
            this.videoRecordingWindow();
            const video = this.videoWindow.querySelector("video");
            video.srcObject = stream;
  
            video.addEventListener("canplay", () => {
              video.play();
            });
          }
        })
        .catch((error) => {
          console.log("Ошибка:" + error.message);
          this.messageNotStrim();
          if (this.videoWindow) this.videoWindow.remove();
        });
    };
  
    messageNotStrim() {
      const popup = document.createElement("div");
      popup.textContent = "API недоступно, либо пользователь не выдал прав!";
      popup.style.cssText = `
        font-family:'Arial', sans-serif;
        font-size: 25px;
        text-align: center;
        line-height: 250%;
        color: red;
        position: absolute;
        width: 40%;
        min-height: 20%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2%;
        border: 1.5px solid red;
        border-radius: 15px;
        background-color: white;
        z-index: 1000;
      `;
      document.body.appendChild(popup);
      this.popup = popup;
    }
  
    videoRecordingWindow() {
      const videoWindow = document.createElement("div");
      videoWindow.innerHTML = `
        <div class="container-video">
          <video class="video-window" muted = true></video>
        </div>
      `;
      videoWindow.style.cssText = `
        position: absolute;
        width: 76%;
        height: 73.4%;
        top: 4.8%;
        left: 10%;
        padding: 2%;
        border: 1.5px solid rgb(62, 57, 57);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-color: white;
        z-index: 1000;
      `;
      document.body.appendChild(videoWindow);
      this.videoWindow = videoWindow;
    }
  }
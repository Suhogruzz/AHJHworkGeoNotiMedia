import FormGeolocation from "./Geolocation";
import Posts from "./Posts";
import Record from "./Record";
import Timeline from "./Timeline";
import { parseCoordinates } from "./parseCoordinates";

export default class Controller {
  #element;
  #timeLine;
  #formGeolocation;
  #record;
  constructor(element) {
    this.#element = element;
    this.#timeLine = new Timeline(this.#element);
    this.#timeLine.postsList = Posts.postsList;
    this.#timeLine.bindToDom();
    this.#formGeolocation = new FormGeolocation(this.#element);
    this.#formGeolocation.bindToDom();
    this.#record = new Record(this.#timeLine.inputPanel);
    this.#record.bindToDom();

    this.#record.panelCheck = this.#timeLine.panelCheck;

    this.#timeLine.inputPost.addEventListener("keydown", this.onKeydown);
  }

  onKeydown = (e) => {
    const target = e.target;
    if (e.keyCode === 13) {
      if (target.value === "") return;
      if (!e.ctrlKey) {
        e.preventDefault();
        this.#formGeolocation.getGeolocation((position) => {
          if (position) {
            console.log(position);
            Posts.addPost(this.#timeLine.inputPost.value, position);
            console.log(Posts.postsList);
            this.#timeLine.addPosts();
            target.value = "";
          } else {
            this.#formGeolocation.visibleFormGelocation();
          }
        });
      } else {
        e.preventDefault();
        const start = target.selectionStart;
        const end = target.selectionEnd;
        target.value =
          target.value.substring(0, start) + "\n" + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start + 1;
      }
    }
  };

  onClick = (e) => {
    const target = e.target;

    if (target.classList.contains("ok")) {
      const coordinates = parseCoordinates(this.#formGeolocation.input.value);
      if (coordinates) {
        if (this.#timeLine.inputPost.value !== "") {
          Posts.addPost(this.#timeLine.inputPost.value, coordinates);
          this.#timeLine.addPosts();
        }
        if (this.#timeLine.inputPost.value === "") {
          this.#record.recorder.stop();
          this.#record.stream.getTracks().forEach((track) => track.stop());
          this.#record.recorder.addEventListener("dataavailable", (event) => {
            Posts.addPost(event.data, coordinates);
            this.#timeLine.addPosts();
          });
        }
        this.#formGeolocation.invisibleFormGeolocation();
      } else {
        this.#formGeolocation.validation.classList.remove("invisible");
        this.#formGeolocation.input.value = "";
        return;
      }
      this.#formGeolocation.input.value = "";
      this.#timeLine.inputPost.value = "";
    }

    if (target.classList.contains("cancel")) {
      this.#formGeolocation.invisibleFormGeolocation();
      this.#formGeolocation.input.value = "";
    }

    if (target.classList.contains("audio-check")) {
      this.#timeLine.inputPost.value = "";
      if (this.#record.popap) this.#record.popap.remove();
      this.#record.recordAudioAndVideo(true, false);
    }

    if (target.classList.contains("video-check")) {
      this.#timeLine.inputPost.value = "";
      if (this.#record.popap) this.#record.popap.remove();
      this.#record.recordAudioAndVideo(true);
    }

    if (target.classList.contains("record")) {
      this.#timeLine.inputPost.value = "";
      this.#record.timeRecord.textContent = "00:00";
      clearInterval(this.#record.idSetInterval);
      this.#timeLine.visiblePanelCheck();
      this.#record.visiblePanelRecord();
      if (this.#record.videoWindow) this.#record.videoWindow.remove();

      this.#formGeolocation.getGeolocation((position) => {
        if (position) {
          console.log(position);
          this.#record.recorder.addEventListener("dataavailable", (event) => {
            console.log(event.data);
            Posts.addPost(event.data, position);
            console.log(Posts.postsList);
            this.#timeLine.addPosts();
          });
          this.#record.recorder.stop();
          this.#record.stream.getTracks().forEach((track) => track.stop());
        } else {
          this.#formGeolocation.visibleFormGelocation();
        }
      });
    }

    if (target.classList.contains("stop")) {
      this.#record.timeRecord.textContent = "00:00";
      clearInterval(this.#record.idSetInterval);
      this.#timeLine.visiblePanelCheck();
      this.#record.visiblePanelRecord();
      if (this.#record.videoWindow) this.#record.videoWindow.remove();

      this.#record.recorder.stop();
      this.#record.stream.getTracks().forEach((track) => track.stop());
    }
  };
}
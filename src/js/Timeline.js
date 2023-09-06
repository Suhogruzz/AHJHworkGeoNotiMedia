export default class Timeline {
    #element;
    constructor(element) {
      this.#element = element;
      this.postsList = null;
    }
  
    #innerHtmlTimeLine() {
      return `
          <div class="ruler"></div>
          <ul class="posts"></ul>
          <div class="input-panel">
              <textarea class="input-post" placeholder="Введите текст"></textarea>
              <div class="panel-check">
                <div class="audio-check"></div>
                <div class="video-check"></div>
              </div>
          </div>
      `;
    }
  
    bindToDom() {
      const timeLineHtml = this.#innerHtmlTimeLine();
      this.#element.insertAdjacentHTML("afterbegin", timeLineHtml);
  
      this.posts = this.#element.querySelector(".posts");
      this.inputPanel = this.#element.querySelector(".input-panel");
      this.inputPost = this.#element.querySelector(".input-post");
      this.panelCheck = this.#element.querySelector(".panel-check");
      this.audioCheck = this.#element.querySelector(".audio-check");
      this.videoCheck = this.#element.querySelector(".video-check");
  
      this.addPosts();
    }
  
    #removePosts() {
      [...this.posts.querySelectorAll(".post")].forEach((el) => el.remove());
    }
  
    #innerHtmlPost(objectPost) {
      let content = null;
      if (objectPost.text) {
        content = `<p class="content">${objectPost.text}</p>`;
      } else if (objectPost.audio) {
        content = `<audio class="audio" controls src="${URL.createObjectURL(
          objectPost.audio
        )}"></audio>`;
      } else if (objectPost.video) {
        content = `<div class="videoblock">
          <video class="video" controls src="${URL.createObjectURL(
            objectPost.video
          )}"></video>
        </div>`;
      }
  
      const html = `
          <li class="post">
              ${content}
              <div class="time">${objectPost.time}</div>
              <div class="geolocation">[${objectPost.geolocation.latitude}, ${objectPost.geolocation.longitude}]</div>
              <div class="geolocation-icon"></div>
              <div class="ruler-dot"></div>
          </li>
      `;
      return html;
    }
  
    addPosts() {
      this.#removePosts();
      if (this.postsList.length === 0) return;
      this.postsList.forEach((el) => {
        const postHtml = this.#innerHtmlPost(el);
        this.posts.insertAdjacentHTML("afterbegin", postHtml);
      });
    }
  
    visiblePanelCheck() {
      this.panelCheck.classList.toggle("invisible");
    }
  }
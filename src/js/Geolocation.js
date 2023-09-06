export default class FormGeolocation {
    #element;
    constructor(element) {
      this.#element = element;
    }
  
    #innerFormGelocation() {
      return `
          <form class="form-geolocation invisible">
              <label for="input-geolocation">
                  <p class="text-form">
                      Что-то пошло не так!<br><br>
                      К сожалению нам не удалось определить ваше местопложение.
                      Пожалуйста, дайте разрешение на использование геолокации,
                      либо введите координаты вручную.<br><br>
                      Широта и долгота через запятую
                  </p>
              </label>
              <input type="text" class="input-geolocation" id="input-geolocation">
              <p class="validation">-Неверный формат</p>
              <div class="control-form">
                  <div class="ok">Ок</div>
                  <div class="cancel">Отмена</div>
              </div>
          </form>
      `;
    }
  
    bindToDom() {
      const formHtml = this.#innerFormGelocation();
      this.#element.insertAdjacentHTML("beforeend", formHtml);
  
      this.form = this.#element.querySelector(".form-geolocation");
      this.input = this.#element.querySelector(".input-geolocation");
      this.ok = this.#element.querySelector(".ok");
      this.cancel = this.#element.querySelector(".cancel");
      this.validation = this.#element.querySelector(".validation");
  
      this.input.addEventListener("focus", this.onFocus);
    }
  
    getGeolocation(callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (data) {
            callback({
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
            });
          },
          function (err) {
            console.log(err);
            callback(null);
          },
          { enableHighAccuracy: true }
        );
      } else {
        return null;
      }
    }
  
    visibleFormGelocation() {
      this.form.classList.remove("invisible");
    }
  
    invisibleFormGeolocation() {
      this.form.classList.add("invisible");
    }
  
    onFocus = () => {
      this.validation.classList.add("invisible");
    };
  }
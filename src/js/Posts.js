import { formatDate } from "./formatDate";

export default class Posts {
  static postsList = [];

  static addPost(value, geolocation) {
    const time = formatDate(Date.now());
    let objectPost = null;
    if (typeof value === "string") {
      objectPost = {
        text: value,
        time: time,
        geolocation: geolocation,
      };
    }
    if (typeof value === "object") {
      if (value.type.includes("video")) {
        objectPost = {
          video: value,
          time: time,
          geolocation: geolocation,
        };
      }
      if (value.type.includes("audio")) {
        objectPost = {
          audio: value,
          time: time,
          geolocation: geolocation,
        };
      }
    }
    Posts.postsList.push(objectPost);
  }
}
export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const timelist = [day, month, year, hours, minutes];
    for (let item in timelist) {
      timelist[item] < 10
        ? (timelist[item] = `0${timelist[item]}`)
        : (timelist[item] = `${timelist[item]}`);
    }
    return `${timelist[0]}.${timelist[1]}.${timelist[2]} ${timelist[3]}:${timelist[4]}`;
  }
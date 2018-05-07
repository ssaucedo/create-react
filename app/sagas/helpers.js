
function later(time) {
  return new Promise(((resolve) => {
    setTimeout(resolve, time);
  }));
}

function delay(data) {
  return later(2500).then(() => data);
}

function shortDelay(data) {
    return later(250).then(() => data);
}

export default ({
  later,
  delay,
  shortDelay,
});

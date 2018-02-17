
function later(delay) {
  return new Promise(((resolve) => {
    setTimeout(resolve, delay);
  }));
}

function laterReturn(data) {
  return later(250).then(() => data);
}

export default ({
  later,
  laterReturn,
});

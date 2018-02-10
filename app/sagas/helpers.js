

function laterReturn (data) {
  return later(1000).then(() => data)
}

function later (delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}

export default ({
  later,
  laterReturn,
})
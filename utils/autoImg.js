function imageUtil(e) {
  let xMove = e.touches[1].clientX - e.touches[0].clientX;
  let yMove = e.touches[1].clientY - e.touches[0].clientY;
  let distance = Math.sqrt(xMove * xMove + yMove * yMove);
  console.log(distance);
}

module.exports = {
  imageUtil: imageUtil
}
const test = (err, req, res, next) => {
  console.log(5);
  next();
};

module.exports = {
  test,
};

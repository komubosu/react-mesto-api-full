const whitelist = ['http://localhost:3000'];

module.exports = (req, callback) => {
  let corsOptions;
  if (whitelist.includes(req.header('Origin'))) {
    corsOptions = {
      origin: true,
      credentials: true,
    };
  } else {
    corsOptions = {
      origin: false,
      credentials: true,
    };
  }
  callback(null, corsOptions);
};

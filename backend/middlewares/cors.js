const whitelist = ['https://komubosu.mesto.nomoredomains.club', 'http://komubosu.mesto.nomoredomains.club'];

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

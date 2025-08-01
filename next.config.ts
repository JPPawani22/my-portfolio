const path = require('path');

module.exports = {
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASSWORD,
  },
    sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

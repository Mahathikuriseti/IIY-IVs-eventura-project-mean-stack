const bcrypt = require("bcryptjs");

bcrypt.hash("organizer123", 10).then((hash) => {
  console.log(hash);
});

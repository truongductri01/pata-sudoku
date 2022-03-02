const express = require("express");
const bcrypt = require("bcrypt");
const { hasUserWithUsername, addUserQuery } = require("../create_test_data");
const router = express.Router();
const saltRounds = 10;

router.post("/register", (req, res) => {
  const body = req.body;
  const { username, password, name } = body;

  if (username && password && name) {
    hasUserWithUsername(username).then((poolRes) => {
      if (poolRes.rowCount == 0) {
        // no existing user with the same username
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            addUserQuery(name, "", [], salt, body.username, hash)
              .then((poolRes) => {
                const user = poolRes.rows[0];
                res.send({
                  id: user.id,
                  name: user.name,
                  gamesId: user.gamesid,
                  email: user.email,
                });
              })
              .catch((e) => res.status(400).send(e));
          });
        });
      } else {
        res.status(400).send("Username existed");
      }
    });
  } else {
    res.status(400).send("Missing either username or password or name");
  }
});

router.post("/login", (req, res) => {
  const body = req.body;
  const { username, password } = body;
  if (username && password) {
    hasUserWithUsername(username).then((poolRes) => {
      if (poolRes.rowCount == 1) {
        const user = poolRes.rows[0];
        bcrypt.compare(password, user.hash).then((match) => {
          if (match) {
            res.send({
              id: user.id,
              name: user.name,
              gamesId: user.gamesid,
              email: user.email,
            });
          } else {
            res.status(401).send();
          }
        });
      } else {
        res.status(401).send();
      }
    });
  } else {
    res.status(400).send("Missing either username or password");
  }
});

module.exports = router;

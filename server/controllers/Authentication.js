'use strict';

var utils = require('../utils/writer.js');
var Authentication = require('../service/AuthenticationService');

module.exports.apiLoginPOST = function apiLoginPOST (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  Authentication.getUserByEmail(email)
        .then((user) => {
            if (user === undefined) {
                utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Invalid e-mail' }],}, 404);
            } else {
                if (!Authentication.checkPassword(user, password)) {
                  utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Wrong password' }],}, 401);
                } else {
                    const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, { expiresIn: expireTime });
                    res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000 * expireTime });
                    res.json({ 
                      id: user.id,
                      name: user.name,
                      surname: user.surname,
                      email: user.email
                    });
                }
            }
        }).catch(
            // Delay response when wrong user/pass is sent to avoid fast guessing attempts
            (err) => {
                new Promise((resolve) => { setTimeout(resolve, 1000) }).then(() => res.status(401).json(authErrorObj))
            }
        );
};

module.exports.apiLogoutPOST = function apiLogoutPOST (req, res) {
  res.clearCookie('token').end();
};

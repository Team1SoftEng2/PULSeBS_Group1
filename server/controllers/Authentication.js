'use strict';

//-----------------------------------------------------------------------------------------------
//@todo fix auth propagation to controller from index

const jsonwebtoken = require('jsonwebtoken');
var jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const authErrorObj = { errors: [{ 'param': 'Server', 'msg': 'Authorization error' }] };
const expireTime = 400; //seconds

//--------------------------------------------------------------------------------------------
var utils = require('../utils/writer.js');
var Authentication = require('../service/AuthenticationService');

module.exports.apiLoginPOST = function apiLoginPOST (req, res) {
  const id = req.body.id;
  const password = req.body.password;

  Authentication.getUserById(id)
        .then((user) => {
            if (user === undefined) {
                utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Invalid id' }],}, 404);
            } else {
                if (!Authentication.checkPassword(user, password)) {
                  utils.writeJson(res, {errors: [{ 'param': 'Server', 'msg': 'Wrong password' }],}, 401);
                } else {
                    const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, { expiresIn: expireTime });
                    res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000 * expireTime });
                    res.json({ 
                      userId: user.userId,
                      name: user.name,
                      surname: user.surname,
                      email: user.email
                    });
                }
            }
        }).catch(
            // Delay response when wrong user/pass is sent to avoid fast guessing attempts
            (err) => {
                new Promise((resolve) => { setTimeout(resolve, 1000) }).then(() => res.status(401).json(auth.authErrorObj))
            }
        );
};

module.exports.apiLogoutPOST = function apiLogoutPOST (req, res) {
  res.clearCookie('token').end();
};

// module.exports.apiUserGET = function(req, res) {
//   console.log(req);
//   const id = req.user && req.user.user;
//   Authentication.getUserById(id)
//     .then( (user) => {
//         utils.writeJson(
//           { 
//             userId: user.userId,
//             name: user.name,
//             surname: user.surname,
//             email: user.email
//           }, { 'msg': 'OK'}, 200);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, {errors: [{'msg': 'Internal Server Error' }],}, 500);
//     });
// }
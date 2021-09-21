const { response } = require("express");

const userGet = (req, res = response) => {
  res.json({
    msg: "GET /api - Controller",
  });
};

const userPost = (req, res = response) => {
  const { nombre, edad} = req.body;

  res.json({
    msg: "POST /api - Controller",
    nombre,
    edad
  });
};

const userPut = (req, res = response) => {
  res.json({
    msg: "PUT /api - Controller",
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "DELETE /api - Controller",
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "PATCH /api - Controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
};

const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const userGet = async (req, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Grabar
  await usuario.save();

  res.json({
    usuario,
  });
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, correo, google, ...resto } = req.body;

  //Encriptar la contraseña
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario,
  });
};

const userDelete = async(req, res = response) => {

  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false}, {new: true})
  res.json(usuario);
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

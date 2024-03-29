const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

//Verificar que el correo existe
const emailExiste = async (correo) => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) throw new Error("EL correo ya existe en la BD")
};

const idExiste = async (id) => {
  const existeID = await Usuario.findById(id);
  if (!existeID) throw new Error("EL ID no existe en la BD")
};

module.exports = {
  esRolValido,
  emailExiste,
  idExiste
};

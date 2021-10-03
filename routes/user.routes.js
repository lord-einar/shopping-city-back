const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, idExiste } = require("../helpers/db-validators");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
  userPatch,
} = require("../controllers/user.controller");

router.get("/", userGet);

router.post("/", [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("password", "El password debe ser de mas de 6 letras").isLength({ min:6 }),
  check("correo", "El correo no tiene un formato válido").isEmail(),
  check("correo").custom( emailExiste ),
  check("rol").custom( esRolValido ),
  validarCampos
] , userPost);

router.put("/:id",[
  check("id", "No es un ID valido").isMongoId(),
  check('id').custom(idExiste),
  validarCampos
], userPut);

router.delete("/:id", [
  check("id", "No es un ID valido").isMongoId(),
  check('id').custom(idExiste),
  validarCampos
],  userDelete);

router.patch("/", userPatch);

module.exports = router;

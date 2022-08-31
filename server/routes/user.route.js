const {
  registerUser,
  loginUser,
  userData,
  getAllUsers,
} = require("../controllers/user.controller");
const router = require("express").Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/userdata", userData);
router.get("/getallusers", getAllUsers);
module.exports = router;

const { Router } = require("express");
const { getUser, updateUser, getUsers, deleteUser, createUser } = require("../controllers/users");

const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.post("/", createUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  create,
  getAllActivts,
  getOneActivty,
  removeActivity,
  updateActivty,
} = require("../controllers/RoutesController");
// const { requireLogin } = require("../controllers/authController")

router.get("/dashboard", getAllActivts); //เรียกใช้ function ใน controller เพื่อเรียกดูทุกข้อมูล
router.get("/edit/:id", getOneActivty); //เรียกใช้ function ใน controller เพื่อเรียกดู 1 ข้อมูล
router.post("/create", create); //เรียกใช้ function ใน controller เพื่อสร้างข้อมูล
router.put("/edit/:id", updateActivty); //เรียกใช้ function ใน controller เพื่อแก้ไขข้อมูล
router.delete("/dashboard/:id", removeActivity); //เรียกใช้ function ใน controller เพื่อลบข้อมูล

module.exports = router;

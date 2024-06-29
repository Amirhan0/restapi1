const express = require("express");
const router = express.Router();

const {
  postItem,
  deleteItem,
  putItem,
} = require("../controllers/base-controller");

router.post("/api/items", postItem);
router.delete("/api/items/:id", deleteItem);
router.put("/api/items/:id", putItem);

module.exports = router;

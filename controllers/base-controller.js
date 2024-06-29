const Base = require("../models/bases");
//POST запрос
const postItem = async (req, res) => {
  const { name, position } = req.body;
  if (!name || !position) {
    return res.status(400).json({ error: "Name and position are required" });
  }

  try {
    const newItem = new Base({ name, position });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// DELETE ЗАПРОС
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Base.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send("Item not found");
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

//PUT запрос
const putItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedItem = await Base.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  putItem,
  deleteItem,
  postItem,
};

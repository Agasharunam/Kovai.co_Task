const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../drivespace');

if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

exports.createFolder = (req, res) => {
  const { folderName } = req.body;
  if (!folderName) return res.status(400).send("Folder name required");

  const folderPath = path.join(BASE_DIR, folderName);

  if (fs.existsSync(folderPath)) {
    return res.status(400).send("Folder already exists");
  }

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Mkdir Error:", err);
      return res.status(500).send("Error creating folder");
    }
    res.send(`Folder '${folderName}' created`);
  });
};

exports.readFolder = (req, res) => {
  if (!fs.existsSync(BASE_DIR)) {
    return res.status(404).send("Base directory not found");
  }

  fs.readdir(BASE_DIR, { withFileTypes: true }, (err, items) => {
    if (err) return res.status(500).send("Error reading directory");

    const folders = items
      .filter((item) => item.isDirectory())
      .map((dir) => dir.name);

    res.json({ folders });
  });
};


exports.renameFolder = (req, res) => {
  const { oldName, newName } = req.body;
  if (!oldName || !newName) return res.status(400).send("Both old and new folder names are required");

  const oldPath = path.join(BASE_DIR, oldName);
  const newPath = path.join(BASE_DIR, newName);

  if (!fs.existsSync(oldPath)) return res.status(404).send("Old folder not found");

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Rename Error:", err);
      return res.status(500).send("Error renaming folder");
    }
    res.send(`Folder renamed to '${newName}'`);
  });
};

exports.deleteFolder = (req, res) => {
  const folderPath = path.join(BASE_DIR, req.params.folderName);

  if (!fs.existsSync(folderPath)) return res.status(404).send("Folder not found");

  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).send("Error deleting folder");
    }
    res.send(`Folder '${req.params.folderName}' deleted`);
  });
};

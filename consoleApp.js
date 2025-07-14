const fs = require("fs");
const path = require("path");
const readline = require("readline");

const BASE_DIR = path.join(__dirname, "./drivespace");

if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function createFolder() {
  const folderName = await prompt("Enter folder name to create: ");
  const folderPath = path.join(BASE_DIR, folderName);

  if (fs.existsSync(folderPath)) {
    console.log(" Folder already exists.");
  } else {
    fs.mkdir(folderPath, (err) => {
      if (err) console.log(" Error creating folder.");
      else console.log(` Folder '${folderName}' created.`);
    });
  }
}

async function readFolder() {
  if (!fs.existsSync(BASE_DIR)) {
    console.log(" Base directory not found.");
    return;
  }

  fs.readdir(BASE_DIR, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.log(" Error reading directory.");
    } else {
      const folders = items
        .filter((item) => item.isDirectory())
        .map((dir) => dir.name);

      if (folders.length === 0) {
        console.log(" No folders found in 'drivespace'.");
      } else {
        console.log(" Folders in 'drivespace':");
        folders.forEach((folder) => console.log(" -", folder));
      }
    }
  });
}


async function renameFolder() {
  const oldName = await prompt("Enter current folder name: ");
  const newName = await prompt("Enter new folder name: ");

  const oldPath = path.join(BASE_DIR, oldName);
  const newPath = path.join(BASE_DIR, newName);

  if (!fs.existsSync(oldPath)) {
    console.log(" Folder does not exist.");
    return;
  }

  fs.rename(oldPath, newPath, (err) => {
    if (err) console.log(" Error renaming folder.");
    else console.log(` Folder renamed to '${newName}'.`);
  });
}

async function deleteFolder() {
  const folderName = await prompt("Enter folder name to delete: ");
  const folderPath = path.join(BASE_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(" Folder not found.");
    return;
  }

  fs.rmdir(folderPath, { recursive: true }, (err) => {
    if (err) console.log(" Error deleting folder.");
    else console.log(` Folder '${folderName}' deleted.`);
  });
}

async function main() {
  console.log("\n Local Folder CRUD Console\n");
  while (true) {
    console.log("\nOptions:");
    console.log("1. Create Folder");
    console.log("2. Read Folder");
    console.log("3. Rename Folder");
    console.log("4. Delete Folder");
    console.log("5. Exit");

    const choice = await prompt("Select an option (1-5): ");
    switch (choice) {
      case "1":
        await createFolder();
        break;
      case "2":
        await readFolder();
        break;
      case "3":
        await renameFolder();
        break;
      case "4":
        await deleteFolder();
        break;
      case "5":
        rl.close();
        return;
      default:
        console.log("Invalid option. Try again.");
    }
  }
}

main();

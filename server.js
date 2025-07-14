const express = require('express');
const app = express();
const folderRoutes = require('./routes/folderRoutes');
const PORT = 5000;

app.use(express.json());
app.use('/api/folders', folderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

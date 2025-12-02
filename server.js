const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");
const app = express();
const PORT = 3000;

// middleware to read JSON
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html

app.post("/save-data", (req, res) => {
  const filePath = path.join(__dirname, "database.xlsx");

  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets["Data"];
    var data = XLSX.utils.sheet_to_json(worksheet);
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    var data = [];
  }

  data.push(req.body);
  worksheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets["Data"] = worksheet;

  XLSX.writeFile(workbook, filePath);

  res.json({ message: "Data saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/fires", async (req, res) => {
  const url = "https://effis.jrc.ec.europa.eu/arcgis/rest/services/public/ActiveFires/MapServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fire data." });
  }
});

app.get("/floods", async (req, res) => {
  const url = "https://www.gdacs.org/gdacsapi/api/events/geteventlist/MAP?eventtype=FL";
  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch flood data." });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
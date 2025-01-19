var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path to the JSON file
const DATA_FILE = path.join(__dirname, 'data.json');

// Ensure the file exists, if not, create an empty JSON array
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}



router.get('/latest', function(req, res, next) {
    try {
        // Read existing data from the JSON file
        const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        // If there's data, return the latest item
        if (existingData.length > 0) {
            const latestItem = existingData[existingData.length - 1]; // Last item in the array
            res.status(200).json(latestItem);
        } else {
            res.status(404).json({ message: 'No data found.' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data.' });
    }
});
/* GET home page. */
router.get('/read', function (req, res, next) {
    const DATA_FILE = path.join(__dirname, 'data.json');
// Ensure the file exists, if not, create an empty JSON array
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    console.log("read")
    res.status(200).json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
});

/* POST webhook endpoint. */
router.post('/create', function (req, res, next) {
    try {
        const incomingData = req.body; // Data sent by Shiftr
        console.log(incomingData)
        // Read existing data from the JSON file
        // Add an ID and timestamp to the incoming data
        const enrichedData = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            ...incomingData
        };

        // Read existing data from the JSON file
        const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        // Add new data to the existing data array
        existingData.push(enrichedData);

        // Save updated data back to the file
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

        console.log('Data saved:', incomingData);

        res.status(200).json({message: 'Data received and saved successfully!'});
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({error: 'Failed to save data.'});
    }
});

module.exports = router;
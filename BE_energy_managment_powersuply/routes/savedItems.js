var express = require('express');
var router = express.Router();

var path = require('path');
const fs = require("fs");

const { v4: uuidv4 } = require('uuid');


/* GET users listing. */
router.get('/read', function (req, res, next) {
// Path to the JSON file
  const DATA_FILE = path.join(__dirname, 'savedItems.json');

// Ensure the file exists, if not, create an empty JSON array
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }

    res.json(JSON.parse( fs.readFileSync(DATA_FILE, 'utf8')));
});

router.post('/post', function (req, res, next) {
// Path to the JSON file


  try {
    const incomingData = req.body; // Data sent by Shiftr
    console.log(incomingData)
    const enrichedData = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...incomingData
    };

    const DATA_FILE = path.join(__dirname, 'savedItems.json');

    // Read existing data from the JSON file
    const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // Add new data to the existing data array
    existingData.push(enrichedData);


    // Save updated data back to the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    console.log('Data saved:', incomingData);

    res.status(200).json({ message: 'Data received and saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

// DELETE request to remove an item by id
router.delete('/delete/:id', function (req, res, next) {
  const itemId = req.params.id;
  const DATA_FILE = path.join(__dirname, 'savedItems.json');

  try {
    // Read existing data from the JSON file
    const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // Filter out the item by its id
    const updatedData = existingData.filter(item => item.id !== itemId);

    // If the item was not found, respond with an error
    if (existingData.length === updatedData.length) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Save the updated data back to the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));

    console.log('Data deleted:', itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Failed to delete data.' });
  }
});

// PUT request to update an item by id
router.put('/update/:id', function (req, res, next) {
  const itemId = req.params.id;
  const updatedData = req.body; // The updated data sent in the request
  const DATA_FILE = path.join(__dirname, 'savedItems.json');

  try {
    // Read existing data from the JSON file
    const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // Find the index of the item to be updated
    const index = existingData.findIndex(item => item.id === itemId);

    // If the item is not found, respond with an error
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Update the item with the new data
    existingData[index] = { ...existingData[index], ...updatedData };

    // Save the updated data back to the file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    console.log('Data updated:', itemId);
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data.' });
  }
});


module.exports = router;

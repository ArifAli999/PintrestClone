const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { object } = require("firebase-functions/v1/storage");
admin.initializeApp();
const db = admin.firestore();

const dbKey = '2wDJIAuQkhUiyG1cFI2N9WCowPz2';

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    var test;
    const writeResult = admin.firestore().collection('users').doc(`${dbKey}`)

    const collections = await writeResult.listCollections();
    collections.forEach(collection => {
        console.log('Found subcollection with id:', collection.id);
        test = collection.id;
    });
    // Send back a message that we've successfully written the message
    //res.json({ result: `Message with ID: ${test} added.` });
});
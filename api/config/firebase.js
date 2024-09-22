require("dotenv").config();
const firebase = require("firebase/app");
const admin = require('firebase-admin');

const serviceAccount = require("../../FirebaseService.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
    admin,
    db
};

const firebase = require("firebase");
const firebaseAdmin = require("firebase-admin");

firebase.initializeApp({
    apiKey: "AIzaSyDyCHSwclEEZXH4VsT3kA7K6fnitxBpo2I",
    authDomain: "security-rules-issue.firebaseapp.com",
    databaseURL: "https://security-rules-issue.firebaseio.com",
    projectId: "security-rules-issue",
    storageBucket: "security-rules-issue.appspot.com",
    messagingSenderId: "937934667653"
});

const serviceAccount = require('./security-rules-issue-firebase-adminsdk-255gh-3e72ac51af.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://security-rules-issue.firebaseio.com",
});

async function main() {
    const token = await firebaseAdmin.auth().createCustomToken("4rtL2Ku6NITsJ7GlS6O8NLsgCdQ2", {
        accountIds: [
            123456
        ]
    });
    await firebase.auth().signInWithCustomToken(token);
    try {
        await firebase.firestore().collection("chats").get();
        console.log("SUCCESS: Allow to read collection");
    } catch (e) {
        console.log("ERROR: Can not read collection");
    }
    try {
        await firebase.firestore().collection("chats").doc("qLk31C5wffSDFnTyahk7").get();
        console.log("SUCCESS: Allow to read single document");
    } catch (e) {
        console.log("ERROR: Can not read single document");
    }
}

main().then(
    () => process.exit(0),
    (e) => {
        console.error(e);
        process.exit(1);
    }
);
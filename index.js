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
    const accountId = 123456;
    // 1. Initialize custom token
    const token = await firebaseAdmin.auth().createCustomToken("4rtL2Ku6NITsJ7GlS6O8NLsgCdQ2", {
        accountIds: [
            accountId
        ]
    });
    // 2. Sign in with custom token
    await firebase.auth().signInWithCustomToken(token);
    // 3. Try to read collection "chats" (actually, collection contains single document)
    try {
        await firebase.firestore().collection("chats").where("bot.gcAccount.id", "==", accountId).get();
        console.log("CHATS1: SUCCESS: Allow to read collection");
    } catch (e) {
        console.log("CHATS1: ERROR: Can not read collection:", e.code);
    }
    // 4. Try to read single document from "chats"
    try {
        await firebase.firestore().collection("chats").doc("qLk31C5wffSDFnTyahk7").get();
        console.log("CHATS1: SUCCESS: Allow to read single document");
    } catch (e) {
        console.log("CHATS1: ERROR: Can not read single document");
    }
    // 5. Try to read collection "chats2" (actually, collection contains single document)
    try {
        await firebase.firestore().collection("chats2").where("gcAccountId", "==", accountId).get();
        console.log("CHATS2: SUCCESS: Allow to read collection");
    } catch (e) {
        console.log("CHATS2: ERROR: Can not read collection:", e.code);
    }
    // 6. Try to read single document from "chats2"
    try {
        await firebase.firestore().collection("chats2").doc("HBgkG8r88rgwzkPNkX40").get();
        console.log("CHATS2: SUCCESS: Allow to read single document");
    } catch (e) {
        console.log("CHATS2: ERROR: Can not read single document");
    }
}

main().then(
    () => process.exit(0),
    (e) => {
        console.error(e);
        process.exit(1);
    }
);
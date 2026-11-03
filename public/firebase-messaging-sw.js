importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyDeH8SssDLeu5Ggbj8toClBq2zGE-6Ku-c",
    authDomain: "nehdo-23bd4.firebaseapp.com",
    projectId: "nehdo-23bd4",
    storageBucket: "nehdo-23bd4.firebasestorage.app",
    messagingSenderId: "784435496062",
    appId: "1:784435496062:web:c50536275ff566ea93442f"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background message:", payload);

    const title = payload.notification?.title || "New Notification";

    self.registration.showNotification(title, {
        body: payload.notification?.body || "",
        icon: "/favicon.ico",
    });
});
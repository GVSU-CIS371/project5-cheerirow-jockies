import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-50lEEx9wezr09LY6UvV9HdPR5e3HVWc",
  authDomain: "project-5-firestore.firebaseapp.com",
  projectId: "project-5-firestore",
  storageBucket: "project-5-firestore.firebasestorage.app",
  messagingSenderId: "665480537522",
  appId: "1:665480537522:web:984e208b4a042b3b6f70ab",
  measurementId: "G-77YDD9XE03"
};

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});

const pinia = createPinia();
const firebase: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(firebase);
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");

export{ db }


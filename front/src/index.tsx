import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD47kBh1jKiwVvXsxTENE41qTzZLRQJdgI",
  authDomain: "react-blog-project-a6934.firebaseapp.com",
  projectId: "react-blog-project-a6934",
  storageBucket: "react-blog-project-a6934.appspot.com",
  messagingSenderId: "690805926997",
  appId: "1:690805926997:web:170293da40bc62b4e2b8dc"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

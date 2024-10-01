import './style.css';  // Belangrijk om Tailwind CSS te laden
import App from './App.svelte';

const app = new App({
    target: document.getElementById('app')
});

export default app;
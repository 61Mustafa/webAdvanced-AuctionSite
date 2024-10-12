import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,svelte,js}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        forms,
    ],
}

/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
    // content: ['./**/*.{html,js}'],
    content: ['./*.{html,js}'],
    theme: {
        extend: {
            colors: {
                'energy-yellow': {
                    50: '#fdfce9',
                    100: '#fbf9c6',
                    200: '#f9ef8f',
                    300: '#f5df4d',
                    400: '#f0cc1f',
                    500: '#e0b412',
                    600: '#c18c0d',
                    700: '#9a650e',
                    800: '#805013',
                    900: '#6d4116',
                },
                geyser: {
                    50: '#f5f8f7',
                    100: '#d7e4e3',
                    200: '#bdd2d1',
                    300: '#94b4b3',
                    400: '#6e9293',
                    500: '#537879',
                    600: '#415f60',
                    700: '#374d4e',
                    800: '#2f3f40',
                    900: '#2a3637',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

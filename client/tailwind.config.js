/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-logo": "0px 0px 4px 1px ",
        "post-card": "0px 5px 20px -13px, 0px -5px 20px -13px, 5px 0px 20px -13px , -5px 0px 20px -13px",
        "post-card-hover": "0px 5px 20px -9px, 0px -5px 20px -9px, 5px 0px 20px -9px , -5px 0px 20px -9px"
      },
    },
  },
  plugins: [],
};

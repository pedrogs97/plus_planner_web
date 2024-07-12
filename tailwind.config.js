/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'
import daisyui from 'daisyui'

export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Inter var', ..._fontFamily.sans],
        },
      },
      colors: {
        "tango-50": "#FEF7EE",
        "tango-100": "#FDEDD7",
        "tango-200": "#F9D7AF",
        "tango-300": "#F5B97C",
        "tango-400": "#F09247",
        "tango-500": "#ED7829",
        "tango-600": "#DE5B18",
        "tango-700": "#B84416",
        "orient-50": "#E8FEFF",
        "orient-100": "#C5FEFF",
        "orient-300": "#47FAFF",
        "orient-400": "#00EDFF",
        "orient-500": "#00CFFF",
        "orient-700": "#0080AC",
        "orient-800": "#006184",
        "orient-900": "#055374",
      },
    },
    plugins: [daisyui,],
    daisyui: {
      themes: false,
      colors: {
        "tango-50": "#FEF7EE",
        "tango-100": "#FDEDD7",
        "tango-200": "#F9D7AF",
        "tango-300": "#F5B97C",
        "tango-400": "#F09247",
        "tango-500": "#ED7829",
        "tango-600": "#DE5B18",
        "tango-700": "#B84416",
        "orient-50": "#E8FEFF",
        "orient-100": "#C5FEFF",
        "orient-300": "#47FAFF",
        "orient-400": "#00EDFF",
        "orient-500": "#00CFFF",
        "orient-700": "#0080AC",
        "orient-800": "#006184",
        "orient-900": "#055374",
      },
    },
  }
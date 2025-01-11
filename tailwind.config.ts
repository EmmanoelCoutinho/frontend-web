import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px', // Small screens (phones)
      md: '768px', // Medium screens (tablets)
      lg: '1024px', // Large screens (desktops)
      xl: '1280px', // Extra large screens (large desktops)
      '2xl': '1536px', // 2X large screens
    },
  },
  plugins: [],
};
export default config;

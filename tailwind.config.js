/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black33: '#333333',
        black017: '#00000017',
        redCustomize: '#ff424e',
        orangeCustomize: '#ee4d2d',
        grayCustomize: '#999',
        blueCustomize: '#08f',
        greenCustomize: '#00bfa5',
        whiteCustomize: 'rgb(255, 255, 255)',
        blackBoxShadowCustomize: 'rgb(0 0 0 / 12%) 0px 2px 12px'
      },
      fontFamily: {
        dm: ['"DM Sans"', ' sans-serif']
      },
      backgroundImage: {
        linearfef5: 'linear-gradient(0, #fe6433, #f53e2d)',
        linearOrange: 'linear-gradient(-180deg,#f53d2d,#f63)'
      },
      screens: {
        max5se: { max: '320.98px' },
        maxsm: { max: '768.98px' }
      }
    }
  },
  plugins: []
}

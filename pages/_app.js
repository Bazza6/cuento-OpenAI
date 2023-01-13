import '../styles/global.css'
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { MenuList, MenuListItem, Separator, styleReset } from 'react95';
// pick a theme of your choice
import original from 'react95/dist/themes/original';

//import localFont from '@next/font/local'

// Font files can be colocated inside of `pages`
// const ms_sans_serif = localFont({ src: './font/ms_sans_serif.woff' })






// original Windows95 font (optionally)
// import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

// const GlobalStyles = createGlobalStyle`
//   ${styleReset}
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif}') format('woff2');
//     font-weight: 400;
//     font-style: normal
//   }
//   @font-face {
//     font-family: 'ms_sans_serif';
//     src: url('${ms_sans_serif}') format('woff2');
//     font-weight: bold;
//     font-style: normal 
//   }
//   body {
//     font-family: 'ms_sans_serif';
//   }
// `;



function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider theme={original}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default MyApp
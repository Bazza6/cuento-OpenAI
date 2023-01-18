import '../styles/global.css'
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useState } from "react";
import styled from 'styled-components';

import { Select, Window } from 'react95';
// pick a theme of your choice
import original from 'react95/dist/themes/original';
import modernDark from 'react95/dist/themes/modernDark';



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

  const [theme, setTheme] = useState(original)
  const options = [{ value: original, label: 'LIGHT 💡' }, { value: modernDark, label: 'DARK' }]

  const handleTypeSelect = e => {
    setTheme(e.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Window style={{ width: '100%', minHeight: '100vh', height: '100%' }}>
        <div id='default-selects'>
          <Select
            // defaultValue={1}
            options={options}
            menuMaxHeight={160}
            width={160}
            onChange={handleTypeSelect}

            onOpen={e => console.log('open', e)}
            onClose={e => console.log('close', e)}
            onBlur={e => console.log('blur', e)}
            onFocus={e => console.log('focus', e)}
          />
        </div>
        <Component {...pageProps} />
      </Window>
    </ThemeProvider>
  )
}

export default MyApp
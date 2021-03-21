import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/styles/GlobalStyles';
import theme from './lib/theme';
import routes from './routes';
import LoadingLogo from './components/loading/LoadingLogo';

const App = () => {
  const routing = useRoutes(routes);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline/> */}
      <LoadingLogo />
      <GlobalStyles />
      {start === true ? routing : null}
    </ThemeProvider>
  );
};

export default App;

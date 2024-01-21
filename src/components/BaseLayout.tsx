import { useEffect, useState } from 'react';
import Style from './BaseLayout.module.scss';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Chat from './chat/Chat';
import { Route, Routes } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Login from './form/Login';
import Signup from './form/Signup';
import OtpPage from './form/OtpPage';
import NotFound from './error/NotFound';
import { useDispatch } from 'react-redux';
import { themeActions } from '../store/theme-slice';

export default function BaseLayout(): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleToggleDarkMode() {
    const oppositeOfCurrentDarkMode = !darkMode;
    console.log(oppositeOfCurrentDarkMode);
    localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`);
    setDarkMode(oppositeOfCurrentDarkMode);
    
    dispatch(themeActions.setDarkmode(oppositeOfCurrentDarkMode));
  }

  useEffect(() => {
    const detectedDarkMode = localStorage.getItem('darkMode');
    if (detectedDarkMode) {
      setDarkMode(detectedDarkMode === 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }, []);

  return (
    <Box className={darkMode ? Style.dark : Style.light}>
      <Grid container display={'flex'} flexDirection={'column'} minHeight={'100vh'} justifyContent={'space-between'}>
        
        <Grid item>
          <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} />
        </Grid>
        
        <Grid item flexGrow={1}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/chat'} element={<Chat darkMode={darkMode} />} />
            <Route path={'/login'} element={<Login darkMode={darkMode} />} />
            <Route path={'/signup'} element={<Signup darkMode={darkMode} />} />
            <Route path={'/otp'} element={<OtpPage darkMode={darkMode} />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Grid>

        <Grid item>
          <Box component={'footer'} display={'flex'} flexDirection={'column'} alignItems={'center'} py={'1.5rem'} sx={{ opacity: 0.7 , fontSize: '10px' }} width={'100%'}>
            <p>
              All rights reserved <a href={'https://github.com/Rahman1712'} style={{textDecoration: 'underline'}}>AR Works by <span style={{fontWeight: 'bold'}}>Abdul Rahman</span> </a>
            </p>
            <p>&copy; 2024</p>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}
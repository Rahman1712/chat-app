import { Box } from "@mui/material";
import { info } from "../../info/Info";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../../store/theme-slice";

const NotFound = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeActions.setNavLink("notfound"));

    return () => {
      dispatch(themeActions.setNavLink("home"));
    }
  }, []);

  return (
    <Box
      component={'main'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'calc(100vh - 175px)'}>

      <h1 style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      className="text-6xl"
      >404 Not Found</h1>
      <p style={{ fontSize: '15px', background: 'linear-gradient(to right, rgb(40, 82, 112), rgb(26, 54, 74))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sorry, the page you are looking for does not exist.</p>

    </Box>
  );
};

export default NotFound;

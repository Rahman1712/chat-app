import Style from './Home.module.scss';
import { Box, Button} from "@mui/material";
import { info } from "../../info/Info";
import { useLottie } from "lottie-react";
import chatLottie from "../../lottie/chat.json";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../model/slice-types';
import { useEffect } from 'react';
import { themeActions } from '../../store/theme-slice';

const style = {
   height: 300,
};

export default function Home() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isLoggedIn } = useSelector((state: { auth: AuthState }) => state.auth);

   const options = {
      animationData: chatLottie,
      loop: true,
      autoplay: true,
   };

   const { View } = useLottie(options, style);
   
   useEffect(() => {
      dispatch(themeActions.setNavLink("home"));
   },[]);

   return (
      <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
         justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>

         <div>{View}</div>

         <Box>
            <h1 className='text-4xl font-bold'>Hi, I'm <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{info.appName}</span><span className={Style.hand}>🤚</span>
            </h1>
            <h2 className='text-2xl font-bold'>I'm {info.position}.</h2>

            <Box sx={{ mt: 2, width: '75%' }}>
               <Button
                  variant="outlined"
                  color="info"
                  sx={{
                     backgroundImage: 'linear-gradient(to right, rgb(105, 182, 255), rgb(192, 150, 255))',
                     borderColor: 'transparent',
                     color: '#FFF',
                     '&:hover': {
                        backgroundImage: 'none',
                        borderColor: 'linear-gradient(to right, rgb(105, 182, 255), rgb(192, 150, 255))',
                        backgroundColor: '#FFF',
                        color: '#1A364A',
                     },
                  }}
                  onClick={() => {navigate(isLoggedIn ? "/chat": "/login")}}
               >
                  let's start &nbsp; <KeyboardArrowRightIcon />
               </Button>
            </Box>

         </Box>
      </Box>
   )
}
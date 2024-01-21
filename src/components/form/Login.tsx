import { Box, Button, FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import Lottie from "lottie-react";
import loginLottie from "../../lottie/login.json";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ThreeDots } from 'react-loader-spinner'
import axiosApi from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth-slice";
import PopupToast from "../../utils/PopupToast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { themeActions } from "../../store/theme-slice";

interface LoginProps {
  darkMode: boolean;
}

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ darkMode }) => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: ""
  });

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const loginHandle = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedFormData: FormData = {
      username: formData.username.trim(),
      password: formData.password.trim()
    };

    if (!trimmedFormData.username || !trimmedFormData.password) {
      PopupToast("error", "Username and password cannot be empty.", 3000);
      return;
    }

    try {
      const response = await axiosApi.post("/api/v1/auth/authenticate", trimmedFormData);
      const responseData = response.data;

      dispatch(login({ ...responseData }));
      PopupToast("success", "Successfully Logged In 🙂");
      setTimeout(() => {
        setLoading(false);
        navigate("/")
      }, 500);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        PopupToast("error", error.response?.data?.errorMessage || "An error occurred.", 3000);
      } else {
        PopupToast("error", "An error occurred.", 3000);
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    dispatch(themeActions.setNavLink("login"));
  }, []);

  return (
    <form onSubmit={loginHandle}>
      <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
        justifyContent={'center'} minHeight={'calc(100vh - 175px)'} position={'relative'}>

        {loading && (
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1000
            }}
          >
            <ThreeDots
              visible={true}
              height="100"
              width="100"
              color="#2c494d"
              radius="15"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        )}

        <Box width={"50%"} >
          <Lottie
            animationData={loginLottie}
            loop={false}
            autoPlay
            className="sm:h-[350px]"
          />
        </Box>

        <Box p={'0.8rem'} width={{ xs: '100%', md: '50%' }} textAlign={{ xs: 'center', md: 'left' }}>
          <h1
            className={classNames(darkMode ? 'text-white' : 'text-[#1c3a4f]', 'text-2xl font-bold')}
          >
            Login
          </h1>

          <Box component={'div'} mt={2}>
            <div>
              <FormControl
                fullWidth
                sx={{ m: 1, ml: 0, width: '75%', textAlign: 'center' }}
                variant="standard"
              >
                <Input
                  id="standard-adornment-username"
                  placeholder="username"
                  name="username"
                  inputProps={{ style: { borderBottom: '1px solid gray' } }}
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ m: 1, ml: 0, width: '75%', textAlign: 'center' }}
                variant="standard"
              >
                <Input
                  id="standard-adornment-password"
                  name="password"
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff style={{ color: darkMode ? '#FFF' : '#1A364A' }} /> : <Visibility style={{ color: darkMode ? '#FFF' : '#1A364A' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <Box
                sx={{ mt: 2, width: '100%', textAlign: { xs: 'center', md: 'left' } }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    backgroundImage: 'linear-gradient(to right, rgb(40, 82, 112), rgb(26, 54, 74))',
                    borderColor: 'transparent',
                    color: '#FFF',
                    '&:hover': {
                      backgroundImage: 'none',
                      borderColor: 'linear-gradient(to right, rgb(40, 82, 112), rgb(26, 54, 74))',
                      backgroundColor: '#FFF',
                      color: '#1A364A',
                    },
                  }}
                >
                  Submit &nbsp; <KeyboardArrowRightIcon />
                </Button>
              </Box>

            </div>
          </Box>

        </Box>
      </Box>

      <Toaster containerStyle={{ fontSize: '15px', marginBottom: '100px' }} />
    </form>
  )
}

export default Login;

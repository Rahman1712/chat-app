import { Box, Button, FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import Lottie from "lottie-react";
import signupLottie from "../../lottie/signup.json";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupToast from "../../utils/PopupToast";
import { ThreeDots } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import axiosApi from "../../config/axiosConfig";
import { setEmail } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { themeActions } from "../../store/theme-slice";

interface SignupProps {
  darkMode: boolean;
}

interface FormData {
  fullname: string;
  email: string;
  username: string;
  password: string;
  mobile: string;
}

const Signup: React.FC<SignupProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    username: "",
    password: "",
    mobile: ""
  });

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signupHandle = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedFormData: FormData = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      username: formData.username.trim(),
      password: formData.password.trim()
    };

    if (!trimmedFormData.fullname || !trimmedFormData.email || !trimmedFormData.username || !trimmedFormData.password || !trimmedFormData.mobile) {
      PopupToast("error", "All fields are required.", 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosApi.post("/api/v1/auth/register", trimmedFormData);
      const responseData = response.data;
      console.log(responseData);
      dispatch(setEmail(formData.email));

      PopupToast("success", "Successfully Registered 🙂");
      setTimeout(() => {
        setLoading(false);
        navigate("/otp");
      }, 500);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        if (Array.isArray(errorData) || (typeof errorData === 'object' && !Array.isArray(errorData))) {
          if (Array.isArray(errorData)) {
            errorData.forEach((item) => {
              PopupToast("error", item.errorMessage, 3000);
            });
          } else {
            PopupToast("error", errorData.errorMessage || "An error occurred.", 3000);
          }
        }
      } else {
        PopupToast("error", "An error occurred.", 3000);
      }
    }
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    dispatch(themeActions.setNavLink("signup"));
  }, []);

  return (
    <form onSubmit={signupHandle}>
      <Box
        component={'main'}
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={'calc(100vh - 175px)'}>

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

        <Box width={"50%"}>
          <Lottie animationData={signupLottie} loop autoPlay className="sm:h-[350px]" />
        </Box>

        <Box p={'0.8rem'} width={{ xs: '100%', md: '50%' }} textAlign={{ xs: 'center', md: 'left' }}>
          <h1 
          className={classNames(darkMode ? 'text-white' : 'text-[#1c3a4f]' , 'text-2xl font-bold')}
          >Signup</h1>

          <Box component={'div'} mt={2}>
            <div>

              <FormControl fullWidth sx={{ m: 1, width: '75%' }} variant="standard">
                <Input
                  id="standard-adornment-fullname"
                  placeholder="fullname"
                  name="fullname"
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, width: '75%' }} variant="standard">
                <Input
                  id="standard-adornment-email"
                  placeholder="email"
                  name="email"
                  type="email"
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, width: '75%' }} variant="standard">
                <Input
                  id="standard-adornment-mobile"
                  placeholder="mobile"
                  name="mobile"
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, width: '75%' }} variant="standard">
                <Input
                  id="standard-adornment-username"
                  placeholder="username"
                  name="username"
                  style={{ color: darkMode ? '#FFF' : '#1A364A' }}
                  sx={{
                    ':before': { borderBottomColor: darkMode ? '#FFF' : 'gray' },
                    ':after': { borderBottomColor: '#1A364A' },
                  }}
                  onChange={handleChangeForm}
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1, width: '75%' }} variant="standard">
                <Input
                  id="standard-adornment-password"
                  placeholder="password"
                  name="password"
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
                  color="info"
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
                  Register &nbsp; <KeyboardArrowRightIcon />
                </Button>
              </Box>

            </div>
          </Box>

        </Box>
      </Box>
      <Toaster containerStyle={{ fontSize: '15px', marginBottom: '50px' }} />
    </form>
  );
}

export default Signup;

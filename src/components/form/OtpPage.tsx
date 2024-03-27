import { Box, Button, FormControl } from '@mui/material';
import Lottie from 'lottie-react';
import otpLottie from '../../lottie/otp.json';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import React, { FormEvent, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import PopupToast from '../../utils/PopupToast';
import axios from 'axios';
import axiosApi from "../../config/axiosConfig";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../store/auth-slice';
import { themeActions } from '../../store/theme-slice';

interface OtpPageProps {
  darkMode: boolean;
}

const OtpPage: React.FC<OtpPageProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.auth);

  const handleOtpVerification = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length != 4) {
      PopupToast("error", "Enter the OTP", 3000);
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email ?? "");
      formData.append("otp", otp);

      const response = await axiosApi.post("/api/v1/auth/verify-otp", formData);
      const responseData = response.data;
      console.log(responseData);

      PopupToast("success", 'OTP verified 🔓 successfully ✅.', 3000);

      await dispatch(login({ ...responseData }));
      
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 5000);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        PopupToast("error", error.response?.data?.errorMessage || "An error occurred.", 3000);
      } else {
        PopupToast("error", "An error occurred.", 3000);
      }
    }
  };

  useEffect(() => {
    dispatch(themeActions.setNavLink("login"));
  }, []);

  return (
    <form onSubmit={handleOtpVerification}>
      <Box
        component="main"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 175px)"
      >

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

        <Box width={{ xs: '100%', md: '50%' }} display="flex" alignItems="center" justifyContent="center">
          <Lottie animationData={otpLottie} loop={false} autoPlay style={{ height: '350px', width: '100%' }} />
        </Box>

        <Box p={'0.8rem'} width={{ xs: '100%', md: '50%' }} textAlign={{ xs: 'center', md: 'left' }}>
          <Box mb={4}>
            <h1 className='text-xl'>OTP Verification</h1>
          </Box>

          <Box display="flex" flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
            <FormControl fullWidth sx={{ mb: 2, width: '50%' }} variant="standard">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                inputType='number'
                renderInput={(props) => (
                  <input {...props}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                  />
                )}
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  margin: '0 0.5rem',
                  fontSize: '1.5rem',
                  borderRadius: '4px',
                  border: '2px solid #1A364A',
                  color: darkMode ? '#FFF' : '#1A364A',
                  backgroundColor: darkMode ? '#1A364A' : '#FFF',
                }}
              />


            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="outlined"
                color="info"
                fullWidth
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
                Verify OTP &nbsp; <KeyboardArrowRightIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default OtpPage;

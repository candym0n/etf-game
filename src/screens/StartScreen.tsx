import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('phase-one');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: "url('images/launch.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pb: 10,
      }}
    >
      <Button
        onClick={handleStart}
        sx={{
          px: 8,
          py: 1.8,
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          borderRadius: '999px',
          color: '#ffffff',
          background: 'green',
          transform: "translateY(-1rem)",
          boxShadow: '0 14px 35px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.4)',
          '&:hover': {
            background: 'rgb(5, 173, 13)',
          },
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default StartScreen;

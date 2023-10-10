import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Paper square elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Real API Store. All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;
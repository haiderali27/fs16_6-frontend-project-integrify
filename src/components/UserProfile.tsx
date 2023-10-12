import {  RootState } from '../store/store';
import {  useSelector } from 'react-redux';
import { Avatar, Paper, Typography } from '@mui/material';



const UserProfile = () => {
    const { user: { currentUser } } = useSelector((state: RootState) => state);
   const user_ = currentUser.currentUser;
   if (!user_) {
        return <div>User not found.</div>; 
      }
  return (
    <Paper elevation={3} style={{margin:"100px"}}>
      <Avatar alt={user_.name} src={user_.avatar} />
      <Typography variant="h4" gutterBottom>
        {user_.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {user_.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Role: {user_.role}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        ID: {user_.id}
      </Typography>
    </Paper>
  );
};

export default UserProfile;
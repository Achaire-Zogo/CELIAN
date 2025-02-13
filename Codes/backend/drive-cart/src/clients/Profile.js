import React, { useEffect, useState } from 'react';
import { getUser } from '../api-endpoints/endpoints'; // Import the getUser function
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  AssignmentInd as RegistrationIcon,
  Category as ClientTypeIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        } else {
          setError('Unable to fetch user data.');
        }
      } catch (err) {
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Profile
      </Typography>

      {/* Personal Information Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <PersonIcon sx={{ mr: 1 }} />
            Personal Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Name" secondary={user.name} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="First Name" secondary={user.firstName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Last Name" secondary={user.lastName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Phone Number" secondary={user.phoneNumber} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Company Information Card (if applicable) */}
      {user.clientType === 'COMPANY' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <BusinessIcon sx={{ mr: 1 }} />
              Company Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Company Name" secondary={user.companyName} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RegistrationIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Registration Number" secondary={user.registrationNumber} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {/* Account Information Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <ClientTypeIcon sx={{ mr: 1 }} />
            Account Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ClientTypeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Client Type" secondary={user.clientType} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Created At" secondary={new Date(user.createdAt).toLocaleString()} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Updated At" secondary={new Date(user.updatedAt).toLocaleString()} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Edit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" startIcon={<EditIcon />}>
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
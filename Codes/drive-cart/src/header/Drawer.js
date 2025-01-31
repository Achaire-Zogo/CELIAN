import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaymentIcon from '@mui/icons-material/Payment';
import CommuteIcon from '@mui/icons-material/Commute';

function MyDrawer({open, toggleDrawer}){

  const icons = [
    {name: "Home", icon: <HomeIcon/>, route: '/'},
    {name: "Profile", icon: <ManageAccountsIcon/>, route: '/auth'},
    {name: "Dashboard", icon: <DashboardIcon/>, route: '/dashboard'},
    {name: "Cart", icon: <ShoppingCartIcon/>, route: '/cart'},
    {name: "Payments", icon: <PaymentIcon/>, route: '/payments'},
    
    
  ]

  const adminIcons = [
    {name: "Users", icon: <PeopleIcon/>, route: '/clients'},
    {name: "Catalogs", icon: <ViewListIcon/>, route: '/catalogs'},
    {name: "Orders", icon: <AddShoppingCartIcon/>, route: '/orders'},
    {name: "Vehicles",icon: <CommuteIcon/>, route: '/vehicles'},
    
    
  ]


      const DrawerList = (
        <Box sx={{ width: 250 }}  role="presentation"  onClick={toggleDrawer(false)}>
          <List>
            {icons.map((item, index) => (
              <ListItem key={index} disablePadding >
                <ListItemButton LinkComponent={Link} to={item.route}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {adminIcons.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton LinkComponent={Link} to={item.route}>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    
      return (<Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>);

}

export default MyDrawer;
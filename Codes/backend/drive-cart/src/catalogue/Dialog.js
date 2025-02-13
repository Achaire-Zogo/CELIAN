import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const options = ['sieges en cuir', 'sieges sportifs','vitre fumer'];

function SimpleDialog(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.options);
  
  const { onClose, selectedValue, open , callback} = props;
  const [selected, setSelected] = React.useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {

   callback();
   dispatch(authActions.setOptions(selected));
    onClose(value);
  };

  const handleToggle = (value) => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];
  
    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }
  
    setSelected(newSelected);
    console.log(selected);
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Options</DialogTitle>
      <List sx={{ pt: 0 }}>
  {options.map((email) => {
    const labelId = `checkbox-list-label-${email}`;

    return (
      <ListItem
        key={email}
        disablePadding
        secondaryAction={
          <Checkbox
            edge="start"
            onChange={() => handleToggle(email)}
            checked={selected.indexOf(email) !== -1}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        }
      >
        <ListItemButton onClick={() => handleToggle(email)}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <AddCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId} primary={email} />
        </ListItemButton>
      </ListItem>
    );
  })}
   <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={handleListItemClick}
          >
            <ListItemAvatar>
              <Avatar>
                <BuildIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add options" />
          </ListItemButton>
        </ListItem>
</List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



export default SimpleDialog;


import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div class="logo"> LOVE CODING </div>
		<div class="icon" onclick="toggleNotifi()">
			<img src="img/bell.png" alt=""/> <span>17</span>
		</div>
		<div class="notifi-box" id="box">
			<h2>Notifications <span>17</span></h2>
			<div class="notifi-item">
				<img src="img/avatar1.png" alt="img"/>
				<div class="text">
				   <h4>Elias Abdurrahman</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>

			<div class="notifi-item">
				<img src="img/avatar2.png" alt="img"/>
				<div class="text">
				   <h4>John Doe</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>

			<div class="notifi-item">
				<img src="img/avatar3.png" alt="img"/>
				<div class="text">
				   <h4>Emad Ali</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>

			<div class="notifi-item">
				<img src="img/avatar4.png" alt="img"/>
				<div class="text">
				   <h4>Ekram Abu </h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>

			<div class="notifi-item">
				<img src="img/avatar5.png" alt="img"/>
				<div class="text">
				   <h4>Jane Doe</h4>
				   <p>@lorem ipsum dolor sit amet</p>
			    </div> 
			</div>

		</div>
    </div>
  );
}

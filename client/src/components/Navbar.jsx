import React, { useState } from 'react';
import {
	BlacktModeOutlined,
	LightModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
	DarkModeOutlined
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from 'assets/profile.jpeg';
import {
	AppBar,
	useTheme,
	Toolbar,
	InputBase,
	Box,
	MenuItem,
	Typography,
	Button,
	IconButton,
	Menu
} from '@mui/material';
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [ anchorEl, setAnchorEl ] = useState(null);

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const isOpen = Boolean(anchorEl);

	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none'
			}}
		>
			{/* left side  */}
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						backgroundColor={theme.palette.background.alt}
						borderRadius="9px"
						gap="3rem"
						p="0.1rem 1.5rem"
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>
				<FlexBetween gap="1.5rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark' ? (
							<DarkModeOutlined sx={{ fontSize: '25px' }} />
						) : (
							<LightModeOutlined sx={{ fontSize: '25px' }} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{ fontSize: '25px' }} />
					</IconButton>
					<FlexBetween>
						<Button
							onClick={handleClick}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textTransform: 'none',
								gap: '1rem'
							}}
						>
							<Box
								component="img"
								alt="profile"
								src={profileImage}
								height="40px"
								width="40px"
								borderRadius="50%"
								sx={{ objectFit: 'cover' }}
							/>
							<Box textAlign="left">
								<Typography
									fontWeight="bold"
									fontSize="0.85rem"
									sx={{ color: theme.palette.secondary[100] }}
								>
									{user.name}
								</Typography>
								<Typography
									fontWeight="bold"
									fontSize="0.75rem"
									sx={{ color: theme.palette.secondary[200] }}
								>
									{user.occupation}
								</Typography>
							</Box>
							<ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={isOpen}
							onClose={handleClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						>
							<MenuItem onClick={handleClose}> log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

import { Typography, Box, useTheme } from '@mui/material';
import React from 'react';
const Header = ({ title, subtitle }) => {
	const theme = useTheme();
	return (
		<Box>
			<Typography variant="h2" color={theme.palette.secondary[100]} sx={{ mb: '5px' }} fontWeight="bold">
				{title}
			</Typography>
			<Typography variant="5" color={theme.palette.secondary[300]}>
				{subtitle}
			</Typography>
		</Box>
	);
};
export default Header;

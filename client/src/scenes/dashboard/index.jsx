import React from 'react';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic, DoneAllOutlined } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import OverviewChart from 'components/OverviewChart';
import { useGetDashboardQuery } from 'state/api';
import StatBox from 'components/StatBox';
import Breakdown from 'scenes/breakdown';
import BreakdownChart from 'components/BreakdownChart';
const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreen = useMediaQuery('(min-width:1200px)');
	const { data, isLoading } = useGetDashboardQuery();
	console.log('transaction', !isLoading ? data : '');
	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			flex: 1
		},
		{
			field: 'userId',
			headerName: 'User ID',
			flex: 1
		},
		{
			field: 'createdAt',
			headerName: 'CreatedAt',
			flex: 1
		},
		{
			field: 'products',
			headerName: '# of Products',
			flex: 0.5,
			sortable: false,
			renderCell: (params) => params.value.length
		},
		{
			field: 'cost',
			headerName: 'Cost',
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`
		}
	];
	return (
		<Box m={'1.5rem 2.5rem'}>
			<Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
			<FlexBetween>
				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: '14px',
							fontWeight: 'bold',
							padding: '10px 20px'
						}}
					>
						<DoneAllOutlined sx={{ mr: '10px' }} /> Download Reports
					</Button>
				</Box>
			</FlexBetween>
			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(12,1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{ '& > div': { gridColumn: isNonMediumScreen ? undefined : 'span 12' } }}
			>
				{/* row 1*/}
				<StatBox
					title="Total Custom "
					value={data && data.totalCustomers}
					increse="+14%"
					description="Since last month"
					icon={<Email sx={{ color: theme.palette.secondary[600], fontSize: '26px' }} />}
				/>

				<StatBox
					title="Sales Today"
					value={data && data.todayStats.totalSales}
					increse="+21%"
					description="Since last day"
					icon={<PointOfSale sx={{ color: theme.palette.secondary[600], fontSize: '26px' }} />}
				/>
				<Box
					gridColumn="span 8"
					gridRow="span 2"
					background={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>
				<StatBox
					title="Monthly Sales"
					value={data && data.thisMonthStats.totalSales}
					increse="+5%"
					description="Since last month"
					icon={<PersonAdd sx={{ color: theme.palette.secondary[600], fontSize: '26px' }} />}
				/>
				<StatBox
					title="Yearly Sales"
					value={data && data.yearlySalesTotal}
					increse="+43%"
					description="Since last year"
					icon={<Traffic sx={{ color: theme.palette.secondary[600], fontSize: '26px' }} />}
				/>
				{/*row 2 */}
				<Box
					gridColumn="span 8"
					gridRow="span 3"
					sx={{
						'& .MuiDataGrid-root': {
							border: 'none',
							borderRadius: '5rem'
						},
						'& .MuiDataGrid-cell': {
							borderBottom: 'none'
						},
						'& .MuiDataGrid-columnHeaders': {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderBottom: 'none'
						},
						'& .MuiDataGrid-virtualScroller': {
							backgroundColor: theme.palette.background.alt
						},
						'& .MuiDataGrid-footerContainer': {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderTop: 'none'
						},

						'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
							color: `${theme.palette.secondary[200]} !important`
						}
					}}
				>
					<DataGrid
						loading={isLoading || !data}
						getRowId={(row) => row._id}
						rows={(data && data.transaction) || []}
						columns={columns}
						vertical
					/>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
				/>
				<Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
					Sales By Category
				</Typography>
				<BreakdownChart isDashboard={true} />
				<Typography>
					Breakdown of real states and information via category for revenue made for this year and total sales
				</Typography>
			</Box>
		</Box>
	);
};

export default Dashboard;

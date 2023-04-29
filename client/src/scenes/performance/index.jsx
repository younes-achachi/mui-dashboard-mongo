import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetUserPerformanceQuery } from 'state/api';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';

const Performance = () => {
	const theme = useTheme();
	const userId = useSelector((state) => state.global.userId);
	console.log('userid', userId);

	const { data, isLoading } = useGetUserPerformanceQuery(userId);
	const [ pageSize, setPageSize ] = useState(20);

	console.log('data', data);

	const columns = [
		{
			field: '_id',
			headerName: 'ID',
			flex: 1
		},
		{
			field: 'userId',
			headerName: 'User Id',
			flex: 0.5
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
			renderCell: (params) => {
				return params.value.length;
			}
		},
		{
			field: 'cost',
			headerName: 'Cost',
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`
		}
	];
	return (
		<Box m="1.5rem 1.5rem">
			<Header title="PERFORMANCE" subtitle="Performance grid  " />
			<Box
				mt="40px"
				height="75vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none'
					},
					'& .MuiDataGridCell': {
						borderBottom: 'none'
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: 'none'
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: theme.palette.primary.light
					},
					'& .MuiDataGrid-footerContainer': {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: 'none'
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${theme.palette.secondary[200]}  !important`
					}
				}}
			>
				<DataGrid
					rows={(data && data.sales) || []}
					pageSize={pageSize}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					rowsPerPageOptions={[ 20, 50, 100 ]}
					pagination
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					columns={columns}
					components={{
						ColumnMenu: CustomColumnMenu
					}}
				/>
			</Box>
		</Box>
	);
};

export default Performance;

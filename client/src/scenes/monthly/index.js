import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { useGetSalesQuery } from 'state/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsiveLine } from '@nivo/line';
const Monthly = () => {
	const { data, isLoading } = useGetSalesQuery();
	const theme = useTheme();
	const [ formatedData ] = useMemo(
		() => {
			if (!data) return [];
			const { monthlyData } = data;
			const totalSalesLine = {
				id: 'totalSales',
				color: 'red',
				data: []
			};
			const totalUnitsLine = {
				id: 'totalUnits',
				color: theme.palette.secondary[600],
				data: []
			};
			Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
				totalSalesLine.data = [ ...totalSalesLine.data, { x: month, y: totalSales } ];
				totalUnitsLine.data = [ ...totalUnitsLine.data, { x: month, y: totalUnits } ];
			});
			const formatedData = [ totalSalesLine, totalUnitsLine ];
			return [ formatedData ];
		},
		[ data ]
	); // eslint-diable-line react-hooks/exhaustive-deps

	return (
		<Box m="1.5rem 2.5rem" flex="1">
			<Header title="Monthly SALES" subtitle="Chart of Monthly sales  " />
			<Box height="75vh">
				{data ? (
					<ResponsiveLine
						data={formatedData}
						colors={{ datum: 'color' }}
						margin={{ top: 20, right: 50, bottom: 70, left: 60 }}
						xScale={{ type: 'point' }}
						yScale={{
							type: 'linear',
							min: 'auto',
							max: 'auto',
							stacked: false,
							reverse: false
						}}
						yFormat=" >+1.2f"
						curve="catmullRom"
						axisTop={null}
						axisRight={null}
						axisBottom={{
							orient: 'bottom',
							tickSize: 5,
							tickPadding: 5,

							tickRotation: 90,

							legend: 'Month',
							legendOffset: 60,
							legendPosition: 'middle'
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'Total',
							legendOffset: -50,
							legendPosition: 'middle'
						}}
						enableGridX={false}
						enableGridY={false}
						pointSize={10}
						pointColor={{ theme: 'background' }}
						pointBorderWidth={2}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-12}
						useMesh={true}
						legends={[
							{
								anchor: 'top-right',
								direction: 'column',
								justify: false,
								translateX: 50,
								translateY: 0,
								itemsSpacing: 0,
								itemDirection: 'left-to-right',
								itemWidth: 80,
								itemHeight: 20,
								itemOpacity: 0.75,
								symbolSize: 12,
								symbolShape: 'circle',
								symbolBorderColor: 'rgba(0, 0, 0, .5)',
								effects: [
									{
										on: 'hover',
										style: {
											itemBackground: 'rgba(0, 0, 0, .03)',
											itemOpacity: 1
										}
									}
								]
							}
						]}
						theme={{
							axis: {
								fontSize: '14px',
								domain: {
									line: {
										stroke: theme.palette.secondary[200]
									}
								},
								ticks: { text: { fill: theme.palette.secondary[400] } }
							},
							legend: { text: { fill: theme.palette.secondary[200] } },
							ticks: {
								line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
								text: { fill: theme.palette.secondary[200] }
							},
							legends: { text: { fill: theme.palette.secondary[200] } },
							tooltip: {
								container: {
									color: theme.palette.primary.main
								}
							}
						}}
					/>
				) : (
					<React.Fragment>...Loading</React.Fragment>
				)}
			</Box>
		</Box>
	);
};

export default Monthly;

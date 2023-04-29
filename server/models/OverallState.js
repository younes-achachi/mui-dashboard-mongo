import mongoose from 'mongoose';
const OverallStateSchema = new mongoose.Schema(
	{
		totalCustomers: Number,
		yearlySalesTotal: Number,
		yearlySalesSoldUnits: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: Number,
				totalUnits: Number
			}
		],
		dailyData: [
			{
				date: String,
				totalSales: Number,
				totalUnits: Number
			}
		],
		salesByCategory: {
			type: Map,
			of: Number
		}
	},
	{ timestamps: true }
);

const OverallStat = mongoose.model('OverallState', OverallStateSchema);
export default OverallStat;

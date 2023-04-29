import mongoose from 'mongoose';
const ProductStatSchema = new mongoose.Schema(
	{
		productId: String,
		yearlySalesToday: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: Number,
				totalUnites: Number
			}
		],
		dailyData: {
			date: String,
			totalSales: Number,
			totalUnits: Number
		}
	},
	{ timestamps: true }
);

const Product = mongoose.model('ProductStat', ProductStatSchema);
export default Product;

import User from '../models/User.js';
import OverallStat from '../models/OverallState.js';
import Transaction from '../models/Transaction.js';

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById({ _id: id });
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

export const getDashboardStats = async (req, res) => {
	try {
		/* hard coded values */
		const currentMonth = 'November';
		const currentYear = '2021';
		const currentDate = '2021-11-05';
		/*recent Transaction */
		const transaction = await Transaction.find().limit(50).sort({ createdOn: -1 });
		console.log(transaction);
		/* overall Stats */
		const overallStat = await OverallStat.find({ year: currentYear });
		const { totalCustomers, yearlySalesSoldUnits, yearlySalesTotal, monthlyData, SalesByCategory } = overallStat[0];
		const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
			return month === currentMonth;
		});
		const todayStats = overallStat[0].dailyData.find(({ date }) => {
			return date === currentDate;
		});

		res.status(200).json({
			overallStat,
			totalCustomers,
			yearlySalesSoldUnits,
			yearlySalesTotal,
			monthlyData,
			SalesByCategory,
			todayStats,
			transaction,
			thisMonthStats
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import clientRoutes from './routes/client.js';
//data import
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallState.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
	dataUser,
	dataProduct,
	dataProductStat,
	dataTransaction,
	dataOverallStat,
	dataAffiliateStat
} from './data/index.js';
import getUsers, { postUser, getProducts } from './queries.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*ROUTE*/

// app.get('/:id', getUsers);
// app.post('/post', postUser);
app.use((req, res, next) => {
	const corsWhitelist = [ 'http://localhost:3000', '100.20.92.101', '44.225.181.72', '44.227.217.144' ];
	if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	}

	next();
});
app.use('/client', clientRoutes);
app.use(
	'/general',
	function(req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	},
	generalRoutes
);
app.use(
	'/management',
	function(req, res, next) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	},
	managementRoutes
);
app.use(
	'/sales',
	function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '[http://localhost:3000,100.20.92.101,44.225.181.72,44.227.217.144]');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	},
	salesRoutes
);

app.use(cors());
/*POSTGRES TEST QUERIES */
const { dailyData } = dataOverallStat;
// console.log(Object.keys(dataOverallStat[0]));
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose
	.connect('mongodb+srv://younes:sniper@cluster0.ptp5m.mongodb.net/dashboard-ui?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then((data, err) => {
		app.listen(PORT, () => console.log(`server Port:${PORT}`));
		// only add data one time
		// OverallStat.update({}, { $pull: { dailyData: { _id: '6445ac27aed7aa4d00297cc4' } } }).then((err, data) =>
		// 	console.log(err, data)
		// );
		// OverallStat.updateMany(
		// 	{},
		// 	{
		// 		$set: {
		// 			yearlySalesSoldUnits: dataOverallStat[0].yearlySalesSoldUnits
		// 		}
		// 	},
		// 	{ upsert: true }
		// ).then((e, r) => console.log(e, r));
		// AffiliateStat.insertMany(dataAffiliateStat).then((e, r) => console.log(r, e));
		// Product.insertMany(dataProduct);
		// Transaction.insertMany(dataTransaction);
		// ProductStat.insertMany(dataProductStat);
		// User.insertMany(dataUser).then(() => console.log('data done '));
	})
	.catch((e) => console.log(e + ', did not connect'));

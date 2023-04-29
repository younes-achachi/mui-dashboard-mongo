import { dataProduct } from './data/index.js';
import pg from 'pg';
const pool = new pg.Pool({
	user: 'younes',
	host: 'localhost',
	database: 'dash',
	password: 'sniper',
	port: 5432
});

const getUsers = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query('SELECT * FROM users WHERE id= $1', [ id ], (error, results) => {
		if (error) {
			throw new Error(error);
		}
		response.status(200).json(results.rows);
	});
};

export default getUsers;
export const postUser = (req, res) => {
	const { name, email } = req.body;
	pool.query('INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *', [ name, email ], (err, results) => {
		if (err) {
			throw err;
		}
		return res.status(201).json(results);
	});
};
export const getProducts = (request, response) => {
	const id = parseInt(request.params.id);
	var a = [];
	for (i in getProducts[0]) {
		a.push([ i, getProducts[0][i] ]);
	}
	const sql = 'INSERT INTO products ?';
	pool.query(sql, [ a ], (err, results) => {
		if (err) {
			throw err;
		}
		return res.status(201).json(results.rows);
	});
	// await pool.query('SELECT * FROM products', [ id ], (error, results) => {
	// 	if (error) {
	// 		throw new Error(error);
	// 	}
	// 	response.status(200).json(results.rows);
	// });
};

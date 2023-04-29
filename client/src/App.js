import { Css } from '@mui/icons-material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, Prompt, useRouteError } from 'react-router-dom';
import { themeSettings } from 'theme';
import Dashboard from 'scenes/dashboard';
import Layout from 'scenes/layout';
import Products from 'scenes/products';
import Customers from 'scenes/customers';
import Transactions from 'scenes/transactions';
import Geography from 'scenes/geography';
import Overview from 'scenes/overview';
import Daily from 'scenes/daily';
import Monthly from 'scenes/monthly';
import BreakDown from 'scenes/breakdown';
import Performance from 'scenes/performance';
import Admin from 'scenes/admin';
function App() {
	function ErrorPage() {
		const error = useRouteError();
		console.error(error);

		return (
			<div id="error-page">
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
			</div>
		);
	}
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [ mode ]);
	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
							<Route path="/products" element={<Products />} />
							<Route path="/customers" element={<Customers />} />
							<Route path="/transactions" element={<Transactions />} />
							<Route path="/geography" element={<Geography />} />
							<Route path="/overview" element={<Overview />} />
							<Route path="/daily" element={<Daily />} />
							<Route path="/monthly" element={<Monthly />} />
							<Route path="/breakdown" element={<BreakDown />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/performance" element={<Performance />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;

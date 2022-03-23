import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./Coin";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	const fetchCoinsData = async () => {
		try {
			const { data } = await axios({
				url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false",
				method: "GET",
			});
			setCoins(data);
			console.log("🚀 ~ file: App.js ~ line 15 ~ fetchCoinsData ~ data", data);
		} catch (error) {
			console.log(
				"🚀 ~ file: App.js ~ line 19 ~ fetchCoinsData ~ error",
				error.message
			);
		}
	};

	useEffect(() => {
		fetchCoinsData();
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className='coin-app'>
			<div className='coin-search'>
				<h1 className='coin-text'>Search a currency</h1>
				<form>
					<input
						className='coin-input'
						type='text'
						onChange={handleChange}
						placeholder='Search'
					/>
				</form>
			</div>

			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						image={coin.image}
						symbol={coin.symbol}
						marketcap={coin.market_cap}
						price={coin.current_price}
						priceChange={coin.price_change_percentage_24h}
						volume={coin.total_volume}
					/>
				);
			})}
		</div>
	);
}

export default App;

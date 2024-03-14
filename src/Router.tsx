import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trip from "../src/pages/trip/Trip";
import Error404 from "./pages/errors/error404/Error404";
import Home from "./pages/home/Home";
const Router: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* public */}
					<Route path="/" element={<Home />} />
					<Route path="/trip/side/:currentTripId" element={<Trip />} />
					<Route path="/trip/top/:currentTripId" element={<Trip />} />

					{/* Protected */}

					{/* Error */}
					<Route path="*" element={<Error404 />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;

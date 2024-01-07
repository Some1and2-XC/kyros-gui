import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./Layout";
import Home from "./views/Home";
import Gallery from "./views/Gallery";
import Donate from "./views/Donate";
import Source from "./views/Source";

function App() {

    return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="gallery" element={<Gallery />} />
					<Route path="donate" element={<Donate />} />
					<Route path="source" element={<Source />} />
				</Route>
			</Routes>
		</BrowserRouter>
    );
}

export default App;

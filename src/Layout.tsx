import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

import kyrosLogo from "./assets/kyros.svg";

function Sidebar({ children }) {
	// .Sidebar css found in Layout.css
	return (
		<div className="Sidebar">
			{children}
		</div>
	);	
}

function Layout() {
	return (
		<div className="Layout">
			<Sidebar>
				<img src={kyrosLogo} className="logo" alt="Kyros Logo" />
				<Link to="/">Generation</Link>
				<Link to="/gallery">Saved Images</Link>
				<Link to="/donate">Donate</Link>
				<Link to="/source">Source Code</Link>
			</Sidebar>
			<Outlet />
		</div>
	);
}

export default Layout;

import { Outlet, Link } from "react-router-dom";
import { appWindow } from "@tauri-apps/api/window";

import "./Layout.css";

import kyrosLogo from "./assets/kyros.svg";
import kyrosLogoTextless from "./assets/kyros_textless.svg";

function TitleBar() {
	const object_style = {
		height: "var(--drag-bar-height)",

		backgroundColor: "rgba(0, 0, 0, .6)",
		boxShadow: "2px 0px 9px black",
		zIndex: "999",
		userSelect: "none",
		width: "100%",

		display: "flex",
		justifyContent: "space-between",

		position: "fixed",
		top: "0px",
		left: "0px",
		right: "0px",
	};

	const button_style = {
		borderRadius: "0px",
		padding: "5px 15px",
		margin: "0px",
		height: "100%",
	};

	return (
		<div data-tauri-drag-region style={object_style}>
			<div data-tauri-drag-region style={{display: "flex", alignItems: "center", gap: "15px", marginLeft: "15px"}}>
				<img data-tauri-drag-region src={kyrosLogoTextless} style={{height: "75%"}} />
				<p data-tauri-drag-region style={{color: "white", fontFamily: "Arial", fontWeight: "bold",}}>Kyros</p>
			</div>
			<div style={{display: "flex", alignItems: "center",}}>
				<button style={button_style} onClick={() => appWindow.minimize()}>-</button>
				<button style={button_style} onClick={() => appWindow.toggleMaximize()}>=</button>
				<button style={button_style} onClick={() => appWindow.close()}>x</button>
			</div>
		</div>
	);
}

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
		<>
			<TitleBar />
			<div style={{height: "var(--drag-bar-height)"}}></div>
			<div style={{
				overflowY: "scroll",
				maxHeight: "var(--view-height)",
				width: "100%",
			}}>
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
			</div>
		</>
	);
}

export default Layout;

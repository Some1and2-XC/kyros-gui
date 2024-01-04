import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import kyrosLogo from "./assets/kyros.svg";
import "./App.css";

import Sidebar from "./Sidebar";
import Layout from "./Layout";

function App() {

    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
		<Layout>
			<Sidebar>
				<h1 style={{textDecoration: "underline"}}>Table of Contents</h1>
				<a href="#">Generation</a>
				<a href="#">Saved Images</a>
				<a href="#">Donate</a>
				<a href="#">Source Code</a>
			</Sidebar>
			<div className="container">
				<img src={kyrosLogo} className="logo" alt="Kyros Logo" />

				<form
					className="row"
					onSubmit={(e) => {
						e.preventDefault();
						greet();
					}} >

					<input
						id="input-box"
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder="Enter a name..."
					/>
					<button type="submit">Greet</button>
				</form>

				<p>{greetMsg}</p>
			</div>
		</Layout>
    );
}

export default App;

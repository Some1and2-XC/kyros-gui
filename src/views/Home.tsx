import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import OptionBox from "../OptionBox";

function Home() {

    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

	return (
		<div className="container">
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
			<br />
			<OptionBox
				title="button"
				description="desc"
				datatype="str"
				data_title="button_value"
				image="img"
			/>
		</div>
	);
}

export default Home;

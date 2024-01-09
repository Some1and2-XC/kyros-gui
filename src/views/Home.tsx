import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import {OptionBox, OptionBoxSection, OptionBoxForm} from "../OptionBox";

function Home() {

    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

	return (
		<div className="container">
			<p>{greetMsg}</p>
			<h1>Generation</h1>
			<br />
			
				<OptionBoxSection>

					<OptionBox
						title="button"
						description="desc"
						datatype="str"
						data_name="button_value"
						data_value="0"
						image="img"
						checked
					/>

					<OptionBox
						title="button"
						description="desc"
						datatype="str"
						data_name="button_value"
						data_value="1"
						image="img"
					/>

				</OptionBoxSection>
			
			<form
				style={{margin: "15px"}}
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

		</div>
	);
}

export default Home;

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
			<br />
			<OptionBoxForm>
				<h1>Generation</h1>
				<OptionBoxSection
					title="Generator Selected Variable"
					datatype="String"
					description="Selects which variable to change in iteration."
				>

					<OptionBox
						title="Mandelbrot"
						description="desc"
						data_name="is_julia"
						data_value="false"
						image="./generator/SD.png"
						checked
					/>

					<OptionBox
						title="Julia"
						description="desc"
						data_name="is_julia"
						data_value="1"
						image="./generator/JS.png"
					/>
				</OptionBoxSection>

				<OptionBoxSection
					title="Generator Measurement"
					datatype="String"
					description="Selects what the generator measures."
				>
					<OptionBox
						title="Iteration"
						description="desc"
						data_name="measurement"
						data_value="IT"
						image="./genrator/IT.svg"
						checked
					/>
					<OptionBox
						title="Distance"
						description="desc"
						data_name="measurement"
						data_value="TD"
						image="./genrator/TD.svg"
					/>
				</OptionBoxSection>

				<OptionBoxSection
					title="Generator Formula"
					datatype="String"
					description="Selects the formula for generation."
				>
					<OptionBox
						title="Standard"
						description="desc"
						data_name="formula"
						data_value="SD"
						image="./generator/SD.png"
						checked
					/>
					<OptionBox
						title="Rabbit"
						description="desc"
						data_name="formula"
						data_value="R"
						image="./generator/R.png"
					/>
					<OptionBox
						title="Burning Ship"
						description="desc"
						data_name="formula"
						data_value="BS"
						image="./generator/BS.png"
					/>
					<OptionBox
						title="Absolute Rabbit"
						description="desc"
						data_name="formula"
						data_value="ABR"
						image="./generator/ABR.png"
					/>
				</OptionBoxSection>
				<input />

			</OptionBoxForm>
			
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

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import {OptionBox, OptionTextBox, OptionBoxSection, OptionBoxCollection, OptionBoxForm} from "../OptionBox";

function Home() {

    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

	return (
		<>
			<div style={{}}>
				<OptionBoxForm>
					<h1>Generation</h1>
					<OptionBoxCollection>
						<OptionBoxSection
							title="Generator Selected Variable"
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
							description="Selects what the generator measures."
						>
							<OptionBox
								title="Iteration"
								description="desc"
								data_name="measurement"
								data_value="IT"
								image="./measure/IT.svg"
								checked
							/>
							<OptionBox
								title="Distance"
								description="desc"
								data_name="measurement"
								data_value="TD"
								image="./measure/TD.svg"
							/>
						</OptionBoxSection>

						<OptionBoxSection
							title="Generator Formula"
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
						<OptionBoxSection
							title="Resolution (px)"
							description="Selects the resolution of the generated image."
						>
							<OptionTextBox
								data_name="resolution"
								data_value="999"
							/>
						</OptionBoxSection>
					</OptionBoxCollection>

					<br />
					<h1>Color Selection</h1>
					<OptionBoxCollection>
						<OptionBoxSection
							title="Rate of Color Change"
							description="This number represents the amount the color changes per iteration."
						>
							<OptionTextBox
								data_name="rate_of_color_change"
								data_value="9"
							/>
						</OptionBoxSection>
						<OptionBoxSection
							title="Max Iterations"
							description="Sets the maximum amount of iterations that gets run."
						>
							<OptionTextBox
								data_name="max_i"
								data_value="999"
							/>
						</OptionBoxSection>
						<OptionBoxSection
							title="Color Style"
							description="This sets the kind of style being set."
						>
							<OptionBox
								title="Rotational"
								data_name="color_style"
								data_value="ROTATIONAL"
								image="/measure/rotation.svg"
								checked
							/>
							<OptionBox
								title="Sinusoidal"
								data_name="color_style"
								data_value="SINUSOIDAL"
								image="/measure/sinusoid.svg"
							/>
						</OptionBoxSection>
					</OptionBoxCollection>
				</OptionBoxForm>
				
				<br />
				<form
					style={{margin: "15px"}}
					className="row"
					onSubmit={(e) => {
						e.preventDefault();
						greet();
					}} >
					<p>{greetMsg}</p>
					<input
						id="input-box"
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder="Enter a name..."
					/>
					<button type="submit">Greet</button>
				</form>

			</div>
		</>
	);
}

export default Home;

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import {OptionBox, OptionTextBox, OptionBoxSection, OptionBoxCollection, OptionBoxForm} from "../OptionBox";
import ImageDisplay from "../ImageDisplay";

function Home() {

	async function kyros() {
		set_image(await invoke("kyros", { }));
	}

	const [image, set_image] = useState(null);

	return (
		<>
			<div style={{width: "100%"}}>

				<OptionBoxForm onSubmit={(e) => {
					e.preventDefault();
					kyros();
				}}>
					<ImageDisplay>
						<img src={image} style={{backgroundColor: "white", width: "min(500px, 100%)", borderRadius: "5px", aspectRatio: "1 / 1"}} />
						<button type="submit">Generate</button>
						<button onClick={e => set_image(null)} type="reset">Clear</button>
					</ImageDisplay>

					<OptionBoxCollection
						title="Generation"
					>
						<OptionBoxSection
							title="Generator Selected Variable"
							description="Selects which variable to change in iteration."
						>

							<OptionBox
								title="Mandelbrot"
								description="desc"
								data_name="is_julia"
								data_value="0"
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
							title="Measurement"
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

					<OptionBoxCollection
						title="Color Selection"
					>
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
								data_value="rotational"
								image="/measure/rotation.svg"
								checked
							/>
							<OptionBox
								title="Sinusoidal"
								data_name="color_style"
								data_value="sinusoidal"
								image="/measure/sinusoid.svg"
							/>
						</OptionBoxSection>
					</OptionBoxCollection>
				</OptionBoxForm>
			</div>
		</>
	);
}

export default Home;

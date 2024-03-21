import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import {Popup} from "../components/popup";
import {OptionBox, OptionTextBox, OptionBoxSection, OptionBoxCollection, OptionBoxForm} from "../OptionBox";
import ImageDisplay from "../ImageDisplay";

function Home() {

	async function kyros(e) {
		set_image(await invoke("kyros", {
			julia: e.target.is_julia.value == "1",
			measurement: e.target.measurement.value,
			formula: e.target.formula.value,
			resolution: e.target.resolution.value,
			rateOfColorChange: e.target.rate_of_color_change.value,
			maxI: e.target.max_i.value,
			colorStyle: e.target.color_style.value,
			background: e.target.background.value,
			foreground: e.target.foreground.value,
		}));
	}

	function save_image(e) {
		console.log(e);
	}

	const [image, set_image] = useState("");

	return (
		<>
			<div style={{width: "100%"}}>

				<OptionBoxForm onSubmit={(e) => {
					e.preventDefault();
					kyros(e);
				}}>
					<ImageDisplay>
						<img src={image} style={{flex: "1", backgroundColor: "white", width: "min(500px, 45%)", borderRadius: "5px", aspectRatio: "1 / 1"}} />
                        <Popup><button type="submit">Generate</button></Popup>
                        <Popup><button onClick={e => set_image("")} type="reset">Clear</button></Popup>
                        <Popup
                            out={<p>Output Text</p>}
                            onClick={e => save_image(e)}>
                            <button type="reset">Save</button>
                        </Popup>
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
								image_padding="25px"
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
								data_value="ROTATIONAL"
								image="/measure/rotation.svg"
								image_padding="15px"
								checked
							/>
							<OptionBox
								title="Sinusoidal"
								data_name="color_style"
								data_value="SINUSOIDAL"
								image="/measure/sinusoid.svg"
							/>
						</OptionBoxSection>
						<OptionBoxSection title="Background Color">
							<input style={{
								flexGrow: "0.5",
								height: "50px",
								margin: "auto auto",
								padding: "0",
							}} type="color" name="background" defaultValue="#FFFFFF" />
						</OptionBoxSection>
						<OptionBoxSection title="Foreground Color">
							<input style={{
								flexGrow: "0.5",
								height: "50px",
								margin: "auto auto",
								padding: "0",
							}} type="color" name="foreground" defaultValue="#000000" />
						</OptionBoxSection>
					</OptionBoxCollection>
				</OptionBoxForm>
			</div>
		</>
	);
}

export default Home;

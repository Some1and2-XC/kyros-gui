import { useState } from "react";
import "./OptionBox.css";

function OptionBoxForm({props, children}) {

	let options = {
		htmlFor: props.htmlFor
	};

	return (
		<form>
			{children}
			<input type="submit">
				Submit!
			</input>
		</form>
	);
}

function OptionBox(props, {children}) {

	function button_pressed(event) {
		let input_boxes = event
			.currentTarget
			.getElementsByTagName("input")[0];
		
		input_boxes.checked = true;

	}

	const config = {
		title: props.title,
		description: props.description,
		datatype: `<${props.datatype}>`,
		data_name: props.data_name,
		data_value: props.data_value,
		image: props.image,
	};

	const [object_style, set_object_style] = useState({
		border: "1px solid var(--outline-color)",
		borderRadius: "5px",
		padding: "7px",
		cursor: "pointer"
	});
	const [is_selected, set_is_selected] = useState(false);

	return (
		<>
			<label
				className="OptionBox"
				tabIndex={0}
				htmlFor={config.data_name}
				style={object_style}
				onClick={button_pressed}
			>
				<input
					type="radio"
					name={config.data_name}
					value={config.data_value}
					style={{display: "None"}}
					checked={props.checked}
				/>
				<div>
					<h1>{ config.title }</h1>
					<code>(Datatype : { config.datatype })</code>
					<hr />
					<p>{ config.description }</p>
					{ children }
				</div>
			</label>
		</>
	);
}

function OptionBoxSection({ children, props }) {

	const object_style = {
		display: "flex",
		gap: "15px",
		padding: "15px",
		border: "1px solid var(--outline-color)",
		borderRadius: "5px"
	};

	return (
		<>
			<div style={object_style}>
				{children}
			</div>
		</>
	);

}

export {OptionBox, OptionBoxSection, OptionBoxForm};

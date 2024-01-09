import { useState } from "react";
import "./OptionBox.css";

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
		data_name: props.data_name,
		data_value: props.data_value,
		image: props.image,
	};

	const [object_style, set_object_style] = useState({
		flexGrow: "1",
		border: "1px solid var(--outline-color)",
		borderRadius: "5px",
		padding: "7px",
		cursor: "pointer",
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
					defaultChecked={props.checked}
				/>
				<div>
					<h1>{config.title}</h1>
					<img
						src={config.image}
						style={{
							width: "min(17vw, 10rem)",
							filter:
								`
								drop-shadow(1px 1px 0px white)
								drop-shadow(-1px 1px 0px white)
								drop-shadow(1px -1px 0px white)
								drop-shadow(-1px -1px 0px white)
								`
						}}
					/>
					{ children }
				</div>
			</label>
		</>
	);
}

function OptionBoxSection({ children, ...props }) {

	const object_style = {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "column",
		gap: "15px",
		padding: "15px",
		border: "1px solid var(--outline-color)",
		borderRadius: "5px",
		backgroundColor: "rgba(0, 0, 0, .2)",
	};
	const config = {
		title: props.title,
		datatype: `<${props.datatype}>`,
		description: props.description,
	};
	const inner_config = {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: "15px",
	};

	return (
		<>
			<div className="OptionBoxSection" style={object_style}>
				<h1>{config.title}</h1>
				<code>(Datatype : { config.datatype })</code>
				<hr style={{width: "100%"}} />
				<p>{ config.description }</p>
				<div style={inner_config}>
					{children}
				</div>
			</div>
		</>
	);

}

function OptionBoxForm({children, ...props}) {

	let options = {
		htmlFor: props.htmlFor
	};
	const object_style = {
		display: "flex",
		flexWrap: "wrap",
		gap: "15px",
	};

	return (
		<form>
			<div className="OptionBoxForm" style={object_style}>
				{children}
			</div>
			<hr />
			<input type="submit" value="Submit" />
		</form>
	);
}

export {OptionBox, OptionBoxSection, OptionBoxForm};

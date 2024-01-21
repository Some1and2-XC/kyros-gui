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
							display: "block",
							width: "min(17vw, 10rem)",
							borderRadius: "min(17vw, 10rem)",
							marginLeft: "auto",
							marginRight: "auto",
							marginBottom: "1em",
							backgroundColor: "rgba(255, 255, 255, 1)"
						}}
					/>
					{ children }
				</div>
			</label>
		</>
	);
}

function OptionTextBox({ children, ...props }) {

	const config = {
		data_name: props.data_name,
		data_value: props.data_value,
	};

	const object_style = {
		marginLeft: "auto",
		marginRight: "auto",
	};

	const [text_value, set_text_value] = useState(config.data_value);
	
	let keyUpdate = e => {
			set_text_value(e.target.value.replace(/[^0-9]/, ""))
	};

	return (
		<>
			<label
				tabIndex={0}
				htmlFor={config.data_name}
				style={object_style}
			>
				<input
					type="number"
					name={config.data_name}
					style={{height: "2em",}}
					value={text_value}
					onChange={keyUpdate}
				/>
				<div>
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
		flexGrow: "1",
		flexDirection: "column",
		boxShadow: "3px 2px 12px -10px rgb(255, 45, 45)",
		gap: "15px",
		padding: "15px",
		margin: "0.5em",
		border: "1px solid var(--outline-color)",
		borderRadius: "5px",
		backgroundColor: "rgba(0, 0, 0, .2)",
	};
	const config = {
		title: props.title,
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
				<div style={inner_config}>
					{children}
				</div>
			</div>
		</>
	);

}

function OptionBoxCollection({children, ...props}) {

	const config = {
		title: props.title,
	};

	const defaults = {
		display: "none",
		flexWrap: "wrap",
		gap: "15px",
	};

	const [object_style, set_object_style] = useState(defaults);
	const [title, set_title] = useState(props.title + " &#709;");

	function toggle_children() {

		let tmp_defaults = {...defaults};

		if (object_style.display === "none") {
			set_title(config.title + " &#708;");
			tmp_defaults.display = "flex";
		} else {
			set_title(config.title + " &#709;");
			tmp_defaults.display = "none"
		}

		set_object_style(tmp_defaults);
	}

	return (
		<>
			<br />
			<button
				type="button"
				onClick={toggle_children}
			> {
				new DOMParser()
					.parseFromString(title, "text/html")
					.documentElement
					.textContent
			}</button>
			<div style={object_style}>
				{children}
			</div>
		</>
	);
}

function OptionBoxForm({children, ...props}) {

	let options = {
		htmlFor: props.htmlFor,
	};
	const object_style = {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	};

	return (
		<form className="OptionBoxForm">
			<div style={object_style}>
				{children}
			</div>
		</form>
	);
}

export {OptionBox, OptionTextBox, OptionBoxSection, OptionBoxCollection, OptionBoxForm};

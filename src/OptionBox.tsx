import { useState } from "react";

function OptionBox(props, {children}) {

	const button_pressed = () => {

		let new_style = {...object_style};
		if (!is_selected) {
			new_style.backgroundColor = "#dd0000";
		}
		else {
			delete new_style.backgroundColor;
		}

		set_is_selected(!is_selected);
		set_object_style(new_style);
	}

	const config = {
		title: props.title,
		description: props.description,
		datatype: `<${props.datatype}>`,
		data_title: props.data_title,
		image: props.image
	};

	const [object_style, set_object_style] = useState({
		border: "1px solid white",
		borderRadius: "5px",
		padding: "0px"
	});
	const [is_selected, set_is_selected] = useState(false);

	return (
		<>
			<button style={object_style} onClick={button_pressed}>
				<h1>{ config.title }</h1>
				<code>(Datatype : { config.datatype })</code>
				<hr />
				<p>{ config.description }</p>
				{ children }
			</button>
		</>
	);
}

function OptionBoxSection(props, { children }) {

	const object_style = {
		border: "1px solid white",
		borderRadius: "5px"
	};

	return (
		<>
		</>
	);

}

export default OptionBox;

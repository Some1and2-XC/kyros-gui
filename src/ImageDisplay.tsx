import {useState} from "react";

function ImageDisplay({ children, ...props }) {
	let object_style = {
		display: "flex",
		width: "100%",
		gap: "15px",
	};
	return (
		<div style={object_style}>
			{ children }
		</div>
	);	
}

export default ImageDisplay;
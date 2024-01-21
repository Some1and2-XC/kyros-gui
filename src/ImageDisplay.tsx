import {useState} from "react";

function ImageDisplay({ children, ...props }) {
	let object_style = {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		gap: "15px",
	};
	return (
		<div className="ImageDisplay" style={object_style}>
			{ children }
		</div>
	);	
}

export default ImageDisplay;

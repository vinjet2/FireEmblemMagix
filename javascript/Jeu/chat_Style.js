const applyStyles = iframe => {
	let styles = {
		fontColor : "grey",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Lato",
		fontSize : "20px",
		hideIcons : false,
		inputBackgroundColor : "rgb(23,87,20)",
		inputFontColor : "black"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
	}, 100);
}

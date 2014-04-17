$(function() {


	$("#upload-button").click(function() {
		var file = $("#choose-file").prop('files');
		if (file.length == 0) {
			$("#uploaded").html("Select a file first.");
		} else {
			$("#uploaded").html("Uploaded new draft!");
		}
	});

	$("#save-button").click(function() {
		event.preventDefault();
		console.log("called save");
		$("#saved").html("Saved!");
	});
});

$(function() {

	var upload = function() {
		$("#choose-file").click();
	};

	$("#upload-button").click(upload);

	$("#save-button").click(function() {
		console.log("called save");
		$("#saved").html("Saved!");
	});
});

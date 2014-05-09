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

function addProject(textboxID) {
	console.log("got here")
	var textBox = document.getElementById(textboxID);
	var text = textBox.value;
	if (text == "") {
		return;
	}
	var lastProject = $(".project").last()
	console.log(lastProject);
	var string = "<p><a class=\"project\" href=\"" + text.replace(/\s+/g, '').toLowerCase() + ".html\">" + text + "</a></p>";
	lastProject.after(string);
	textBox.value = "";
}

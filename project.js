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

/* flash the border of an element */
var flashBorder = function (someElement) {
    var original_color = someElement.css("border-left-color");
    someElement.css("border-color","#FF0084");
    someElement.animate({
        borderTopColor: original_color,
        borderLeftColor: original_color,
        borderRightColor: original_color,
        borderBottomColor: original_color }, 'normal');
};

function addProject(textboxID) {
	console.log("got here")
	var textBox = document.getElementById(textboxID);
	var text = textBox.value;
	if (text == "") {
        flashBorder($("#" + textboxID));
		return;
	}
	var lastProject = $(".project").last()
	console.log(lastProject);
	var string = "<p><a class=\"project\" href=\"" + text.replace(/\s+/g, '').toLowerCase() + ".html\">" + text + "</a></p>";
	lastProject.after(string);
	textBox.value = "";
}

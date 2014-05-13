$(function() {

	addProjectDiv("Portrait");
	addProjectDiv("Landscape");
	addProjectDiv("Fantasy");

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
	console.log("wait what");
	var textBox = document.getElementById(textboxID);
	var text = textBox.value;
	if (text == "") {
		return;
	}
	var lastProject = $(".project").last()
	var project_slug = text.replace(/\s+/g, '').toLowerCase();
	console.log(project_slug);
	var string = "<p><a class=\"project\" href=\"javascript:void(0)\" onclick=\"showProjectDiv('" + project_slug + "');\">" + text + "</a></p>";
	lastProject.after(string);
	textBox.value = "";
	addProjectDiv(text);
}

function addProjectDiv(projectName) {
	console.log("the fuck");
	var div_name = "project-" + projectName.replace(/\s+/g, '').toLowerCase();
	var html =  '<div id="' + div_name + '" visible="hidden">\
  				  <div><h1>Project: ' + projectName + '</h1></div>\
  				    <table cellpadding="50px">\
    				  <tr>\
      				    <td>\
        				  <div id="image">'
        				  	+ "No image yet" +
          				    //<img id="portrait" src="ml.jpeg" height="300" width="200" border="2px">
        				  '</div>\
      					</td>\
      					<td>\
        				  <form>\
          				    <button id="save-button">Save overlay</button>\
          					<span id="saved"></span>\
          					<br>\
          					<button id="load-button">Load overlay</button>\
        				  </form>\
      					</td>\
    				  </tr>\
    				  <tr align="left">\
      					<td align="left">\
        				  <div id="draft-list" width="300" border="2px">\
          					<h2>Older drafts</h2>'
          					  + "No drafts yet" + 
          					  //<div>Draft 3</div>
          					  //<div>Draft 2</div>
          					  //<div>Draft 1</div>
        				  + '</div>\
      					</td>\
      					<td align="left">\
        				  <h2>Upload new draft:</h2>\
        				  <form>\
          					<input type="file" id="choose-file" name="new-file">\
        				  </form>\
        				  <button id="upload-button">Upload selected draft</button>\
        				  <div id="uploaded"></div>\
      				    </td>\
    				  </tr>\
  					</table>\
  				  </div>';
};

function showProjectDiv(projectSlug) {
	console.log(projectSlug);
	$("#projects-main").hide();
	$("#" + projectSlug).show();
};

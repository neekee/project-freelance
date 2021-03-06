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

	$("#tabs-projects").tabs({
		beforeLoad: function(event, ui) {
			showProjectList();
		}
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
	var textBox = document.getElementById(textboxID);
	var text = textBox.value;
	if (text == "") {
        flashBorder($("#" + textboxID));
		return;
	}
	textBox.value = "";
	addProjectDiv(text);
	console.log("whynot");
}

function addProjectDiv(projectName) {
	console.log("gothere");
	var project_slug = projectName.replace(/\s+/g, '').toLowerCase();
	var div_name = "project-" + project_slug;
	var lastProject = $(".project").last()
	console.log(project_slug);
	var string = "<br><br><a class=\"project\" href=\"javascript:void(0)\" onclick=\"showProjectDiv('" + project_slug + "');\">" + projectName + "</a>";
	lastProject.after(string);

	var html =  '<div id="' + div_name + '" class="project-div">\
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
          					  + "No drafts yet" 
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
  	$("#projects-main").after(html);
  	// $("#" + div_name).addEventListener('click', function() {
  	// 	$("#projects-main").hide();
  	// 	$(this).show();
  	// });
	console.log($("#") + div_name);
  	$("#" + div_name).hide();
};

function showProjectDiv(projectSlug) {
	console.log(projectSlug);
	$("#projects-main").hide();
	console.log($("#project-"));
	$("#project-" + projectSlug).show();
	console.log("got here");
};

function showProjectList() {

 var all_projects = document.getElementsByClassName('project-div');
 	for (var i=0; i<all_projects.length; i++) {
    //all_projects[i].hide();
     	all_projects[i].style.display = 'none';
 	}
 	$("#projects-main").show();
};

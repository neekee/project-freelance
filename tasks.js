$(function() {
    $( "#tabs" ).tabs();

    var toggle = function (class_name) {
      console.log("called toggle on " + class_name);
      console.log($(class_name.id));
      if ($(class_name.id + "-body").style == "display:block") {
        $(class_name.id + "-body").style = "display:none";
      }
      else {
      	$(class_name.id + "-body").style = "display:block";
      };
    };

    // $("body").on("click", "#project-general", toggle("#project-general-body"));
    $("#project-general").click(toggle);
    $("#project-fantasy").click(toggle);
    $("#project-portrait").click(toggle);
    $("#project-landscape").click(toggle);
});

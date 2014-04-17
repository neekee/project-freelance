/**$(function() {
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
});**/


$(function() {
    // when you click on a task table, it displays the tasks.

     $( "table.message-table" ).click(function() {
        var content = $(this).find( "div.task-container" );
            event.stopPropagation();
            content.slideToggle( "fast");
    });

    $( "tr.task-header" ).click(function() {
        var content = $(this).closest('table').find( "div.task-container" );
          content.slideToggle( "fast" );
          event.stopPropagation();
    });


    $("#select_logo").click(function(){
        $("#logo").trigger('click');
        return false;
    });

});
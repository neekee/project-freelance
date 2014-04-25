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

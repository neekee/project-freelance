/**
 * Created by Stephie on 4/16/14.
 */

$(function() {
    // when you click on a message table, it shows the contents of the message.
    $( "table.message-table" ).click(function() {
        var content = $(this).find( "div.message-content" );
        if (!content.is(":visible"))
        {
            content.slideToggle( "fast" );
            event.stopPropagation();
        }
    });

    $( "tr.message-header" ).click(function() {
        var content = $(this).closest('table').find( "div.message-content" );
        if (content.is(":visible"))
        {
            content.slideToggle( "fast" );
            event.stopPropagation();
        }
    });
});

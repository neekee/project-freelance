/**
 * Created by Stephie on 4/16/14.
 */

$(function() {
    // when you click on a message table, it shows the contents of the message.
    $( "table.message-table" ).click(function() {
        $(this).find( ".message-content-row" ).show( "slow" );
    });
});

/**
 * Created by Stephie on 4/16/14.
 */

$(function() {
    // when you click on a message table, it shows the contents of the message.
    $( "table.message-table" ).click(function() {
        var content = $(this).find( "div.message-container" );
        if (!content.is(":visible"))
        {
            event.stopPropagation();
            content.slideToggle( "fast", function () {
                var textarea = content.find("textarea.expanding");
                if (!textarea.expanding('active')) {
                    textarea.expanding();
                }
            });
        }
    });

    $( "tr.message-header" ).click(function() {
        var content = $(this).closest('table').find( "div.message-container" );
        if (content.is(":visible"))
        {
            content.slideToggle( "fast" );
            event.stopPropagation();
        }
    });


    $( "button.message-send-reply" ).button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    });

    $( "button.message-choose-file" ).button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    });

    $("#select_logo").click(function(){
        $("#logo").trigger('click');
        return false;
    });

});

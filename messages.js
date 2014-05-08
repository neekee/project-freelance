/**
 * Created by Stephie on 4/16/14.
 */

$(function () {
    /**
     * Sends a new message.
     * @param recipient String
     * @param subject String
     * @param content String
     * @param isReply boolean
     */
    var sendNewMessage = function(recipient, subject, content, isReply) {
        // add to the top
        // already read

        if (isReply) {

        }
    };

    // creates a reply
    var createReply = function(to, body) {
    };

    $("table.message-table textarea").addClass("ui-corner-all");

    // when you click on a message table, it shows the contents of the message.
    $("table.message-table")
        .click(function () {
            var content = $(this).find("div.message-container");
            if (!content.is(":visible")) {
                $(this).removeClass("closed");
                // slide out the message content
                content.slideToggle("fast", function () {
                    var textarea = content.find("textarea.expanding");
                    if (!textarea.expanding('active')) {
                        textarea.expanding();
                    }
                });
                // change the expand icon to collapse
                var icon = $(this).find("td.message-right-padding > span.ui-icon");
                icon.addClass("ui-icon-carat-1-n");
                icon.removeClass("ui-icon-carat-1-s");
                // mark read if necessary
                if ($(this).hasClass('unread')) {
                    icon.addClass("blue-icon");
                    icon = $(this).find("td.message-icon-td > span.ui-icon-mail-closed");
                    icon.addClass("ui-icon-mail-open");
                    icon.removeClass("ui-icon-mail-closed");
                    $(this).removeClass('unread');
                }
                event.stopPropagation();
            }
        });

    $("tr.message-header").click(function () {
        var table = $(this).closest('table');
        var content = table.find("div.message-container");
        if (content.is(":visible")) {
            content.slideToggle("fast");
            var icon = $(this).find("td.message-right-padding > span.ui-icon");
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
            table.addClass("closed");
            event.stopPropagation();
        }
    });


    $("button.message-send").button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    });

    // send a reply
    $("button.message-send-reply").button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }

    }).click(function () {
        var icon = $(this).closest("table.message-table").find("span.ui-icon-mail-open");
        icon.removeClass("ui-icon-mail-open");
        icon.addClass("ui-icon-arrowreturnthick-1-w");
        var now = new Date();
        var month = now.getMonth()+1;
        var time = now.getHours() + ":" + now.getMinutes();
        var date = month + "/" + now.getDate() + "/" + now.getFullYear();
        console.log(time + " @ " + date);
    });


    $("button.message-choose-file").button({
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    });

    $(".input-file").change(function (evt) {
        var file = this.files[0];
        if (!file) {
            return;
        }
        $('<span>').text(file.name).append($("<button>").text("Delete Attachment").button({
            icons: {
                primary: "ui-icon-trash"
            },
            text: false
        }).click(function (evt) {
                // Make this undoable
                $(evt.currentTarget).parent().remove();
            }).addClass("close-button")).addClass("file-chip").appendTo($(evt.currentTarget).parent().find(".file-list"));
    });

    $(".message-choose-file").click(function () {
        var input = $(this).closest('div.message-reply').find("input.input-file");
        input.trigger('click');
        event.stopPropagation();
        return false;
    });

});

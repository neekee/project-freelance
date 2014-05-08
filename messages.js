/**
 * Created by Stephie on 4/16/14.
 */

$(function () {
    var sendNewMessage = function() {

    };

    // creates a reply
    var createReply = function(to, body) {
    };

    // when you click on a message table, it shows the contents of the message.
    $("table.message-table")
        .click(function () {
            var content = $(this).find("div.message-container");
            if (!content.is(":visible")) {
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
                    icon = $(this).find("td.message-icon-td > span.ui-icon-mail-closed");
                    icon.addClass("ui-icon-mail-open");
                    icon.removeClass("ui-icon-mail-closed");
                    $(this).removeClass('unread');
                }
                $(this).css('cursor', 'auto');
                event.stopPropagation();
            }
        });

    $("tr.message-header").click(function () {
        var content = $(this).closest('table').find("div.message-container");
        if (content.is(":visible")) {
            var table = $(this).closest('table.message-table');
            table.css('cursor', 'pointer');
            content.slideToggle("fast");
            var icon = $(this).find("td.message-right-padding > span.ui-icon");
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
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
        var date = new Date();
        var month = date.getMonth()+1;
        console.log(date.getHours() + ":" + date.getMinutes() + " " + month + "/" + date.getDate() + "/" + date.getFullYear());
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

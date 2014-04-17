/**
 * Created by Stephie on 4/16/14.
 */

$(function () {
    // when you click on a message table, it shows the contents of the message.
    $("table.message-table").click(function () {
        var content = $(this).find("div.message-container");
        if (!content.is(":visible")) {
            content.slideToggle("fast", function () {
                var textarea = content.find("textarea.expanding");
                if (!textarea.expanding('active')) {
                    textarea.expanding();
                }
            });
            // mark read if necessary
            if ($(this).hasClass('unread')) {
                var icon = $(this).find("span.ui-icon-mail-closed");
                icon.removeClass("ui-icon-mail-closed");
                icon.addClass("ui-icon-mail-open");
                $(this).removeClass('unread');
            }
            event.stopPropagation();
        }
    });

    $("tr.message-header").click(function () {
        var content = $(this).closest('table').find("div.message-container");
        if (content.is(":visible")) {
            content.slideToggle("fast");
            event.stopPropagation();
        }
    });


    $("button.message-send-reply").button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
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

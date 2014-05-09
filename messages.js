/**
 * Created by Stephie on 4/16/14.
 */

$(function () {
    var message_tab = $("#tabs-messages");

    /**
     * Sends a new message.
     * @param other_user String
     * @param subject String
     * @param date String
     * @param time boolean
     * @param content String
     * @param fromMe boolean
     * @param isReply boolean
     */
    var addNewMessage = function (other_user, subject, date, time, content, fromMe, isReply) {
        // TODO: have this pass in an object instead
        // already read by default
        var readIconClass =
            fromMe ? (isReply ? "ui-icon-arrowreturnthick-1-w" : "ui-icon-arrowthick-1-e") : "ui-icon-mail-closed";
        var toggleIconClass = isReply ? " blue-icon" : "";
        var table = $("<table>").addClass("message-table ui-corner-all closed")
            .append($("<tr>").addClass("message-header")
                .append($("<td>").addClass("message-icon-read")
                    .append($("<span>").addClass("ui-icon").addClass(readIconClass)))
                .append($("<td>").addClass("message-label")
                    .text(fromMe ? "To:" : "From:"))
                .append($("<td>").addClass("message-sender")
                    .append($("<span>").addClass("message-user")
                        .text(other_user))
                    .append($("<span>").addClass("message-timestamp")
                        .text(date + " ")
                        .append($("<span>").addClass("message-timestamp-separator").text("@"))
                        .append(" " + time)))
                .append($("<td>").addClass("message-icon-toggle").attr("rowspan", 3)
                    .append($("<span>").addClass("ui-icon ui-icon-carat-1-s" + toggleIconClass))))
            .append($("<tr>").addClass("message-header")
                .append($("<td>"))
                .append($("<td>").addClass("message-label")
                    .text("Subject:"))
                .append($("<td>").addClass("message-subject")
                    .text(subject)))
            .append($("<tr>")
                .append($("<td>"))
                .append($("<td>").attr("colspan", 2)
                    .append($("<div>").addClass("message-container")
                        .append($("<div>").addClass("message-content")
                            .text(content))
                        .append($("<div>").addClass("message-reply")
                            .append($("<textarea>").addClass("expanding reply").attr({"placeholder": "Reply?", "rows": "1"}))
                            .append($("<input>").attr("type", "file").addClass("input-file"))
                            .append($("<button>").addClass("message-send-reply").text("Send").button({
                                icons: {
                                    primary: "ui-icon ui-icon-mail-closed"
                                }

                            })).
                            append($("<button>").addClass("message-choose-file").text("Choose file...").button({
                                icons: {
                                    primary: "ui-icon ui-icon-folder-open"
                                }
                            })).
                            append($("<div>").addClass("file-list"))
                        )
                    )
                )
            );
        $(".message-table.compose").after(table);
        // ughhhhh! fix everything here.
        addExpandListener(table);
        buttonifyChildren(table);
    };

    var buttonifyChildren = function(someParent) {
        someParent.find("input[type=submit], input[type=button], button")
            .click(function( event ) {
                event.preventDefault();
            })
            .bind('mouseup', function() {
                $(this).blur()});
    };


    $("table.message-table textarea").addClass("ui-corner-all");

    // when you click on a message table, it shows the contents of the message.
    var addExpandListener = function(someElement) {
        someElement.click(function (evt) {
            var content = $(this).find("div.message-container");
            if (!content.is(":visible")) {
                $(this).removeClass("closed");
                // slide out the message content
                content.slideToggle(0, function () {
                    var textarea = content.find("textarea.expanding");
                    if (!textarea.expanding('active')) {
                        textarea.expanding();
                    }
                });
                // change the expand icon to collapse
                var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
                icon.addClass("ui-icon-carat-1-n");
                icon.removeClass("ui-icon-carat-1-s");
                // mark read if necessary
                if ($(this).hasClass('unread')) {
                    icon.addClass("blue-icon");
                    icon = $(this).find("td.message-icon-read > span.ui-icon-mail-closed");
                    icon.addClass("ui-icon-mail-open");
                    icon.removeClass("ui-icon-mail-closed");
                    $(this).removeClass('unread');
                }
                event.stopPropagation();
            }
        });
    };

    // Remove any weird events add to message-table by libraries
    // they stop event bubbling.
    $("table.message-table").off();
    addExpandListener($("table.message-table"));

    message_tab.on("click", "tr.message-header", function () {
        var table = $(this).closest('table');
        var content = table.find("div.message-container");
        if (content.is(":visible")) {
            content.slideToggle("fast");
            var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
            table.addClass("closed");
            event.stopPropagation();
        }
    });

    // Take thse away when all messages are generated via send and receive
    $("button.message-send").button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    });

    //send a reply
    $("button.message-send-reply").button({
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }

     });
    message_tab.on("click", "button.message-send-reply", function () {
        var table = $(this).closest("table.message-table");
        var textarea = table.find("textarea.reply");
        var content = textarea.val();
        if (content.length > 0) {
            var icon = table.find("span.ui-icon-mail-open");
            var now = new Date();
            var month = now.getMonth() + 1;
            var time = now.getHours() + ":" + now.getMinutes();
            var date = month + "/" + now.getDate() + "/" + now.getFullYear();
            var other_user = table.find("td.message-sender > span.message-user").text();
            var subject = "Re: " + table.find("td.message-subject").text();
            addNewMessage(other_user, subject, date, time, content, true, true);
        }
        else {
            var original_color = textarea.css("border-left-color");
            textarea.css("border-color", "#FF0084");
            textarea.animate({ borderTopColor: original_color, borderLeftColor: original_color, borderRightColor: original_color, borderBottomColor: original_color, }, 'fast');
        }
    });


    $("button.message-choose-file").button({
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    });

    message_tab.on("change", "input.input-file", function (evt) {
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

    message_tab.on("click", ".message-choose-file", function () {
        var input = $(this).closest('div.message-reply').find("input.input-file");
        input.trigger('click');
        event.stopPropagation();
        return false;
    });

});

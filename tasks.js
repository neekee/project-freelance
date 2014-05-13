$(function () {

    /* stylize newly added buttons */
    var buttonifyChildren = function(someParent) {
        someParent.find("input[type=submit], input[type=button], button")
            .click(function (event) {
                event.preventDefault();
            })
            .bind('mouseup', function () {
                $(this).blur()
            })
            .button();
    };

    /* stylize newly added text inputs */
    var textInputifyChildren = function(someParent) {
        someParent.find('input:text, input:password')
            .button()
            .css({
                'font' : 'inherit',
                'color' : 'inherit',
                'text-align' : 'left',
                'outline' : 'none',
                'cursor' : 'text'
            })
            .off('mouseenter').off('mousedown').off('keydown').off('focus');
    };

    /* add folder */
    var addFolder = function () {
        var newFolderInput = $("#newfoldername");
        var folderName = newFolderInput.val();
        if (folderName.length === 0) {
            // if empty
            flashBorder(newFolderInput);
        }
        else {
            // if not empty
            newFolderInput.val("");
            var table = $("<table>").addClass("task-table closed")
                .append($("<tr>").addClass("task-header")
                    .append($("<td>").addClass("message-icon-read")
                        .append($("<span>").addClass("ui-icon").addClass("ui-icon ui-icon-folder-collapsed")))
                    .append($("<td>").addClass("task-label")
                        .text(folderName))
                    .append($("<td>").addClass("message-icon-toggle").attr("rowspan", "3")
                        .append($("<span>").addClass("ui-icon ui-icon-carat-1-s"))))
                .append($("<tr>")
                    .append($("<td>"))
                    .append($("<td>").attr("colspan", "2")
                        .append($("<div>").addClass("task-container")
                            .append($("<div>").addClass("task-content")
                                .append($("<input>").attr("type", "text").addClass("tasks-add-field"))
                                .append($("<input>").attr("type", "button").addClass("tasks-add-button").attr("value","Add"))
                                .append("<br>")
                                .append($("<table>").addClass("task-list").attr("id", folderName)))
                            )));
            var div = $("#main-task");
            div.append(table);
            buttonifyChildren(table);
            textInputifyChildren(table);
        }

    };

    $("input#newfolder").click(addFolder);

    var task_tab = $("#tabs-tasks");

    /* add task */
    task_tab.on("click", ".tasks-add-button", function() {
        var div = $(this).closest("div");
        var textInput = div.find(".tasks-add-field");
        var text = textInput.val();
        if (text.length === 0) {
            flashBorder(textInput);
        }
        else {
            textInput.val("");
            var putTasksHere = div.find(".task-list");
            putTasksHere
                .append($("<tr>").addClass("task-entry")
                    .append($("<td>")
                        .append($("<input>").attr("type","checkbox").addClass("task-checkbox"))
                        .append($("<span>").addClass("task-text").text(text))
                        .append($("<span>").addClass("task-close ui-icon ui-icon-close"))));
        }
    });

    /* expand */
    task_tab.on("click", "table.task-table.closed", function() {
        var content = $(this).find("div.task-container");
        var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
        if (!content.is(":visible")) {
            icon.addClass("ui-icon-carat-1-n");
            icon.removeClass("ui-icon-carat-1-s");
            $(this).removeClass("closed");
            content.slideToggle("fast");
            event.stopPropagation();
        }
    });

    /* collapse */
    task_tab.on("click", ".task-header", function() {
        var table = $(this).closest("table.task-table");
        if (!table.hasClass("closed")) {
            var content = table.find("div.task-container");
            if (content.is(":visible")) {
                var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
                icon.addClass("ui-icon-carat-1-s");
                icon.removeClass("ui-icon-carat-1-n");
                table.addClass("closed");
                content.slideToggle("fast");
                event.stopPropagation();
            }
        }
    });

    task_tab.on("mouseenter", "tr.task-entry", function() {
        var close = $(this).find(".task-close");
        close.css("visibility","visible");
        event.stopPropagation();
    });

    task_tab.on("mouseleave", "tr.task-entry", function() {
        var close = $(this).find(".task-close");
        close.css("visibility","hidden");
        event.stopPropagation();
    });

    task_tab.on("click", ".task-close", function() {
        $(this).closest("tr").remove();
    });

    task_tab.on("change", ".task-checkbox", function() {
        var text = $(this).closest("td").find(".task-text");
        if ($(this).is(':checked')) {
            text.css("text-decoration","line-through");
        }
        else {
            text.css("text-decoration","none");
        }
        event.stopPropagation();
    });

});

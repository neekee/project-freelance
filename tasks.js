$(function () {
    // when you click on a task table, it displays the tasks.

    /**
     $( "table.message-table" ).click(function() {
        var content = $(this).find( "div.task-container" );
        var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
        icon.addClass("ui-icon-carat-1-n");
        icon.removeClass("ui-icon-carat-1-s");
        event.stopPropagation();
        content.slideToggle( "fast");
    });**/

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
            var table = $("<table>").addClass("task-table")
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
                                .append($("<button>").addClass("tasks-add-button").text("Add"))
                                .append("<br>")
                                .append($("<table>").addClass("task-table").attr("id", folderName)))
                            )));
            var div = $("#main-task");
            div.append(table);
            addExpandListener(table);
            buttonifyChildren(table);
            textInputifyChildren(table);
        }

    };

    var addExpandListener = function (someElement) {
        someElement.click(function (evt) {
            var content = $(this).closest('table').find("div.task-container");
            var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
            if (!content.is(":visible")) {
                icon.addClass("ui-icon-carat-1-n");
                icon.removeClass("ui-icon-carat-1-s");
            }
            else {
                icon.addClass("ui-icon-carat-1-s");
                icon.removeClass("ui-icon-carat-1-n");
            }
            content.slideToggle("fast");
            event.stopPropagation();
        });
    }

    function buttonifyChildren(someParent) {
        someParent.find("input[type=submit], input[type=button], button")
            .click(function (event) {
                event.preventDefault();
            })
            .bind('mouseup', function () {
                $(this).blur()
            })
            .button();
    }

    function textInputifyChildren(someParent) {
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

    }

// following code adapted from http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/

    var flashBorder = function (someElement) {
        var original_color = someElement.css("border-left-color");
        someElement.css("border-color","#FF0084");
        someElement.animate({
            borderTopColor: original_color,
            borderLeftColor: original_color,
            borderRightColor: original_color,
            borderBottomColor: original_color }, 'normal');
    };

    var addTask = function (tableID, textboxID) {
        var textBox = $("#"+textboxID);
        var text = textBox.val();
        if (text.length === 0) {
            flashBorder(textBox);
        }
        else {
            textBox.val("");
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            var newcell = row.insertCell(0);
            var string = '<input type="checkbox" name="task" value="task1id">' + text + '</form>';
            newcell.innerHTML = string;
        }
    }

    function deleteRow(tableID) {
        try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;

            for (var i = 0; i < rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                if (null != chkbox && true == chkbox.checked) {
                    if (rowCount <= 1) {
                        alert("Cannot delete all the rows.");
                        break;
                    }
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
            }
        } catch (e) {
            alert(e);
        }
    }

    /** define what happens when the element that matches the selector is clicked */
    $("input#newfolder").click(addFolder);
    $("input#AddGeneral").click(function() {addTask('General','generaltext');});
    $("input#AddFantasy").click(function() {addTask('Fantasy','fantasytext');});
    $("input#AddLandscape").click(function() {addTask('Landscape','landscapetext');});
    $("input#AddPortrait").click(function() {addTask('Portrait','portraittext');});

    $("tr.task-header").click(function () {
        var content = $(this).closest('table').find("div.task-container");
        var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
        if (!content.is(":visible")) {
            icon.addClass("ui-icon-carat-1-n");
            icon.removeClass("ui-icon-carat-1-s");
        }
        else {
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
        }
        content.slideToggle("fast");
        event.stopPropagation();
    });


    $("#select_logo").click(function () {
        $("#logo").trigger('click');
        return false;
    });


});

/**
 <table class="task-table">
 <tr class="task-header">
 <td class="message-icon-read"><span class="ui-icon ui-icon-folder-collapsed"></span></td>
 <td class="task-label">General
 <td class="message-icon-toggle" rowspan="3"><span class="ui-icon ui-icon-carat-1-s"></span></td>
 </tr>
 <tr>
 <td colspan="2">
 <div class="task-container">
 <div class="task-content">
 <input type="text" id="generaltext" name="New task" class="tasks-add-field">
 <input type="button" id="AddGeneral" name="Add" value="Add" class="tasks-add-button"onclick ="addTask('General','generaltext')">
 <br>
 <table id="General" class="task-table">
 </table>
 </div>
 </div>
 </td>
 </tr>
 </table>
 </div>

 **/





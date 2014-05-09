$(function() {
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

    $( "tr.task-header" ).click(function() {
        var content = $(this).closest('table').find( "div.task-container" );
        var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
        if (!content.is(":visible")) {
            icon.addClass("ui-icon-carat-1-n");
            icon.removeClass("ui-icon-carat-1-s");
        }
        else {
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
        }
        content.slideToggle( "fast" );
        event.stopPropagation();
    });


    $("#select_logo").click(function(){
        $("#logo").trigger('click');
        return false;
    });


});

function addFolder() {
    var folderName = document.getElementById('newfoldername').value;
    document.getElementById('newfoldername').value = "";
    var table = $("<table>").addClass("task-table")
        .append($("<tr>").addClass("task-header")
            .append($("<td>").addClass("message-icon-read")
                .append($("<span>").addClass("ui-icon").addClass("ui-icon ui-icon-folder-collapsed")))
            .append($("<td>").addClass("task-label")
                .text(folderName))
            .append($("<td>").addClass("message-icon-toggle").attr("rowspan", 3)
                    .append($("<span>").addClass("ui-icon ui-icon-carat-1-s"))))
        .append($("<tr>")
            .append($("<td>"))
            .append($("<td>").attr("colspan", 2))
                .append($("<div>").addClass("task-container")
                        .append($("<div>").addClass("task-content"))
                        .append($("<input>").attr("type","text").addClass("tasks-add-field"))
                        .append($("<button>").addClass("tasks-add-button").text("Add task"))
                )
        )
    $(".main-task").after(table);
    addExpandListener(table);
    buttonifyChildren(table);
}

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


function addExpandListener(someElement) {
    someElement.click(function (evt) {
        var content = $(this).closest('table').find( "div.task-container" );
        var icon = $(this).find("td.message-icon-toggle > span.ui-icon");
        if (!content.is(":visible")) {
            icon.addClass("ui-icon-carat-1-n");
            icon.removeClass("ui-icon-carat-1-s");
        }
        else {
            icon.addClass("ui-icon-carat-1-s");
            icon.removeClass("ui-icon-carat-1-n");
        }
        content.slideToggle( "fast" );
        event.stopPropagation();
});
}

function buttonifyChildren (someParent) {
        someParent.find("input[type=submit], input[type=button], button")
            .click(function( event ) {
                event.preventDefault();
            })
            .bind('mouseup', function() {
                $(this).blur()});
    }


 // following code adapted from http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/

function addTask(tableID,textboxID) {
    var textBox = document.getElementById(textboxID);
    var text = textBox.value;
    if (text == "") {
        return;
    }
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var newcell = row.insertCell(0);
    var string = '<input type="checkbox" name="task" value="task1id">' + text + '</form>';
    newcell.innerHTML = string;
    textBox.value = "";
}
function deleteRow(tableID) {
            try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
 
            for(var i=0; i<rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                if(null != chkbox && true == chkbox.checked) {
                    if(rowCount <= 1) {
                        alert("Cannot delete all the rows.");
                        break;
                    }
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
            }
            }catch(e) {
                alert(e);
            }
        }


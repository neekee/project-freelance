$(function() {
    // when you click on a task table, it displays the tasks.

     $( "table.message-table" ).click(function() {
        var content = $(this).find( "div.task-container" );
            event.stopPropagation();
            content.slideToggle( "fast");
    });

    $( "tr.task-header" ).click(function() {
        var content = $(this).closest('table').find( "div.task-container" );
          content.slideToggle( "fast" );
          event.stopPropagation();
    });


    $("#select_logo").click(function(){
        $("#logo").trigger('click');
        return false;
    });


});

 // following code adapted from http://viralpatel.net/blogs/dynamically-add-remove-rows-in-html-table-using-javascript/

function addTask(tableID,textboxID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var newcell = row.insertCell(0);
    var text = document.getElementById(textboxID);
    var string = '<form><input type="checkbox" name="task" value="task1id">' + text + '</form>';
    newcell.innerHTML = string;
    text.value = "";
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


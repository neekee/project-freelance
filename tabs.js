$(function() {
    $( "#tabs" ).tabs();
    $( 'textarea.compose' ).expanding('destroy');
    $('#tabs').on('tabsactivate', function(event, ui) {
        var newIndex = ui.newTab.index();
        switch (newIndex){
            case 2: // this is the messages tab
                if ( !$( 'textarea.compose' ).expanding('active'))
                    $( 'textarea.compose' ).expanding();
                break;
        }
//        console.log('Switched to tab '+newIndex);
    });
});

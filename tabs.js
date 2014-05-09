$(function() {
    $( "#tabs" ).tabs();
    $( 'textarea.compose' ).expanding('destroy');
    $('#tabs').on('tabsactivate', function(event, ui) {
        var newIndex = ui.newTab.index();
        switch (newIndex){
            case 2: // this is the messages tab
                // special case for dealing with the compose new message textarea
                var compose_textarea = $('textarea.compose');
                if ( !compose_textarea.expanding('active'))
                    compose_textarea.expanding();
                break;
        }
    });

    // style buttons
    $( "input[type=submit], input[type=button], button" )
        .button()
        .click(function( event ) {
            event.preventDefault();
        })
        .bind('mouseup', function() {
            $(this).blur()});

    // style text inputs
    // from http://stackoverflow.com/questions/6802085/jquery-ui-styled-text-input-box
    $('input:text, input:password')
        .button()
        .css({
            'font' : 'inherit',
            'color' : 'inherit',
            'text-align' : 'left',
            'outline' : 'none',
            'cursor' : 'text'
        })
        .off('mouseenter').off('mousedown').off('keydown').off('focus');

});

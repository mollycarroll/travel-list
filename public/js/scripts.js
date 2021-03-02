const openInstructions = () => {
    $('#instructionsModal').modal('show');
}

const closeInstructions = () => {
    $('#instructionsModal').modal('hide');
}

$(() => {

    $('div.home-card').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });

    $('button.show-buttons').hover(function() {
        $(this).addClass('button-transition');
    }, function() {
        $(this).removeClass('button-transition')
    })

});
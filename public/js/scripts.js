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

    

});
// var btn = document.getElementById('modal-delete');
// btn.addEventListener('click', function(e){

// })

$('#modal-delete').on('click', function () {
    var id = $('#delete-modal').data('id');
    console.log('id', id);

    $.post('/delete', {
        'id': id + ''
    }, function (data) {
        window.location.reload();
        console.log(data);
        if(data.error){
            alert(data.error.message);
        }
    })
});


$('#delete-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.data('id', id + '');


    document.getElementById('delete-modal').setAttribute('data-id', id);
})
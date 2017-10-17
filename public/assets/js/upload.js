$(document).ready(function() {

  // $('#submit').click(function () {
  //   $("#status").empty().text("File is uploading...");
  //   $(this).ajaxSubmit({
  //
  //     error: function(xhr) {
  //       status('Error: ' + xhr.status);
  //     },
  //
  //     success: function(response) {
  //       console.log(response);
  //       $("#status").empty().text(response);
  //     }
  //   });
  //   return false;
  // })


  $('#file').change(function(evt) {
    console.log(evt);
  });

  $('#uploadForm').submit(function(evt) {
    console.log("CALLLLLL");
    evt.preventDefault();
    $("#status").empty().text("File is uploading...");

    $(this).ajaxSubmit({

      error: function(xhr) {
        status('Error: ' + xhr.status);
      },

      success: function(response) {
        console.log(response);
        $("#status").empty().text(response);
      }
    });

    return false;
  });
});
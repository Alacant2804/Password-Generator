$(document).ready(function() {
  // AJAX call to the server to generate a password
  function generatePassword() {
    var length = $('#length').val();
    var include_uppercase = $('#include_uppercase').is(':checked');
    var include_lowercase = $('#include_lowercase').is(':checked');
    var include_numbers = $('#include_numbers').is(':checked');
    var include_symbols = $('#include_symbols').is(':checked');

    $.ajax({
        url: '/generate_password',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          length: length,
          include_uppercase: include_uppercase,
          include_lowercase: include_lowercase,
          include_numbers: include_numbers,
          include_symbols: include_symbols
        }),
        success: function(response) {
          $('#password-field').val(response.password);
        }
    });
  }

  // Generate password when page loads
  generatePassword();

  // Generate new password every time the slider value changes
  $('#length').on('input', function() {
    $('#length-display').text($(this).val());
    generatePassword();
  });

  // Generate new password every time a checkbox state changes
  $('.form-check-input').on('change', function() {
    generatePassword();
  });

  $('#copy').click(function(event) {
    event.preventDefault(); // Prevent the default form submission and page refresh
    var copyText = document.getElementById("password-field");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
  });
  $('#refresh').click(function() {
    location.reload();
});
});

$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    const maxLength = 140;
    const charCount = $(this).val().length;
    const remainingChars = maxLength - charCount;
    $('.counter').text(`${remainingChars}`);

    //if character count exceeds 140 add the exceeded class
    if (remainingChars < 0) {
      $('.counter').addClass('exceeded');
    } else {
      $('.counter').removeClass('exceeded');
    }
  });

});
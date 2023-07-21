/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const $tweet = $(`<article class="tweet" >
  <header class="tweet-header" >
    <div class="tweet-header-div">
      <div class="tweet-header-left">
        <img src= ${tweetData.user.avatars}>
        ${tweetData.user.name}
      </div>
      <div class="tweet-header-right">
        ${tweetData.user.handle}
      </div>
    </div>
  </header>
  <div class="tweet-material">
    ${tweetData.content.text}
  </div>
  <footer>
    <hr>
    <div class="tweet-footer-div">
      <div id="X DAYS AGO" >
        ${timeago.format(tweetData.created_at)}
      </div>
      <div>
        <i class="fa-solid fa-flag tweet-emojis" ></i>
        <i class="fa-solid fa-retweet tweet-emojis"></i>
        <i class="fa-solid fa-heart tweet-emojis"></i>
      </div>
    </div>
  </footer>
</article>`);
  return $tweet;
};

const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
 
};

// wait for page to be ready
$(function() {
  
  const loadTweets = function() {
    $.ajax("http://localhost:8080/tweets", {method: "GET"})
      .then(function(tweets) {
        console.log(tweets);
        renderTweets(tweets);
      });
  };
  // loading the tweets
  loadTweets();
  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    const formData = $('#tweetForm').serialize();
    console.log("formData" , formData);
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: formData,
      encode: true,
    }).then(function(data) {
      console.log("data", data);
    }).catch(function(err) {
      console.log("err ",err);
    });
  });



});




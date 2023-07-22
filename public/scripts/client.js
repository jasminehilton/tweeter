/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// a string literal of tweets in html
const createTweetElement = function(tweetData) {
  const $tweet = $(
    `<article class="tweet" >
  <header class="tweet-header" >
    <div class="tweet-header-div">
      <div class="tweet-header-left">
        <img src= ${escape1(tweetData.user.avatars)}>
        ${escape1(tweetData.user.name)}
      </div>
      <div class="tweet-header-right">
        ${escape1(tweetData.user.handle)}
      </div>
    </div>
  </header>
  <div class="tweet-material">
    ${escape1(tweetData.content.text)}
  </div>
  <footer>
    <hr>
    <div class="tweet-footer-div">
      <div>
        ${escape1(timeago.format(tweetData.created_at))}
      </div>
      <div>
        <i class="fa-solid fa-flag tweet-emojis" ></i>
        <i class="fa-solid fa-retweet tweet-emojis"></i>
        <i class="fa-solid fa-heart tweet-emojis"></i>
      </div>
    </div>
  </footer>
</article>`
  );
  return $tweet;
};

// renders new tweets
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
 
};

// escape1 function protects against cross side scripting
const escape1 = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// waits for dom to load before adding tweets to the page
$(function() {
  const loadTweets = function() {
    $.ajax("http://localhost:8080/tweets", {method: "GET"})
      .then(function(tweets) {
        $(".error").hide();
        const sortedTweets = tweets.sort((a,b) => {
          return a.created_at < b.created_at ? 1 : -1;
        });
        renderTweets(sortedTweets);
      });
  };

  // loads the tweets
  loadTweets();
  $("#tweetForm").submit(function(event) {
    event.preventDefault();
    const tweetBox = $('#tweet-text')[0].value;
    // checks if tweet form is empty
    if (!tweetBox) {
      return $("#errorEmpty").show();
    }
    // checks if tweet is over max length
    if (tweetBox.length > 140) {
      return $("#errorTooLong").show();
    }
    // serializes tweets
    const formData = $('#tweetForm').serialize();
    // ajax post request
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: formData,
      encode: true,
    }).then(function() {
      loadTweets();
    }).catch(function(err) {
      console.log("err ",err);
    });
  });
});




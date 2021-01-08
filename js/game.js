const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).removeClass("miss");
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  if (hits==1){
    firstHitTime = getTimestamp()
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".col").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(miss);
  var final_result = Number(Number(totalPlayedSeconds)+Number(miss)).toPrecision(3);
  $("#total-time-plus-miss").text(final_result);
  $("#win-message").removeClass("d-none");
  console.log($("input[name=username]").val()+'='+final_result)
  $.cookie($("input[name=username]").val(), final_result);
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(this).text('');
    round();
  }
  else{
    $(this).addClass("miss");
    miss = miss + 1;
  }
}

function init() {
  $(".col").addClass("d-none");
  $("#button-reload").addClass("d-none");
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  $("#button-start").click(function() {
    if ($("input[name=username]").val()!=''){
      $(".col").removeClass("d-none");
      $("#button-reload").removeClass("d-none");
      $(".input-group").addClass("d-none");
      $(this).addClass("d-none");
      $("h3").addClass("d-none");
    }
    else{
      $("h3").removeClass("d-none");
    }
  });
}

$(document).ready(init);

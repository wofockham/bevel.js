$(document).ready(function () {

  if (window.DeviceOrientationEvent === undefined) {
    console.log('Device orientation is not supported in this browser: giving up');
    return;
  }

  var $fader = $('.fader');
  var $hud = $('.hud');

  if (window.location.hash === '#hud') {
    $('.hud').fadeIn();
  }

  var opacity = function (yaw) {
    return (yaw / 180) * 1.5;
  };

  var status = function (props) {
    var statuses = [];
    for (var k in props) {
      statuses.push(k + ': ' + props[k]);
    }
    return statuses.join(', ');
  };

  var orientation = $(window).asEventStream('deviceorientation');

  orientation.onValue(function (e) {
    $fader.css('opacity', opacity(e.originalEvent.beta));
    $hud.text(status({
      opacity: opacity(e.originalEvent.beta),
      pitch: e.originalEvent.alpha,
      yaw: e.originalEvent.beta,
      roll: e.originalEvent.gamma
    }));
  })
});

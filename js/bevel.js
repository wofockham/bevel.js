$(document).ready(function () {

  if (window.DeviceOrientationEvent === undefined) {
    location.href = 'http://caniuse.com/';
    return;
  }

  var $fader = $('.fader');
  var $hud = $('.hud');

  if (window.location.hash === '#hud') {
    $hud.fadeIn();
  }

  var orientation = $(window).asEventStream('deviceorientation');

  var yaw = orientation.map('.originalEvent.beta');
  var opacity = yaw.map(function (v) {
    return (v / 180) * 1.5;
  });
  opacity.assign($fader, 'css', 'opacity');

  var status = orientation.map(function (v) {
    return [
      'alpha: ' + v.originalEvent.alpha,
      'beta: ' + v.originalEvent.beta,
      'gamma: ' + v.originalEvent.gamma
    ].join('<br>');
  });
  status.assign($hud, 'html');
});

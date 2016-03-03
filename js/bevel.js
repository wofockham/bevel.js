$(document).ready(function () {

  if (window.DeviceOrientationEvent === undefined) {
    console.log('Device orientation is not supported in this browser: giving up');
    return;
  }

  var $fader = $('.fader');
  var $hud = $('.hud');

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

  window.addEventListener('deviceorientation', function (e) {
    $fader.css('opacity', opacity(e.beta));
    $hud.text(status({
      opacity: opacity(e.beta),
      pitch: e.alpha,
      yaw: e.beta,
      roll: e.gamma
    }));
  });

  (window.location.hash === '#hud') && $('.hud').fadeIn();

});

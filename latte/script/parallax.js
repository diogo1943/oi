function cssParallax(cont, el, radiusVal) {
  $(cont).mousemove(function (event) {


    cx = Math.ceil($(window).width() / 2.0);
    cy = Math.ceil($(window).height() / 2.0);
    dx = event.pageX - cx;
    dy = event.pageY - cy;

    tiltx = (dy / cy);
    tilty = -(dx / cx);
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
    degree = (radius * radiusVal);

    $(el, cont).css('-webkit-transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    $(el, cont).css('transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
  });

}

$(document).ready(function () {
  cssParallax('.parallax-container', '.parallax-base', 20);
  cssParallax('.parallax-container.first', '.parallax-base', 20);
});

//--------

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  var radius = 30;

  var sampleJoystick = {
    mode: 'dynamic',
    /*position: {
      right: '50%',
      bottom: '50%'
    },*/
    size: radius * 2,
    color: 'black',
    //restOpacity: 0
  };

  var joystick;
  var position;

  joystick = nipplejs.create(sampleJoystick);

  joystick.on('start end', function (evt, data) {
    position = data;

  }).on('move', function (evt, data) {
    showCoords();

  }).on('dir:up plain:up dir:left plain:left dir:down' +
    'plain:down dir:right plain:right',
    function (evt, data) {}
  ).on('pressure', function (evt, data) {
    position = data;

  });


  function showCoords() {
    var nipplex = event.pageX;
    var nippley = event.pageY;
    //console.log('X: ' + nipplex + ' / Y:' + nippley);

    /*
        //console.log('oioioo');
        mouse.moved = true;
        mouse.x = xd - rect.left;
        mouse.y = yd - rect.top;*/


    cx = Math.ceil($(window).width() / 2.0);
    cy = Math.ceil($(window).height() / 2.0);
    dx = event.pageX - cx;
    dy = event.pageY - cy;


    tiltx = (dy / cy);
    tilty = -(dx / cx);
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
    degree = (radius * 20);

    var contk = '.parallax-container';

    var elk = '.parallax-base';

    $(elk, contk).css('-webkit-transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    $(elk, contk).css('transform', 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');

  }
}
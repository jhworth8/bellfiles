var picture = "toonbell1.png";
var sound = "clang.mp3";
var audio = new Audio(sound);
var lastRandom = 0;
var lastTouch = 0;

function changeImage(image) {
    picture = image;
    $('#cowbell-image').fadeOut(250, function() {
        $('#cowbell-image').attr('src', picture).fadeIn(250);
    });
    var r = Math.floor(Math.random() * 4) + 1;
    while (r == lastTouch) {
        r = Math.floor(Math.random() * 4) + 1;
    }
    lastTouch = r;
    var touch = new Audio("touch" + "1" + ".wav");
    touch.play();
}

function changeSound(newSound) {
    sound = newSound;
    audio = new Audio(sound);
    var r = Math.floor(Math.random() * 4) + 1;
    while (r == lastTouch) {
        r = Math.floor(Math.random() * 4) + 1;
    }
    lastTouch = r;
    var touch = new Audio("touch" + "1" + ".wav");
    touch.play();
}

function changeFade() {
    var fade = new Audio("fade.mp3");
    fade.play();
}

$(document).ready(function() {
	$('#splash').hide();
	$('#blue-loading-screen').show();
	setTimeout(function() {
		$('#blue-loading-screen').fadeOut('slow');
		$('#splash').show();
	}, 1500);
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                // handle response
            })
            .catch(console.error)
    }
        window.addEventListener("deviceorientation", function() {});

    $('#begin').click(function() {
        var audio = new Audio("bootup.mp3");
        audio.play();


        var audio = new Audio("silence.mp3");
        audio.play();
        $('#splash').hide();
        DeviceOrientationEvent.requestPermission();
    });

    $('#cowbell').click(function() {
        $('#menu-options').removeClass('open');
    });

    $('#cowbell-image').attr('src', picture);
    $('#cowbell-image').css('transform', 'rotate(0deg)');

    $('#menu').click(function() {
        $('#menu-options').toggleClass('open');
    });

    $('#menu-options .menu-option').click(function() {
        var option = $(this).html();
        switch(option) {
                        case 'Gold':
                changeImage("goldcowbell.png");
                break;
            case 'Pink':
                changeImage("pinkcowbellsparkle.gif");
                break;
            case 'Maroon':
                if (picture == "toonbell1.png") {
                    changeImage("cowbell.png");
                } else {
                    changeImage("toonbell1.png");
                }
                break;
            case 'Toon':
                changeImage("toonbell.png");
                break;
            case '???':
                var r = Math.floor(Math.random() * 10) + 1;
                while (r == lastRandom) {
                    r = Math.floor(Math.random() * 10) + 1;
                }
                lastRandom = r;
                changeImage("toonbell" + r + ".png");
                break;
                case 'Rainbow':
                    var audio = new Audio("rainbow.mp3");
                    audio.play();
                    var rainbow = setInterval(function() {
                        $('body').css('background-color', '#' + Math.floor(Math.random() * 16777215).toString(16));
                    }, 200);
                    setTimeout(function() {
                        $('body').css('background-color', '#FFFFFF');
                        clearInterval(rainbow);
                    }, 10000);
                break;
            case 'Clang':
                changeSound("clang.mp3");
                break;
            case 'Clong':
                changeSound("clong.mp3");
                break;

            case 'Cling':
                changeSound("cling.mp3");
                break;

            case 'Clung':
                changeSound("clung.mp3");
                break;

            case 'GOAT':
                changeSound("goat.mp3");
                break;


		$('#menu-options .menu-option').css('border-color', 'white');
            case 'Dark Mode':
                $('body').css('background-color', 'black');
                $('.menu-button-bar').css('background-color', 'white');
                changeFade();
		$('#menu-options').css('background-color', 'black');
                $('#menu-options .menu-option').css('color', 'white');
                $('#menu-options .menu-option').css('border', '1px solid white');
            $('#time').css('color', 'white');
                break;
            case 'Light Mode':
                $('body').css('background-color', 'white');
                $('.menu-button-bar').css('background-color', 'black');
		$('#menu-options').css('background-color', 'white');
                $('#menu-options .menu-option').css('color', 'black');
                $('#menu-options .menu-option').css('border', '1px solid black');
            $('#time').css('color', 'black');
                changeFade();
                break;
        }
    });

    var threshold = false;
        window.addEventListener('devicemotion', function(e) {
                var acceleration = Math.abs(e.acceleration.x) + Math.abs(e.acceleration.y) + Math.abs(e.acceleration.z);
                if (navigator.userAgent.includes("Android")) {
                    if (acceleration > 40) {
                        threshold = true;
                    }
                    if (acceleration > 2 && threshold) {
                    $('#cowbell-image').css('transform', 'rotate(' + e.acceleration.x + 'deg)').css('transform-origin', '50% 70%');

                    if (!play) {
                        audio.play();
                        play = true;
                        var tick = setInterval(function () {
                            if (play) {
                                navigator.vibrate(200);
                                $('#time').html(vibrations);
                                vibrations++;
                            } else {
                                clearInterval(tick);
                            }
                        }, 200);
                    }
                } else {
                    audio.pause();
                    play = false;
                    threshold = false;
                }

                }
        });
});
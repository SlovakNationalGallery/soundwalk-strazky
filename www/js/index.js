var audioMedia = null,
    audioTimer = null,
    duration = -1,
    is_paused = false,
    uzPulzoval = false;


$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    // onDeviceReady(); //only for debuging
});


function onDeviceReady() {
    StatusBar.hide();

    createList("exterier.json", "#exterier-list");
    createList("interier.json", "#interier-list");
    $("#exterier-list, #interier-list").collapsibleset();

    $(document).on('click', '#home-page' ,function(e){
        if (e.target.tagName === 'A' && e.target.id !== 'button-mednansky') return; // skip for links

        if ($('#button-mednansky').hasClass("active")) {
            $('.intro-nadpis').fadeTo('normal', 1);
            $('#menu').addClass('schovane');
            $('#button-mednansky').removeClass('active');
        } else {
            $('.intro-nadpis').fadeTo('normal', 0);
            $('#menu').removeClass('schovane');
            $('#button-mednansky').addClass('active');
        }
        // $('.menu-item').hide();
        event.stopPropagation();
    });

    // pulzovanie po spusteni
    if (!uzPulzoval) {
        pulse();
    }

    $("#exterier-list-page").bind("pageinit", function(event) {
        $("#interier-list a, #exterier-list a").removeClass("ui-btn-icon-left");
        $('.ui-nosvg .mapka .circle').removeClass("active");
    });


    $("#interier-list-page").bind("pageinit", function(event) {
        $("#interier-list a, #exterier-list a").removeClass("ui-btn-icon-left");
        $('.ui-nosvg .mapka .circle').removeClass("active");
    });


    $(document).on('click', '.player-play', function() {
        Player.playPause();
    })
    $(document).on('slidestop', '.time-slider', function(event) {
        Player.seekPosition(event.target.value);
    })

    $(document).on('click', ".external", function(e) {
        e.preventDefault();
        var targetURL = $(this).attr("href");
        cordova.InAppBrowser.open(targetURL, "_system");
    });

    $(document).on('collapsibleexpand', '.ui-collapsible', function() {
        $(this).children().next().slideDown(200);
        var index = $(this).find('.index').html();
        $('.mapka circle').attr("class", "");
        $('.mapka circle#zastavka' + index).attr("class", "active");
        // verzia bez SVG
        $('.ui-nosvg .mapka .circle').removeClass("active");
        $('.ui-nosvg .mapka .circle#zastavka' + index).addClass("active");
        if ($(this).parent().attr("id") == 'interier-list') {
            if (index == 1 || index == 8) {
                $('#kastiel1').show('slow');
                $('.mapka').removeClass('poschodie2');
            } else {
                $('#kastiel1').hide('slow');
                $('.mapka').addClass('poschodie2');
            }
        }
        $(".slider").slider('refresh');
        initPlayer($(this));
        // Player.playPause();
    })

    $(document).on('collapsiblecollapse', '.ui-collapsible', function() {
        $(this).children().next().slideUp(200);
    });

};

function createList(sourceFile, listId) {
    $.getJSON(sourceFile, function(data) {
        $.each(data, function(index, zastavka) {
            var listItem = '';
            listItem += '<div data-role="collapsible" class="track" rel="' + zastavka.audio + '">' +
                '<h3>' + zastavka.name + '<span class="index">' + (index + 1) + '</span></h3>' +
                '<div class="center-wrapper negative-margin">' +
                '<a href="#" class="player-play"><span class="icon-play"></span></a>' +
                '<div>' +
                '<label class="media-played">00:00</label><label class="media-duration">00:00</label><br />' +
                '<input type="range" class="time-slider" value="0" min="0" max="100" data-role="none" data-highlight="true" data-mini="true" />' +
                '</div>' +
                '</div>' +
                '</div>';
            $(listId).append(listItem);
        });

        $(listId + " .time-slider").slider();
        // $(listId + " .time-slider").trigger('create'); //pozor!
        $(listId).collapsibleset("refresh");

        // $(listId).on('collapsibleexpand', function () {
        //     alert('Expanded');
        // }).on('collapsiblecollapse', function () {
        //     alert('Collapsed');
        // });

        $("#interier-list a, #exterier-list a").removeClass("ui-btn-icon-left");

    });

}

function initPlayer(thePlayer) {
    Player.stop();

    var root_path = "/";
    if (device.platform == "Android") {
        root_path = "/android_asset/www/";
    }
    var soundfile = root_path + 'sounds/' + $(thePlayer).attr('rel');

    Player.initMedia(soundfile);
};

function closePlayer() {
    Player.stop();
};

function pulse() {
  $('#button-mednansky')
      .addClass("active")
      .delay(400).queue(function(next) {
          $(this).removeClass("active");
          next();
      });
  uzPulzoval = true;
}
/**
 * Обработка при загрузке страницы
 */
$(function() {

    $(window).scroll(function(event) {
        if ($('.catalog').length) {
            hambVisible();
        }
    });

    $('a[href*=#].anchor').bind("click", function(e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 700);
        e.preventDefault();
    });

    $('.primary__go').on('click', function(event) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $('.popular').offset().top
        }, 700);
    });

    //Вызов быстрого поиска
    $('.header__search input').on('input keyup focusout focusin', function(event) {
        if ($(this).val().length >= 3) {
            $('.fast_search').addClass('visible');
        } else {
            $('.fast_search').removeClass('visible');
        }
    });

    //Закрыть быстрый поиск при клике вне его
    $(document).on('click touchstart', function(event) {
        if (!$(event.target).closest('.header__search').length) {
            if ($('.fast_search').hasClass('visible')) {
                $('.fast_search').removeClass('visible');
            };
        };
    });

    // показать/скрыть .hamb_aside
    function hambVisible() {
        if ($(window).scrollTop() > $('.main').offset().top) {
            $('.hamb_aside').addClass('visible');
        } else {
            $('.hamb_aside').removeClass('visible');
        }
        if ($(window).scrollTop() > $('.main').offset().top + $('.main').height()) {
            $('.hamb_aside').removeClass('visible');
        }
    }

    //открыть боковое меню фильтра
    $('.hamb_aside').on('click', function(event) {
        $(this).parents('.catalog').addClass('open');
        $('#overlay').addClass('visible')
    });

    // Добавляем маску к вводу телефона
    $("input[type='tel']").each(function() {
        $(this).mask("+7 (999) 999-9999");
    });

    var swiperPrimary = new Swiper('.primary__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });

    $('.seotext__content').readmore({
        maxHeight: 150,
        speed: 300,
        moreLink: '<a class="seotext__link">Смотреть полностью <img src="images/ico/arr-bottom.png" alt=""></a>',
        lessLink: '<a class="seotext__link seotext__link--close">Скрыть <img src="images/ico/arr-bottom.png" alt=""></a>',
    });

    var swiperSidebar = new Swiper('.sidebar__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });

    //запрет ввода символов
    $(".rangeSlider input, .quantity__number").keypress(function(e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        var chr = getChar(e);
        if (chr == null) return;
        if (chr < '0' || chr > '9') {
            return false;
        }
    });

    //Запрет ввода 0 и чисел больше 99
    $('.quantity__number').on('input keyup focusout', function(e) {
        if ($(this).val() > 99) {
            $(this).val('99')
        }
        if ($(this).val() < 1) {
            $(this).val('1')
        }
    });

    var count = 1;

    //Изменение значения в поле по нажатию +/-
    $('.quantity__btn').on('click', function(event) {
        if ($(this).hasClass('quantity__btn--minus')) {
            count = Number($(this).parent().find('.quantity__number').val()) - 1;
            if (count < 1) {
                count = 1;
            };
            $(this).parent().find('.quantity__number').val(count);
        } else if ($(this).hasClass('quantity__btn--plus')) {
            count = Number($(this).parent().find('.quantity__number').val()) + 1;
            if (count > 99) {
                count = 99;
            };
            $(this).parent().find('.quantity__number').val(count);
        }
    });

    // $('.catalog__menu').multiaccordion({
    //     accordion: 'true',
    //     speed: 500,
    //     closedSign: '',
    //     openedSign: ''
    // });

    $('.catalog__menu .has-sub > ul').slideUp();

    $('.catalog__menu .has-sub > .arr').on('click', function() {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        } else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }

        // $('#menu>ul>li.has-sub>a').append('<span class="holder"></span>');
    });

    var swiperSidebar = new Swiper('.card__slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });

    //Выпадающее меню select
    $('select.nice-select').niceSelect();
    //Скролл для выпадающего меню
    $('.nice-select .list').perfectScrollbar();

    /* слайдер цен */
    $(".rangeSlider").slider({
        range: true,
        slide: function(event, ui) {
            $(this).find('.ui-slider-handle').find('.count').eq(0).text(ui.values[0]);
            $(this).find('.ui-slider-handle').find('.count').eq(1).text(ui.values[1]);
        },
        create: function(event, ui) {
            $(this).find('.ui-slider-handle').append('<div class="count"></div>');
            $(this).slider("option", "min", parseInt($(this).attr('data-minCount')));
            $(this).slider("option", "max", parseInt($(this).attr('data-maxCount')));
            $(this).slider("values", 0, parseInt($(this).attr('data-minCount')));
            $(this).slider("values", 1, parseInt($(this).attr('data-maxCount')));
            $(this).find('.ui-slider-handle').find('.count').eq(0).text($(this).slider("option", "min"));
            $(this).find('.ui-slider-handle').find('.count').eq(1).text($(this).slider("option", "max"));
        }
    });

    $('.filter').accordion({
        collapsible: true,
        active: 0,
        animate: 200,
        heightStyle: "content"
    });

    countdown.MY =
        countdown.DAYS |
        countdown.HOURS |
        countdown.MINUTES |
        countdown.SECONDS;

    var Interval = setInterval(function() {
        $('.timer').each(function(index, el) {
            thisData = new Date($(this).attr('data-year'), $(this).attr('data-month') - 1, $(this).attr('data-day'), $(this).attr('data-hours'), 0, 0, 0);
            Timer = countdown(null, thisData, countdown.MY);
            console.log(Timer)
            $(this).find('.day').text(Timer.days);
            $(this).find('.hour').text(Timer.hours);
            $(this).find('.minuteS').text(Timer.minuteS);
        });
    }, 1000);

    $('#change-file').on('change', function(event) {
        $('.change-file-text').text($(this).val())
    });

    if ($('#map_canvas').lenght) {
        mapInitialize();
    }
});

function mapInitialize() {

    var brooklyn = new google.maps.LatLng(59.92860856, 30.30128850);

    var stylez = [{
        featureType: "all",
        elementType: "all",
        //  stylers: [
        // { saturation: -100 } // <-- THIS
        //  ]
    }];

    var mapOptions = {
        zoom: 16,
        center: brooklyn,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
        draggable: true,
    };

    if ($(window).width() <= 1180) {
        mapOptions.draggable = false;
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: brooklyn,
        title: "Мы находимся тут!"
    });
}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }
    return null; // специальная клавиша
}
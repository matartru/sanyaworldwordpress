$(function() {
    "use strict";

    var menuWidth = $('.menu').outerWidth(),
        overviewWidth = $('.overview').outerWidth(),
        placesWidth = $('.places').outerWidth(),
        menuOpened = false,
        overviewOpened = false,
        placesOpened = true,
        mobileMenuOpened = false,
        siteVersion;

    // Determine site version
    if ($(window).width() >= 1200) {
        siteVersion = 'desktop';
    } else if ($(window).width() < 1200 && $(window).width() > 767) {
        siteVersion = 'tablet';
    } else if ($(window).width() <= 767) {
        siteVersion = 'mobile';
    }

    // Apply transitions
    setTimeout(function() {
        $('.sidebar').addClass('active');
        $('.sidebar, .sidebar__item').css('transition', 'all .3s ease');
    }, 0);

    function triggerMenu(overview) {
        menuOpened = !menuOpened;
        if (!overview) {
            if (menuOpened) {
                $('.menu-toggle').addClass('menu-toggle--close').find('span').removeClass('fa-bars').addClass('fa-times');
                $('.places').css('transform', 'translateX(0px)');
            } else {
                $('.menu-toggle').removeClass('menu-toggle--close').find('span').addClass('fa-bars').removeClass('fa-times');
                $('.places').css('transform', 'translateX(' + menuWidth + 'px)');
            }
        } else {
            if (menuOpened) {
                $('.menu-toggle').addClass('menu-toggle--close').find('span').removeClass('fa-bars').addClass('fa-times');
                $('.menu').removeClass('menu--hidden');
            } else {
                $('.menu-toggle').removeClass('menu-toggle--close').find('span').addClass('fa-bars').removeClass('fa-times');
                $('.menu').addClass('menu--hidden');
            }
        }
    }

    function triggerOverview() {
        overviewOpened = !overviewOpened;
        if (overviewOpened) {
            $('.sidebar').css('transform', 'translateX(0px)');
            if (siteVersion == 'tablet') {
                $('.places').css('transform', 'translateX(' + placesWidth + 'px)');
                placesOpened = false;
                $('.places-toggle-wrapper').addClass('active');
            }
            $('.mobile-header__btn--map').find('span').addClass('fa-map').removeClass('fa-list');
        } else {
            $('.sidebar').css('transform', 'translateX(' + overviewWidth + 'px)');
            $('.place-menu--fixed').removeClass('active');
            $('.mobile-header__btn--map').find('span').addClass('fa-list').removeClass('fa-map');
        }
    }

    function triggerPlaces() {
        placesOpened = !placesOpened;
        if (placesOpened) {
            $('.places').css('transform', 'translateX(0)');
            $('.places-toggle-wrapper').removeClass('active');
        } else {
            $('.places').css('transform', 'translateX(' + placesWidth + 'px)');
            $('.places-toggle-wrapper').addClass('active');
        }
    }

    //Initialize fastclick plugin
    FastClick.attach(document.body);


    // Initialize select plugin
    if ($('.select').length) {
        $('.select--dark').select2({
            minimumResultsForSearch: Infinity,
            theme: 'dark',
            templateResult: function(result, container) {
                if (!result.id) {
                    return result.text;
                }
                container.className += ' needsclick';
                return result.text;
            }
        });
        $('.select--gray').select2({
            minimumResultsForSearch: Infinity,
            theme: 'gray',
            templateResult: function(result, container) {
                if (!result.id) {
                    return result.text;
                }
                container.className += ' needsclick';
                return result.text;
            }
        });
    }


    var $customSelects = $('select');

    /**
     * Additional to tweaking the templateResult option in Select2,
     * add needsclick class to all DOM elements in the Select2 container,
     * so they can be accessible on iOS mobile when FastClick is initiated too.
     *
     * More info about needsclick:
     * https://github.com/ftlabs/fastclick#ignore-certain-elements-with-needsclick
     *
     */
    $customSelects.each(function(index, el) {
        $(el).data('select2').$container.find('*').addClass('needsclick');
    });


    // Initialize parallax plugin
    $('.overview').stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });

    // Initialize countdown plugin
    if ($(".event-view-info__countdown").length) {
        $(".event-view-info__countdown").countdown($(".event-view-info__countdown").attr('data-date'), function(event) {
            $('.countdown-flip--days').html(event.strftime('%D'));
            $('.countdown-flip--hours').html(event.strftime('%H'));
            $('.countdown-flip--minutes').html(event.strftime('%M'));
        });
    }

    // Initialize lightbox plugin
    if ($('.lightbox').length) {
        $('.lightbox').lightbox();
    }


    // Booking form
    if ($('#booking-form').length) {
        var userChoice = {};
        userChoice.time = $('input[name="booking-time"]:checked').next().text();
        $('.booking-status__time').text($('input[name="booking-time"]:checked').next().text());
        $('input[name="booking-time"]').change(function() {
            $('.booking-status__time').text($('input[name="booking-time"]:checked').next().text());
            userChoice.time = $('input[name="booking-time"]:checked').next().text();
        });

        function parseDate(date) {

            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
        $('.booking-status__date').text(parseDate(new Date()));


        // Initialize datepicker plugin
        var picker = new Pikaday({
            'showDaysInNextAndPreviousMonths': true,
            onSelect: function(date) {
                $('.booking-status__date').text(parseDate(date));
                userChoice.date = date;
            }
        });

        $('.calendar').html(picker.el);

        var previousCss = $('#booking').attr("style");

        $('#booking')
            .css({
                position: 'absolute',
                visibility: 'hidden',
                display: 'block'
            });

        $('.booking-screen-wrap').height($('.booking-screen.active').outerHeight());

        $('#booking').attr("style", previousCss ? previousCss : "");

        $('[data-booking-screen-refresh]').click(function(e) {
            e.preventDefault();
            if (siteVersion == 'mobile') {
                $('.modal.fade.in .modal-dialog-wrapper').animate({ scrollTop: 0 }, 100);
            }
            setTimeout(function() {
                $('.booking-screen-wrap').animate({ height: $('.booking-screen.active').outerHeight() }, 100);
                $('.booking-steps').animate({ scrollLeft: $('.booking-steps__item.active').offset().left + $('.booking-steps').scrollLeft() - 10 }, 100);
            }, 10);
        });
    }

    // Chat
    if ($('.chat').length) {
        var paddingValue = (siteVersion == 'mobile') ? 0 : 60;

        function calcChatWindowsHeight() {
            $('.chat-windows').css('height', $('.chat-window.active').height());
        }

        function calcChatContactsMaxHeight() {
            $('.chat-contacts').css('maxHeight', $(window).height() - paddingValue - parseInt($('.chat').css('padding-top'), 10) - $('.chat__header').outerHeight());
        }

        function calcChatMessagesHeight() {
            if (siteVersion == 'desktop') {
                $('.chat-messages').css('height', $(window).height() - paddingValue - parseInt($('.chat').css('padding-top'), 10) - $('.chat__header').outerHeight() - $('.chat-input').outerHeight());
            } else {
                $('.chat-messages').css('height', $(window).height() - paddingValue - parseInt($('.chat').css('padding-top'), 10) - $('.chat__header').outerHeight() - $('.chat-input').outerHeight() - $('.chat-contacts').outerHeight());
            }

            calcChatWindowsHeight();
        }

        $(window).load(function() {
            $('#chat')
                .css({
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'block'
                });
            calcChatContactsMaxHeight();
            calcChatMessagesHeight();
            $('#chat').attr("style", previousCss ? previousCss : "");
        });
        $(window).resize(function() {
            calcChatContactsMaxHeight();
            calcChatMessagesHeight();
        });


        if (siteVersion != 'desktop') {
            $('.chat-contact').click(function() {
                setTimeout(function() {
                    $('.chat-contacts').animate({ scrollLeft: $('.chat-contact.active').position().left + $('.chat-contacts').scrollLeft() }, 100);
                }, 10)
            });
        }
    }

    // Initialize range plugin
    if ($('.range').length) {
        var range = $('.range'),
            rangeEl = range[0];
        noUiSlider.create(rangeEl, {
            connect: true,
            range: {
                'min': Number(range.attr('data-min')),
                'max': Number(range.attr('data-max'))
            },
            step: Number(range.attr('data-step')),
            tooltips: true,
            format: wNumb({
                decimals: 0,
                thousand: '',
                postfix: range.attr('data-postfix')
            }),
            start: [Number(range.attr('data-start-1')), Number(range.attr('data-start-2'))]
        });
    }


    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Hide inactive sections
    if (siteVersion == 'desktop') {
        $('.places').css('transform', 'translateX(' + menuWidth + 'px)');
    }
    $('.sidebar').css('transform', 'translateX(' + overviewWidth + 'px)');

    if (siteVersion == 'mobile') {
        triggerPlaces();
    }


    // Trigger menu
    $('.menu-toggle').click(function() {
        triggerMenu($(this).hasClass('menu-toggle--overview'));
    });

    // Trigger places
    $('.places-toggle').click(function() {
        triggerPlaces();
    });

    // Trigger overview section
    if (siteVersion != 'mobile') {
        if ($('.overview').hasClass('active')) {
            triggerOverview();
        }
    } else {
        $('.pin').click(function() {
            triggerOverview();
        });
        if ($('.overview').hasClass('overview--mobile-active')) {
            triggerOverview();
        }
    }
    $('[data-overview-toggle]').click(triggerOverview);

    // Change icons of mobile menu triggers
    function mobileMenuIconToggle() {
        mobileMenuOpened = !mobileMenuOpened;
        if (mobileMenuOpened) {
            $('.mobile-menu-toggle').find('span').removeClass('fa-bars').addClass('fa-times');
        } else {
            $('.mobile-menu-toggle').find('span').addClass('fa-bars').removeClass('fa-times');
        }
    }
    $('.mobile-menu-toggle').click(mobileMenuIconToggle);

    // Recognize swipes
    if (siteVersion == 'mobile') {

        var hammerMain = new Hammer($('main')[0]);
        hammerMain.get('swipe').set({
            threshold: 200,
            velocity: 0.3
        });
        hammerMain.on('swiperight', function(ev) {
            mobileMenuIconToggle();
            $('.mobile-menu').addClass('active');
        });
        hammerMain.on('swipeleft', function(ev) {
            triggerOverview();
        });
    }

    // Scroll the section down if the collapsed element is at the bottom
    $('.collapse-content').on('shown.bs.collapse', function() {
        if ($(this).parents('section').is(':last-child')) {
            var sidebarItem = $(this).parents('.sidebar__item');
            sidebarItem.animate({ scrollTop: sidebarItem.prop("scrollHeight") }, 300);
        }
    });

    // Click on the background closes opened modal
    $('body').on('click', '.modal', function(e) {
        if (!($(e.target).hasClass('modal-dialog') || $(e.target).parents('.modal-dialog').length)) {
            $('.modal').modal('hide');
        }
    });

    // Click outside of the menu closes menu
    if (siteVersion == 'desktop') {
        $('body').on('click', 'main', function(e) {
            if ($('.menu-toggle--overview').length) {
                if (!($(e.target).hasClass('menu') || $(e.target).parents('.menu').length || $(e.target).hasClass('menu-toggle') || $(e.target).parents('.menu-toggle').length)) {
                    menuOpened = false;
                    $('.menu-toggle span').addClass('fa-bars').removeClass('fa-times');
                    $('.menu').addClass('menu--hidden');
                }
            } else {
                if (!($(e.target).hasClass('menu') || $(e.target).parents('.menu').length || $(e.target).hasClass('menu-toggle') || $(e.target).parents('.menu-toggle').length)) {
                    menuOpened = false;
                    $('.menu-toggle span').addClass('fa-bars').removeClass('fa-times');
                    $('.places').css('transform', 'translateX(' + menuWidth + 'px)');
                }
            }
        });
    }



    // Click outside of filter closes menu
    $('body').on('click', 'main', function(e) {
        if ($('.filter-window.active').length) {
            if (!($(e.target).hasClass('filter-window') || ($(e.target).attr('data-toggle-active') == '.filter-window') || ($(e.target).parents('button').attr('data-toggle-active') == '.filter-window') || $(e.target).parents('.filter-window').length)) {
                $('.filter-window').removeClass('active');
            }
        }
    });


    // Toggle active classes
    $('[data-toggle-active]').click(function() {
        $($(this).attr('data-toggle-active')).toggleClass('active');
    });

    // Add active classes
    $('[data-add-active]').click(function() {
        if ($(this).attr('data-add-active-individual')) {
            $($(this).attr('data-add-active-individual')).removeClass('active');
        }
        $($(this).attr('data-add-active')).addClass('active');
    });


    // Smooth scrolling
    $('[data-scroll]').click(function(e) {
        e.preventDefault();
        var sidebarItem = $(this).parents('.sidebar__item');
        if (!sidebarItem.length) {
            sidebarItem = $('.overview');
        }
        if (siteVersion != 'mobile') {
            sidebarItem.animate({
                scrollTop: sidebarItem.scrollTop() + $($(this).attr('data-scroll')).offset().top - $('.place-menu--fixed').height()
            }, 500);
        } else {
            sidebarItem.animate({
                scrollTop: sidebarItem.scrollTop() + $($(this).attr('data-scroll')).offset().top - $('.place-menu--fixed').height() - 60
            }, 500);
        }
        return false;
    });

    //Place menu
    if ($('.place-menu').length) {
        var placeMenu = $('.place-menu').not('.place-menu--fixed'),
            placeMenuFixed = $('.place-menu--fixed'),
            placeMenuOffset = placeMenu.offset().top;
        placeMenuFixed.css('width', placeMenu.outerWidth());
        if (siteVersion != 'mobile') {
            $('.overview').scroll(function() {
                if ($('.overview').scrollTop() >= placeMenuOffset) {
                    if (!placeMenuFixed.hasClass('active')) {
                        placeMenuFixed.addClass('active');
                    }
                } else {
                    placeMenuFixed.removeClass('active');
                }
            });
        } else {
            $('.overview').scroll(function() {
                if ($('.overview').scrollTop() + 58 >= placeMenuOffset) {
                    if (!placeMenuFixed.hasClass('active')) {
                        placeMenuFixed.addClass('active');
                    }
                } else {
                    placeMenuFixed.removeClass('active');
                }
            });
        }

    }

    //Max height
    function maxHeight(e, wrapper, outer) {
        var eMaxHeight = Math.max.apply(null, $(e).map(function() {
            return $(this).outerHeight();
        }).get());

        if (outer) {
            $(wrapper).outerHeight(eMaxHeight);
        } else {
            $(wrapper).height(eMaxHeight);
        }
    }
    if (siteVersion != 'desktop') {
        maxHeight('.grid-item--post', '.grid-item--post', true);
    }

});


$.extend($.easing,
{
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

(function( $ ) {

    var settings;
    var disableScrollFn = false;
    var navItems;
    var navs = {}, sections = {};

    $.fn.navScroller = function(options) {
        settings = $.extend({
            scrollToOffset: 170,
            scrollSpeed: 800,
            activateParentNode: true,
        }, options );
        navItems = this;

        //attatch click listeners
    	navItems.on('click', function(event){
            var navID = $(this).attr("href").substring(1);
            if (! document.getElementById(navID)) {
              return
            }
            event.preventDefault();
            disableScrollFn = true;
            activateNav(navID);
            populateDestinations(); //recalculate these!
        	$('html,body').animate({scrollTop: sections[navID] - settings.scrollToOffset},
                settings.scrollSpeed, "easeInOutExpo", function(){
                    disableScrollFn = false;
                }
            );
    	});

        //populate lookup of clicable elements and destination sections
        populateDestinations(); //should also be run on browser resize, btw

        // setup scroll listener
        $(document).scroll(function(){
            if (disableScrollFn) { return; }
            var page_height = $(window).height();
            var pos = $(this).scrollTop();
            for (i in sections) {
                if ((pos + settings.scrollToOffset >= sections[i]) && sections[i] < pos + page_height){
                    activateNav(i);
                }
            }
        });
    };

    function populateDestinations() {
        navItems.each(function(){
            var scrollID = $(this).attr('href').substring(1);
            navs[scrollID] = (settings.activateParentNode)? this.parentNode : this;
            sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
        });
    }

    function activateNav(navID) {
        for (nav in navs) { $(navs[nav]).removeClass('active'); }
        $(navs[navID]).addClass('active');
    }
})( jQuery );


$(document).ready(function (){

    $('nav li a').navScroller();

    //section divider icon click gently scrolls to reveal the section
	$(".sectiondivider").on('click', function(event) {
    	$('html,body').animate({scrollTop: $(event.target.parentNode).offset().top - 50}, 400, "linear");
	});

    //links going to other sections nicely scroll
	// $(".container a").each(function(){
    //     if ($(this).attr("href").charAt(0) == '#'){
    //         $(this).on('click', function(event) {
    //     		event.preventDefault();
    //             var target = $(event.target).closest("a");
    //             var targetHight =  $(target.attr("href")).offset().top
    //         	$('html,body').animate({scrollTop: targetHight - 170}, 800, "easeInOutExpo");
    //         });
    //     }
	// });

    function setLanguage(lang) {
        // console.log("setLanguage called with:", lang); // 可以保留 console.log 用于调试
        if (lang === 'zh') {
            $('.lang-zh').show();
            $('.lang-en').hide();
            localStorage.setItem('preferredLanguage', 'zh');
            // Handle titles
            $('h5.icon-title .lang-zh').show();
            $('h5.icon-title .lang-en').hide();
        } else { // English
            $('.lang-en').show();
            $('.lang-zh').hide();
            localStorage.setItem('preferredLanguage', 'en');
             // Handle titles
            $('h5.icon-title .lang-en').show();
            $('h5.icon-title .lang-zh').hide();
        }
        // console.log("Language set. English visible:", $('.lang-en').is(':visible'));
        // console.log("Language set. Chinese visible:", $('.lang-zh').is(':visible'));
        $('#lang-switcher-zh').css('font-weight', lang === 'zh' ? 'bold' : 'normal');
        $('#lang-switcher-en').css('font-weight', lang === 'en' ? 'bold' : 'normal');
    }

    // 绑定点击事件
    $('#lang-switcher-en').on('click', function(e) {
        e.preventDefault();
        // console.log("English button clicked");
        setLanguage('en');
    });

    $('#lang-switcher-zh').on('click', function(e) {
        e.preventDefault();
        // console.log("Chinese button clicked");
        setLanguage('zh');
    });

    // 设置初始语言
    var preferredLang = localStorage.getItem('preferredLanguage');
    // console.log("Stored language:", preferredLang);
    if (!preferredLang) {
         preferredLang = 'en'; // 如果没有存储记录，默认英文
         // console.log("Defaulting to English");
    }
    setLanguage(preferredLang);

});


var dir = angular.module("mxsDirective",[]);

dir.directive('skinSelect',function ($window) {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            head.js("assets/js/tip/jquery.tooltipster.js", function() {
                $('.tooltip-tip-x').tooltipster({
                    position: 'right'
                });
                $('.tooltip-tip').tooltipster({
                    position: 'right',
                    animation: 'slide',
                    theme: '.tooltipster-shadow',
                    delay: 1,
                    offsetX: '-12px',
                    onlyOne: true
                });
                $('.tooltip-tip2').tooltipster({
                    position: 'right',
                    animation: 'slide',
                    offsetX: '-12px',
                    theme: '.tooltipster-shadow',
                    onlyOne: true
                });
                $('.tooltip-top').tooltipster({
                    position: 'top'
                });
                $('.tooltip-right').tooltipster({
                    position: 'right'
                });
                $('.tooltip-left').tooltipster({
                    position: 'left'
                });
                $('.tooltip-bottom').tooltipster({
                    position: 'bottom'
                });
                $('.tooltip-reload').tooltipster({
                    position: 'right',
                    theme: '.tooltipster-white',
                    animation: 'fade'
                });
                $('.tooltip-fullscreen').tooltipster({
                    position: 'left',
                    theme: '.tooltipster-white',
                    animation: 'fade'
                });
                //For icon tooltip



            });
            
            $("#skin-select #toggle").click(function(){
                if($(this).hasClass('active')) {
                    $(this).removeClass('active')
                    $('#skin-select').animate({ left:0 }, 100); 
                    $('.wrap-fluid').css({"width":"auto","margin-left":"250px"});
                    $('.navbar').css({"margin-left":"240px"});

                    $('#skin-select li').css({"text-align":"left"});
                    $('#skin-select li span, ul.topnav h4, .side-dash, .noft-blue, .noft-purple-number, .noft-blue-number, .title-menu-left').css({"display":"inline-block", "float":"none"});
                    //$('body').css({"padding-left":"250px"});
                    
                    
                    $('.ul.topnav li a:hover').css({" background-color":"green!important"});

                    $('.ul.topnav h4').css({"display":"none"});

                    $('.tooltip-tip2').addClass('tooltipster-disable');
                    $('.tooltip-tip').addClass('tooltipster-disable');

                    
                    $('.datepicker-wrap').css({"position":"absolute", "right":"300px"});
                    $('.skin-part').css({"visibility":"visible"});
                    $('#menu-showhide, .menu-left-nest').css({"margin":"10px"});
                    $('.dark').css({"visibility":"visible"});

                    $('.search-hover').css({"display":"none"});
                    $('.dropdown-wrap').css({"position":"absolute", "left":"0px", "top":"53px"});



                    
                }else {
                    $(this).addClass('active')
                    

                    //$('#skin-select').animate({ left:-200 }, 100);
                    $('#skin-select').animate({ left:-200 }, 100);

                    $('.wrap-fluid').css({"width":"auto", "margin-left":"50px"});
                    $('.navbar').css({"margin-left":"50px"});

                    $('#skin-select li').css({"text-align":"right"});
                    $('#skin-select li span, ul.topnav h4, .side-dash, .noft-blue, .noft-purple-number, .noft-blue-number, .title-menu-left').css({"display":"none"});
                    //$('body').css({"padding-left":"50px"});
                    $('.tooltip-tip2').removeClass('tooltipster-disable');
                    $('.tooltip-tip').removeClass('tooltipster-disable');
                    
                    $('.datepicker-wrap').css({"position":"absolute", "right":"84px"});
                    
                    $('.skin-part').css({"visibility":"visible", "top":"3px"});
                    $('.dark').css({"visibility":"hidden"});
                    $('#menu-showhide, .menu-left-nest').css({"margin":"0"});

                    $('.search-hover').css({"display":"block", "position":"absolute", "right":"-100px"});

                    $('.dropdown-wrap').css({"position":"absolute", "left":"-10px", "top":"53px"});


                    

                }
                return false;
            });
            // show skin select for a second
            setTimeout(function(){$("#skin-select #toggle").addClass('active').trigger('click');},10)

            head.js("assets/js/custom/scriptbreaker-multiple-accordion-1.js", function() {

                $(".topnav").accordionze({
                    accordionze: true,
                    speed: 500,
                    closedSign: '<img src="assets/img/plus.png">',
                    openedSign: '<img src="assets/img/minus.png">'
                });

            });
            head.js("assets/js/slidebars/slidebars.min.js", "http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js", function() {

                $(document).ready(function() {
                    var mySlidebars = new $.slidebars();

                    $('.toggle-left').on('click', function() {
                        mySlidebars.toggle('right');
                    });
                });
            });
            head.js("assets/js/search/jquery.quicksearch.js", function() {
                $('input.id_search').quicksearch('#menu-showhide li, .menu-left-nest li');
            });
        }
    
    };
});

dir.directive('mxToolTitle',function () {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            $(element).tooltip();
        }
    };
});

dir.directive('mxDigitalClock',function () {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            $(element).clock({
                offset: '+8',
                type: 'digital'
            });
        }
    };
});

dir.directive('mxNtTitle',function () {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            $(element).newsTicker({
                row_height: 18,
                max_rows: 1,
                duration: 5000,
                pauseOnHover: 0
            });
        }
    };
});

dir.directive('mxSetDate',function () {
    return {
        restrict : 'A',
        scope : {},
        link : function($scope, element, attrs) {
            var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",
                "七月", "八月", "九月", "十月", "十一月", "十二月"
            ];
            var dayNames = ["星期日, ", "星期一, ", "星期二, ", "星期三, ", "星期四, ", "星期五, ", "星期六, "]

            var newDate = new Date();
            // newDate.setDate(newDate.getDate() + 1);
            $(element).html(dayNames[newDate.getDay()] + " " + newDate.getFullYear() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getDate());

        }
    };
});
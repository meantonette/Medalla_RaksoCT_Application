class StickyNavigation {
    
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        this.init();
    }

    init() {
        let self = this;
        $('.et-hero-tab').click(function(event) { 
            self.onTabClick(event, $(this)); 
        });
        $(window).on('scroll', () => { this.onScroll(); });
        $(window).on('resize', () => { this.onResize(); });
    }
    
    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
    
    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }
    
    onResize() {
        if(this.currentId) {
            this.setSliderCss();
        }
    }
    
    checkTabContainerPosition() {
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        } else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
        }
    }
    
    findCurrentTabSelector() {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function() {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if(this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }
    
    setSliderCss() {
        let width = 0;
        let left = 0;
        if(this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }
}

$(document).ready(function() {
    new StickyNavigation();
});



window.onload = function () {
    const minFontSize = 48;
    const maxFontSize = 1500;
    const percentSize = (maxFontSize - minFontSize) / 100; 

    lax.init()

    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    lax.addElements('#sticky', {
      
    }, {
        onUpdate: function (driverValues, domElement) {
            const sticky = document.querySelector('#sticky');
            const video = document.querySelector('.video-container');
            const videoTest = document.querySelector('#banner-video');
            const container = document.querySelector('.scroll-container');
            const fullScroll = sticky.clientHeight;
            const scrollY = driverValues.scrollY[0];
          
            const scrollPercentage = scrollY / fullScroll * 100;
          
            let fontSize = minFontSize + scrollPercentage * percentSize;
            fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
          
            domElement.style.fontSize = fontSize + "px"
            
            if (scrollY >= fullScroll) {
              sticky.classList.add('hide');
              setTimeout(function () {
                sticky.style.visibility = 'hidden';
              }, 350);
              videoTest.play();
            } else {
              sticky.style.visibility = 'visible';
              sticky.classList.remove('hide');
              
              
              videoTest.pause();
              videoTest.currentTime = 0;
            }
        }
    })
}
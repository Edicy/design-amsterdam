'use strict';

/* Form placeholders */
(function($) {
  var EdicyFormPlaceholders = function(el) {
    this.$el = $(el);
    this.init();
  };

  EdicyFormPlaceholders.prototype = {
    init: function() {
      $('.form_field').each($.proxy(function(idx, field) {
        if ($(field).find('input[type="text"]').length > 0) {
          $(field).find('input[type="text"]').attr('placeholder', $(field).find('label').text());
          $(field).find('label').hide();
          if ($.fn.placeholder) {
            $(field).find('input[type="text"]').placeholder();
          }
        }
        if ($(field).find('textarea').length > 0) {
          $(field).find('textarea').attr('placeholder', $(field).find('label').text());
          $(field).find('label').hide();
          if ($.fn.placeholder) {
            $(field).find('textarea').placeholder();
          }
        }
      }, this));
    }
  };

  $.fn.edicyFormPlaceholders = function () {
    return this.each(function () {
      var data = $(this).data('edicyFormPlaceholders');
      if (!data) {
        $(this).data('edicyFormPlaceholders', new EdicyFormPlaceholders(this));
      }
    });
  };
})(jQuery);

/* General JS */
;(function($) {

  var editmode = $('html').hasClass('editmode');

  // TODO: Remove if Edicy is going to wrap table with the container
  var wrapTables = function() {
    if (!editmode) {
      $.each($('.content-formatted table'), function() {
        $(this).wrap('<div class="table-container overthrow"></div>');
      });
    }
  };

  var toggleMainMenu = function() {
    $('.js-menu-toggle').click(function() {
      $(this).toggleClass('open');
      $('.mobile-menu').toggleClass('expanded');
      if ($(this).hasClass('open')) {
        $('.js-search').addClass('hidden');
      } else {
        $('.js-search').removeClass('hidden');
      }
    });
  };

  var toggleLangMenu = function() {
    $('#lang-menu-toggle').click(function(event) {
      event.stopPropagation();
      $(this).toggleClass('open');
      $('#toggleable-lang-menu').toggleClass('expanded');
    });
    $('body').on('click', function(event) {
      var $t = $(event.target);
      if ($t.closest('.toggleable-lang-menu').length === 0 && !$t.is('#toggleable-lang-menu')) {
        $('#toggleable-lang-menu').removeClass('expanded');
        $('body').removeClass('voog-search-visible');
      }
      $('#lang-menu-toggle').removeClass('open');
    });
  };

  var handlePopoverMenuHide = function() {
    $('html').click(function(event) {
      var $t = $(event.target);
      if ($t.closest('.mobile-menu').length === 0 && $t.closest('.toggle-btn').length === 0) {
        if ($('.mobile-menu').hasClass('expanded')) {
          $('.mobile-menu').removeClass('expanded');
          $('.js-menu-toggle').removeClass('open');

          if (!$('.js-menu-toggle').hasClass('open')) {
            $('.js-search').removeClass('hidden');
          }
        }
      }
    });
  };

  var handleSubMenuLocation = function() {
    if($(window).width() <= 999){
      $('.sidebar-left').prependTo('.content-top .content-first');
    } else {
      $('.sidebar-left').prependTo('.content-top');
    }
  };

  var handleSearch = function() {
    $('.js-search-open').click(function(event) {
      event.stopPropagation();
      $('body').addClass('voog-search-visible');
    });

    $('.js-search-close').click(function(event) {
      $('body').removeClass('voog-search-visible');
    });

    $('.js-search-input').click(function(event) {
      event.stopPropagation();
    });
  };

  var checkScrollBar = function() {
    jQuery.fn.hasScrollBar = function(direction) {
      if (direction == 'vertical') {
        return this.get(0).scrollHeight > this.innerHeight();
      } else if (direction == 'horizontal') {
        return this.get(0).scrollWidth > this.innerWidth();
      }
      return false;
    };
  };

  var handleTableHorizontalScrolling = function() {
    $.each($('.table-container'), function() {
      if ($(this).hasScrollBar('horizontal') === true) {
        $(this).addClass('horizontal-scroll');
      } else {
        $(this).removeClass('horizontal-scroll');
      }
    });
  };

  var handleWindowResize = function() {
    $(window).resize(function() {
      handleSubMenuLocation();
      handleTableHorizontalScrolling();
    });
  };

  var handlePostMinHeight = function() {
    $(window).ready(function(){
      $('.post').each(function(n, el) {
        var $post = $(el);
        var height = $post.find('.post-header').height();
        $post.find('.post-content').css('min-height', height);
      });
    });
  };

  var focusCommentsWithErrors = function() {
    $(document).ready(function() {
      if ($('.comment-form').hasClass('form_with_errors')) {
        $('html, body').scrollTop($('.comment-form').offset().top);
      } else if ($('form').find('.form_error, .form_notice').length > 0) {
        $('html, body').scrollTop($('.form_error, .form_notice').closest('form').offset().top);
      }
    });
  };

  // Initiations
  var initFrontPage = function(animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
  };
  var initCommonPage = function(animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
    if ($.fn.autogrow) {
      $('.form_field_textarea').autogrow();
    }
    $(window).ready(function() {
      if (!($.trim($('.content-header').get(0).innerHTML))) {
        $('.content-header').hide();
      }
    });
    focusCommentsWithErrors();
  };
  var initArticlePage = function(animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: false,
        stickyPostHeaders: false
      });
    }
    if ($.fn.autogrow) {
      $('.form_field_textarea').autogrow();
    }
    focusCommentsWithErrors();
  };
  var initBlogPage = function(animation) {
    animation = typeof animation == 'undefined' ? false : animation;
    if (animation) {
      initStickyElements({
        stickyHeader: true,
        stickyMobileMenu: true,
        stickyFooter: true,
        stickyPostHeaders: true
      });
    }
    handlePostMinHeight();
  };

  var initStickyElements = function(opts) {
    var stickyHeader = opts.stickyHeader || false,
    stickyMobileMenu = opts.stickyMobileMenu || false,
    stickyFooter = opts.stickyFooter || false,
    stickyPostHeaders = opts.stickyPostHeaders || false,
    startScroll,
    endScroll,
    scrolled,
    container = $('.container'),
    header = $('.header'),
    footer = $('.footer'),
    headerStaticArea = $(header).height() + 90,
    footerStaticArea = $(footer).height() + 90,
    footerExpandTimeout,
    latestKnownScrollY = 0,
    ticking = false;

    var getPostHeights = function () {
      var posts = $('.post'),
      heights = [];
      posts.each(function(n, el) {
        heights.push(el.getBoundingClientRect().top);
      });
      return heights;
    };

    var handler = function (postHeights) {
      if (!startScroll) {
        startScroll = $(window).scrollTop();
      } else {
        endScroll = $(window).scrollTop();
        scrolled = endScroll - startScroll;
        if (window.innerWidth < 640 && stickyMobileMenu) {
          if (scrolled > 5 && startScroll > headerStaticArea) {
            $('.topbar').addClass('fixed').css({'top' : -headerStaticArea});
          } else if (scrolled < -5 && startScroll > headerStaticArea) {
            $('.topbar').addClass('fixed').css({'top' : 0});
          } else if (scrolled < 0 && startScroll <= 100 && $('.topbar').hasClass('fixed') === true) {
            $(container).css({'margin-top' : 0});
            $('.topbar').removeClass('fixed');
          }
        }
        if (window.innerWidth > 640 && stickyFooter) {
          if ($('.post').eq(0).offset().top - $(window).innerHeight() + 90 < $(document).scrollTop()) {
            if (startScroll + window.innerHeight <= $(document).height() - footerStaticArea - 40) {
              // above footer
              if (scrolled < -5) {
                fixFooter(false);
              // down and above footer
            } else if (scrolled > 5) {
              hideFooter();
            }
          } else {
              // down and below footer + 90px
              resetFooter();
            }
          } else {
            resetFooter();
          }
        }
        if (stickyHeader && $(header).find('.header-inner').height() < 60) {
          // Scrolling down and offset is larger than
          if (scrolled > 5 && startScroll > headerStaticArea) {
            hideHeader();

          // Up and fixed area
        } else if (scrolled < -5 && startScroll > headerStaticArea) {
          fixHeader();
          setTimeout(function() {
            if ($(window).scrollTop() <= headerStaticArea) {
              resetHeader();
            }
          }, 20);

          // Up, static area and header is fixed
        } else if (scrolled < -5 && startScroll <= headerStaticArea) {
          resetHeader();
        }
      }
      startScroll = 0;
    }
    if (window.innerWidth > 640 && stickyPostHeaders) {
      $('.post').each(function(n, el) {
        var offset = 30,
        $header = $(el).find('.post-header'),
        topBoundary = 0 + offset,
        bottomBoundary = -($(el).height() - offset - $header.height());

          // scroll is between top and bottom of the .post
          if (postHeights[n] < topBoundary) {
            // scroll is inside .post
            if (postHeights[n] > bottomBoundary) {
              $header.removeClass('top bottom');
              $(el).addClass('fixed-header');
            // scroll is below .post
          } else {
            $header.addClass('bottom').removeClass('top');
            $(el).removeClass('fixed-header');
          }
          // scroll is above .post
        } else {
          $header.addClass('top').removeClass('bottom');
          $(el).removeClass('fixed-header');
        }
      });
    }
  };

  var hideHeader = function() {
    $(header).addClass('header-fixed').css({'top' : -headerStaticArea});
    $(container).css({'padding-top' : headerStaticArea});
  };

  var fixHeader = function() {
    $(header).addClass('header-fixed header-animated').css({'top' : 0});
    $(container).css({'padding-top' : headerStaticArea});
  };

  var resetHeader = function() {
    $(header).removeClass('header-fixed header-animated');
    $(container).css({'padding-top' : 0});
    $('.post.fixed-header').removeClass('fixed-header');
  };

  var hideFooter = function() {
    $(footer).addClass('footer-fixed footer-animated footer-hidden');
    $(footer).css('bottom', -$(footer).outerHeight());
  };

  var resetFooter = function() {
    $(footer).removeClass('footer-fixed footer-animated footer-hidden');
    $('body').removeClass('voog-search-visible');
    $(footer).css({'bottom': '', 'left': '' });
    $(container).css({'margin-bottom' : ''});
  };

  var fixFooter = function(expanded) {
    expanded = expanded || false;
    $(footer).addClass('footer-fixed footer-animated');
    $(footer).css({
      'left' : $('.container').offset().left,
      'bottom': (expanded ? 0 : (-$(footer).height() + 60))
    });
    $(container).css({'margin-bottom' : footerStaticArea});
  };

  var expandFooter = function(expand) {
    if (expand) {
      if ($(footer).hasClass('footer-fixed')) {
        clearTimeout(footerExpandTimeout);
        fixFooter(true);
        $('footer .gradient-overlay').hide();
      }
    } else {
      if ($('footer').hasClass('footer-fixed')) {
        footerExpandTimeout = setTimeout(function() {
          fixFooter(false);
          $('footer .gradient-overlay').show();
        }, 1500);
      }
    }
  };

  var onScroll = function() {
    latestKnownScrollY = window.scrollY;
    requestTick();
  };

  var requestTick = function() {
    if (!ticking) { requestAnimationFrame(update); }
    ticking = true;
  };

  var update = function() {
    ticking = false;
    handler(getPostHeights());
  };

  $(window).on('load resize', function() {
    handler(getPostHeights());
  }).on('scroll', onScroll);

  $('footer').bind('mouseenter', function() {
    expandFooter(true);
  }).bind('mouseleave', function() {
    expandFooter(false);
  });
};

var init = function() {
  toggleMainMenu();
  toggleLangMenu();
  handlePopoverMenuHide();
  handleWindowResize();
  handleSearch();
  wrapTables();
  if ($('.table-container').length > 0) {
    checkScrollBar();
    handleTableHorizontalScrolling();
  }
  $('.content form').edicyFormPlaceholders();
  $(window).load(function() {
    $('input, textarea').placeholder();
  });
};

window.site = $.extend(window.site || {}, {
  initFrontPage: initFrontPage,
  initCommonPage: initCommonPage,
  initBlogPage: initBlogPage,
  initArticlePage: initArticlePage
});

init();
})(jQuery);

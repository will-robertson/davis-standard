/* global twentyseventeenScreenReaderText */
(function( $ ) {

  // Variables and DOM Caching.
  var $body = $( 'body' ),
    $customHeader = $body.find( '.custom-header' ),
    $branding = $customHeader.find( '.site-branding' ),
    $navigation = $body.find( '.navigation-top' ),
    $navWrap = $navigation.find( '.wrap' ),
    $navMenuItem = $navigation.find( '.menu-item' ),
    $menuToggle = $navigation.find( '.menu-toggle' ),
    $menuScrollDown = $body.find( '.menu-scroll-down' ),
    $sidebar = $body.find( '#secondary' ),
    $entryContent = $body.find( '.entry-content' ),
    $formatQuote = $body.find( '.format-quote blockquote' ),
    isFrontPage = $body.hasClass( 'twentyseventeen-front-page' ) || $body.hasClass( 'home blog' ),
    navigationFixedClass = 'site-navigation-fixed',
    navigationHeight,
    navigationOuterHeight,
    navPadding,
    navMenuItemHeight,
    idealNavHeight,
    navIsNotTooTall,
    headerOffset,
    menuTop = 0,
    resizeTimer;

  // Ensure the sticky navigation doesn't cover current focused links.
  $( 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]', '.site-content-contain' ).filter( ':visible' ).focus( function() {
    if ( $navigation.hasClass( 'site-navigation-fixed' ) ) {
      var windowScrollTop = $( window ).scrollTop(),
        fixedNavHeight = $navigation.height(),
        itemScrollTop = $( this ).offset().top,
        offsetDiff = itemScrollTop - windowScrollTop;

      // Account for Admin bar.
      if ( $( '#wpadminbar' ).length ) {
        offsetDiff -= $( '#wpadminbar' ).height();
      }

      if ( offsetDiff < fixedNavHeight ) {
        $( window ).scrollTo( itemScrollTop - ( fixedNavHeight + 50 ), 0 );
      }
    }
  });

  // Set properties of navigation.
  function setNavProps() {
    navigationHeight      = $navigation.height();
    navigationOuterHeight = $navigation.outerHeight();
    navPadding            = parseFloat( $navWrap.css( 'padding-top' ) ) * 2;
    navMenuItemHeight     = $navMenuItem.outerHeight() * 2;
    idealNavHeight        = navPadding + navMenuItemHeight;
    navIsNotTooTall       = navigationHeight <= idealNavHeight;
  }

  // Make navigation 'stick'.
  function adjustScrollClass() {

    // Make sure we're not on a mobile screen.
    if ( 'none' === $menuToggle.css( 'display' ) ) {

      // Make sure the nav isn't taller than two rows.
      if ( navIsNotTooTall ) {

        // When there's a custom header image or video, the header offset includes the height of the navigation.
        if ( isFrontPage && ( $body.hasClass( 'has-header-image' ) || $body.hasClass( 'has-header-video' ) ) ) {
          headerOffset = $customHeader.innerHeight() - navigationOuterHeight;
        } else {
          headerOffset = $customHeader.innerHeight();
        }

        // If the scroll is more than the custom header, set the fixed class.
        if ( $( window ).scrollTop() >= headerOffset ) {
          $navigation.addClass( navigationFixedClass );
        } else {
          $navigation.removeClass( navigationFixedClass );
        }

      } else {

        // Remove 'fixed' class if nav is taller than two rows.
        $navigation.removeClass( navigationFixedClass );
      }
    }
  }

  // Set margins of branding in header.
  function adjustHeaderHeight() {
    if ( 'none' === $menuToggle.css( 'display' ) ) {

      // The margin should be applied to different elements on front-page or home vs interior pages.
      if ( isFrontPage ) {
        $branding.css( 'margin-bottom', navigationOuterHeight );
      } else {
        $customHeader.css( 'margin-bottom', navigationOuterHeight );
      }

    } else {
      $customHeader.css( 'margin-bottom', '0' );
      $branding.css( 'margin-bottom', '0' );
    }
  }

  // Set icon for quotes.
  function setQuotesIcon() {
    $( twentyseventeenScreenReaderText.quote ).prependTo( $formatQuote );
  }

  // Add 'below-entry-meta' class to elements.
  function belowEntryMetaClass( param ) {
    var sidebarPos, sidebarPosBottom;

    if ( ! $body.hasClass( 'has-sidebar' ) || (
      $body.hasClass( 'search' ) ||
      $body.hasClass( 'single-attachment' ) ||
      $body.hasClass( 'error404' ) ||
      $body.hasClass( 'twentyseventeen-front-page' )
    ) ) {
      return;
    }

    sidebarPos       = $sidebar.offset();
    sidebarPosBottom = sidebarPos.top + ( $sidebar.height() + 28 );

    $entryContent.find( param ).each( function() {
      var $element = $( this ),
        elementPos = $element.offset(),
        elementPosTop = elementPos.top;

      // Add 'below-entry-meta' to elements below the entry meta.
      if ( elementPosTop > sidebarPosBottom ) {
        $element.addClass( 'below-entry-meta' );
      } else {
        $element.removeClass( 'below-entry-meta' );
      }
    });
  }

  /*
   * Test if inline SVGs are supported.
   * @link https://github.com/Modernizr/Modernizr/
   */
  function supportsInlineSVG() {
    var div = document.createElement( 'div' );
    div.innerHTML = '<svg/>';
    return 'http://www.w3.org/2000/svg' === ( 'undefined' !== typeof SVGRect && div.firstChild && div.firstChild.namespaceURI );
  }

  /**
   * Test if an iOS device.
  */
  function checkiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && ! window.MSStream;
  }

  /*
   * Test if background-attachment: fixed is supported.
   * @link http://stackoverflow.com/questions/14115080/detect-support-for-background-attachment-fixed
   */
  function supportsFixedBackground() {
    var el = document.createElement('div'),
      isSupported;

    try {
      if ( ! ( 'backgroundAttachment' in el.style ) || checkiOS() ) {
        return false;
      }
      el.style.backgroundAttachment = 'fixed';
      isSupported = ( 'fixed' === el.style.backgroundAttachment );
      return isSupported;
    }
    catch (e) {
      return false;
    }
  }

  // Fire on document ready.
  $( document ).ready( function() {

    // If navigation menu is present on page, setNavProps and adjustScrollClass.
    if ( $navigation.length ) {
      setNavProps();
      adjustScrollClass();
    }

    // If 'Scroll Down' arrow in present on page, calculate scroll offset and bind an event handler to the click event.
    if ( $menuScrollDown.length ) {

      if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
        menuTop -= 32;
      }
      if ( $( 'body' ).hasClass( 'blog' ) ) {
        menuTop -= 30; // The div for latest posts has no space above content, add some to account for this.
      }
      if ( ! $navigation.length ) {
        navigationOuterHeight = 0;
      }

      $menuScrollDown.click( function( e ) {
        e.preventDefault();
        $( window ).scrollTo( '#primary', {
          duration: 600,
          offset: { top: menuTop - navigationOuterHeight }
        });
      });
    }

    adjustHeaderHeight();
    setQuotesIcon();
    if ( true === supportsInlineSVG() ) {
      document.documentElement.className = document.documentElement.className.replace( /(\s*)no-svg(\s*)/, '$1svg$2' );
    }

    if ( true === supportsFixedBackground() ) {
      document.documentElement.className += ' background-fixed';
    }

    // Truncate related sections
    var related_text;

    var shortText;

    $('.related-text').each(function(){

      var x = $(this).text();

    });

  });

  // If navigation menu is present on page, adjust it on scroll and screen resize.
  if ( $navigation.length ) {

    // On scroll, we want to stick/unstick the navigation.
    $( window ).on( 'scroll', function() {
      adjustScrollClass();
      adjustHeaderHeight();
    });

    // Also want to make sure the navigation is where it should be on resize.
    $( window ).resize( function() {
      setNavProps();
      setTimeout( adjustScrollClass, 500 );
    });
  }

  $( window ).resize( function() {
    clearTimeout( resizeTimer );
    resizeTimer = setTimeout( function() {
      belowEntryMetaClass( 'blockquote.alignleft, blockquote.alignright' );
    }, 300 );
    setTimeout( adjustHeaderHeight, 1000 );
  });

  // Add header video class after the video is loaded.
  $( document ).on( 'wp-custom-header-video-loaded', function() {
    $body.addClass( 'has-header-video' );
  });

});

// })( jQuery );

/* ********************************** */
/* begin Exnihilo's edits and changes */

$(document).ready(function(){

  // Truncate related sections
  $('.page-template-services > .content').each(function(){
    
    var related_text = $(this).text();
    
    var shortText = $.trim(related_text).substring(0, 200).split(" ").slice(0, -1).join(" ") + "...";

    $(this).html('<p>' + shortText + '</p>');

  });

  // Truncate industries sections
  $('.industries-block').find('.excerpt').each(function(){
    
    var related_text = $(this).text();
    
    var shortText = $.trim(related_text).substring(0, 180).split(" ").slice(0, -1).join(" ") + "...";

    $(this).html('<p>' + shortText + '</p>');

  });

  // Truncate latest posts section on homepage
  $('.latest-block').find('p').each(function(){
    
    var homepage_latest = $(this).unwrap().text().split('.').join('. ');

    $(this).text(homepage_latest);

    $(this).parent().wrapInner('<div class="latest-content"></div>');

  });

  content_count = 1;

  // Wrap landing page post grid images in paragraph
  // $('.page-template-landing').find('.content').each(function(){

  //   $(this).wrapInner('<p></p>');

  // });

  $('.page-template-news').find('.excerpt').each(function(){

    $(this).wrapInner('<p></p>');

  });

  $('.page-template-news').find('.content').each(function(){
    
    var long_news = $(this).text();

    var short_news = $.trim(long_news).substring(0, 240).split(" ").slice(0, -1).join(" ") + "...";
    
    $(this).html('<p>' + short_news + '</p>');

  });

  // Map display
  var num;

  $('.map-point').mouseover(function(){

    // Hides all locales
    $('.locale').hide();

    // Get the desired locale
    num = $(this).data('contentid');

    // Show the desired locale
    $('#locale-' + num).show();

  });

  // Remove Body Stylesheets from Map Overlay
  $('.page-template-map-overlay').find('style').each(function(){

    $(this).remove();

  });

  // Product Page Scripts
  $('.extrusion_system-template-default, .converting_system-template-default').addClass('product-page');
  $('a[target="_blank"').removeAttr('target');
  $('.extrusion_system > .entry-content > p > img:first-child, .converting_system > .entry-content > p > img:first-child').addClass('active');

  // Carousel
  $('.extrusion_system > .entry-content > p > img, .converting_system > .entry-content > p > img').on('click', function(){

    $('.extrusion_system > .entry-content > p > img, .converting_system > .entry-content > p > img').removeClass('active');
    $(this).addClass('active');

  });

  // Resource Center
  var i = 0;

  $('#document-gallery-1').find('.document-icon-row').each(function(){

    // Add a numbered class to each resource entry
    $(this).attr('data-resource-number', i);
    i++;

    // Paginate by 12 entries per at a time
    if (i <= 12) {
      $(this).addClass('visible-pagination');
    }

  });

  // The number of pages we need
  var x = Math.ceil(i / 12);

  if (i > 12) {

    // Paginate
    for (a = 1; a <= x; a++) {
      $('.paginator').append('<p class="pagination-number" data-page-num="' + a + '">' + a + '</p>');
    }

  } else if (i <= 12) {
  
    // Don't paginate
    $('.paginator').hide();
  
  }

  // The first page is always active on page load
  $('.pagination-number').first().addClass('active-page');

  // for each resource link, do a few things.
  $('#document-gallery-1').find('a').each(function(){

    // get the resource type
    var url = $(this).attr('href');
    var type = url.substr(url.length - 3);

    $(this).addClass('document-link');

    // Add a paragraph detailing the resource type
    $(this).parent('div').append('<p class="dg-file-type dg-' + type + '">' + type + '</p>');

    // open the link in a new tab
    $(this).attr('target', '_blank');

  });

  // Filters by product type
  $('#document-gallery-1').find('.document-icon').each(function() {

    // simplify the functionality and add confusion!

    // Get the title
    var title = $(this).find('.title').text().toLowerCase();

    // If the title has a specific term, add
    if (title.indexOf('blown film') >= 0)  {
      
      $(this).append('<p class="blown-film">Blown Film</p>');
      $(this).parent('.document-icon-row').addClass('blown-film-row');
    
    } else if (title.indexOf('blow molding') >= 0) {
    
      $(this).append('<p class="blow-molding">Blow Molding</p>');
      $(this).parent('.document-icon-row').addClass('blow-molding-row');
    
    } else if (title.indexOf('elastomers') >= 0) {

      $(this).append('<p class="elastomer">Elastomers</p>');
      $(this).parent('.document-icon-row').addClass('elastomers-row');

    } else if (title.indexOf('cast film') >= 0) {

      $(this).append('<p class="cast-film">Cast Film</p>');
      $(this).parent('.document-icon-row').addClass('film-row');

    } else if (title.indexOf('extruder') >= 0) {

      $(this).append('<p class="extruder">Extruder</p>');
      $(this).parent('.document-icon-row').addClass('extruder-row');

    } else if (title.indexOf('foam') >= 0) {

      $(this).append('<p class="foam">Foam</p>');
      $(this).parent('.document-icon-row').addClass('foam-row');
    
    } else if (title.indexOf('liquid coating') >= 0) {

      $(this).append('<p class="liquid-coating">Liquid Coating</p>');
      $(this).parent('.document-icon-row').addClass('liquid-coating-row');
    
    } else if (title.indexOf('pelletizing') >= 0) {

      $(this).append('<p class="pelletizing">Pelletizing</p>');
      $(this).parent('.document-icon-row').addClass('pelletizing-row');
    
    } else if (title.indexOf('unwinding/winding') >= 0) {

      $(this).append('<p class="unwinding-winding">Unwinding/Winding</p>');
      $(this).parent('.document-icon-row').addClass('unwinding-winding-row');
    
    } else if (title.indexOf('wire') >= 0) {

      $(this).append('<p class="wire">Wire</p>');
      $(this).parent('.document-icon-row').addClass('wire-row');
    
    } else if (title.indexOf('sheet') >= 0) {

      $(this).append('<p class="sheet">Sheet</p>');
      $(this).parent('.document-icon-row').addClass('sheet-row');
    
    } else {

      $(this).append('<p class="other">Other</p>');
      $(this).parent('.document-icon-row').addClass('other');
      
    }

  });

  // Filter by product
  $('#product-filter-options').on('change', function(){

    var choice = $(this).val();
    var num = 1;

    if (choice === 'blown-film') {

      $('.document-icon-row').hide();
      $('.blown-film-row').show();

    } else if (choice === 'blow-molding') {

      $('.document-icon-row').hide();
      $('.blow-molding-row').show();

    } else if (choice === 'elastomer') {

      $('.document-icon-row').hide();
      $('.elastomer-row').show();

    } else if (choice === 'extruder') {

      $('.document-icon-row').hide();
      $('.extruder-row').show();

    } else if (choice === 'foam') {

      $('.document-icon-row').hide();
      $('.foam-row').show();

    } else if (choice === 'liquid-coating') {

      $('.document-icon-row').hide();
      $('.liquid-coating-row').show();

    } else if (choice === 'pelletizing') {

      $('.document-icon-row').hide();
      $('.pelletizing-row').show();

    } else if (choice === 'unwinding-winding') {

      $('.document-icon-row').hide();
      $('.unwinding-winding-row').show();

    } else if (choice === 'wire') {

      $('.document-icon-row').hide();
      $('.wire-row').show();

    } else if (choice === 'sheet') {

      $('.document-icon-row').hide();
      $('.sheet-row').show();

    } else {

      $('.document-icon-row').show();

    }

  });

  // Cycle through the pagination by groups of 12 (may change later.)
  $('.pagination-number').on('click', function(){

    // Get the pagination number
    var page = $(this).text();

    // Hide the previous active page
    $('.pagination-number').removeClass('active-page');

    // make the current page active
    $(this).addClass('active-page');

    // hide the previous pages resources
    $('.document-icon-row').removeClass('visible-pagination');
    
    // check each resource for their number
    $('#document-gallery-1').find('.document-icon-row').each(function(){

      var re_num = $(this).data('resource-number');

      // only show the 12 relevant resources
      if (re_num >= (((page - 1) * 12) + 1) && re_num <= (page * 12) ){
        $(this).addClass('visible-pagination');
      }

    });

  });

  // Add classes to contact form submit

  $('form input:submit').parents('p').addClass('form-submit-button');

  // Add classes to events page content based on line number
  $('#post-grid-712 item').find('.element').find('p').each(function(){

    // $(this + ':first-child').addClass('event-date');
    $(this + ':nth-of-type(2)').addClass('event-location');
    $(this + ':nth-of-type(3)').addClass('event-booth');

  });

  $('.your-subject').find('option[value=""]').attr('disabled', 'disabled');

});
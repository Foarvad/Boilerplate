let detectDevice = (options) => {
  let result,
  ww = $(window).width(),
  current = {
    desktop: 1023,
    mobile: 767
  };

  if( options !== 'undefined') {

    for ( let item in options) {
      current[item] = item;
    }
  }

  if ( ww > current.desktop ) {
    result = "desktop";
  }
  else if ( ww < current.desktop && ww > current.mobile ) {
    result = "tablet";
  }

  else if ( ww < current.mobile ) {
    result = "mobile";
  }

  return result;
};
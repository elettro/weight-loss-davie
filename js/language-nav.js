(function () {
  var navWrap = document.querySelector('.nav-wrap');
  var nav = document.querySelector('.site-nav');
  if (!navWrap || !nav) return;

  var path = window.location.pathname || '/';
  var segments = path.split('/').filter(Boolean);
  var insertIndex = segments[0] && segments[0].toLowerCase() === 'weight-loss-davie' ? 1 : 0;
  var isFrench = segments[insertIndex] && segments[insertIndex].toLowerCase() === 'fr';

  var altSegments = segments.slice();
  if (isFrench) {
    altSegments.splice(insertIndex, 1);
  } else {
    altSegments.splice(insertIndex, 0, 'fr');
  }

  var altPath = '/' + altSegments.join('/');
  if (altPath === '/') {
    altPath = '/';
  } else if (!altPath.endsWith('/')) {
    altPath += '/';
  }

  var altUrl = altPath + window.location.search + window.location.hash;

  if (!navWrap.querySelector('.language-toggle')) {
    var languageToggle = document.createElement('div');
    languageToggle.className = 'language-toggle';
    languageToggle.setAttribute('role', 'group');
    languageToggle.setAttribute('aria-label', 'Language selection');

    var enLink = document.createElement('a');
    enLink.className = 'language-option' + (!isFrench ? ' active' : '');
    enLink.href = isFrench ? altUrl : '#';
    enLink.textContent = 'EN';
    enLink.setAttribute('aria-label', isFrench ? 'Switch to English' : 'English active');
    if (!isFrench) {
      enLink.setAttribute('aria-current', 'page');
      enLink.setAttribute('tabindex', '-1');
    }

    var frLink = document.createElement('a');
    frLink.className = 'language-option' + (isFrench ? ' active' : '');
    frLink.href = isFrench ? '#' : altUrl;
    frLink.textContent = 'FR';
    frLink.setAttribute('aria-label', isFrench ? 'French active' : 'Switch to French');
    if (isFrench) {
      frLink.setAttribute('aria-current', 'page');
      frLink.setAttribute('tabindex', '-1');
    }

    languageToggle.appendChild(enLink);
    languageToggle.appendChild(frLink);

    var navToggle = navWrap.querySelector('.nav-toggle');
    if (navToggle) {
      navWrap.insertBefore(languageToggle, navToggle);
    } else {
      navWrap.appendChild(languageToggle);
    }
  }

  if (!nav.querySelector('.mobile-language-link')) {
    var mobileLink = document.createElement('a');
    mobileLink.className = 'mobile-language-link';
    mobileLink.href = altUrl;
    mobileLink.textContent = isFrench ? 'English' : 'French';
    mobileLink.setAttribute('aria-label', isFrench ? 'Switch site language to English' : 'Switch site language to French');
    nav.insertBefore(mobileLink, nav.firstChild);
  }
})();

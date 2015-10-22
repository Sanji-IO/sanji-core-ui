export default ($translateProvider, $provide) => {
  const LANG_EN = 'en';
  const LANG_ZH_TW = 'zh-tw';

  $provide.constant('LANG_KEYS', [LANG_EN, LANG_ZH_TW]);
  $translateProvider.translations(LANG_EN, require('./lang/en.json'));
  $translateProvider.translations(LANG_ZH_TW, require('./lang/zh-tw.json'));

  $translateProvider
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .useCookieStorage()
    .useSanitizeValueStrategy('sanitize');
}

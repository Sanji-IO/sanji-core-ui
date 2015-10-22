export default ($translateProvider) => {
  $translateProvider
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .useCookieStorage()
    .useSanitizeValueStrategy('sanitize');

  $translateProvider.translations('en', require('./lang/en.json'));
}

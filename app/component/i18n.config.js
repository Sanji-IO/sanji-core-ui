export default ($translateProvider) => {
  $translateProvider
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .useCookieStorage();;

  $translateProvider.translations('en', require('./lang/en.json'));
}

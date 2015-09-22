export default ($logProvider, routerHelperProvider, exceptionHandlerProvider) => {
  let config = {
    appErrorPrefix: '[webapp Error] ',
    appTitle: 'webapp'
  };

  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({docTitle: config.appTitle + ': ', defaultRoute: '/'});
}

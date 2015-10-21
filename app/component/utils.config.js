export default ($logProvider, routerHelperProvider, exceptionHandlerProvider) => {
  let config = {
    appErrorPrefix: '[webapp Error] ',
    appTitle: 'webapp'
  };

  // __DEV__ is webpack defined variable
  $logProvider.debugEnabled(__DEV__);
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({docTitle: config.appTitle + ': ', defaultRoute: '/'});
}

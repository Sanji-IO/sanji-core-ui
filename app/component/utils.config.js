export default ($httpProvider, $compileProvider, $logProvider, routerHelperProvider, exceptionHandlerProvider) => {
  'ngInject';
  let config = {
    appErrorPrefix: '[webapp Error] ',
    appTitle: 'webapp'
  };

  // __DEV__ is webpack defined variable
  $httpProvider.useApplyAsync(true);
  $compileProvider.debugInfoEnabled(__DEV__);
  $logProvider.debugEnabled(__DEV__);
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({docTitle: config.appTitle + ': ', defaultRoute: '/'});
}

export default ($httpProvider, $compileProvider, $logProvider, routerHelperProvider, exceptionHandlerProvider, localStorageServiceProvider) => {
  'ngInject';
  const config = {
    appErrorPrefix: '[webapp Error] ',
    appTitle: 'webapp'
  };

  // __DEV__ is webpack defined variable
  $httpProvider.useApplyAsync(true);
  $compileProvider.debugInfoEnabled(__DEV__);
  $logProvider.debugEnabled(__DEV__);
  exceptionHandlerProvider.configure(config.appErrorPrefix);
  routerHelperProvider.configure({docTitle: config.appTitle + ': ', defaultRoute: '/'});
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setDefaultToCookie(false);
};

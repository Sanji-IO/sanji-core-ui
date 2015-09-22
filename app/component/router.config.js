export default (routerHelper) => {
  let otherwise = '/404';
  routerHelper.configureStates(getStates(), otherwise);

  function getStates() {
    return [{
      state: '404',
      config: {
        url: '/404',
        templateUrl: '404.html',
        title: '404 Error'
      }
    }];
  }
}

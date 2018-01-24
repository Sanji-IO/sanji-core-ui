export default $mdThemingProvider => {
  'ngInject';
  $mdThemingProvider.definePalette('moxa-material', {
    '50': '#E6F3F3',
    '100': '#B3DBDB',
    '200': '#80C3C3',
    '300': '#55AFAF',
    '400': '#2A9B9B',
    '500': '#008787',
    '600': '#007676',
    '700': '#006565',
    '800': '#006565',
    '900': '#006565',
    A100: '#006565',
    A200: '#006565',
    A400: '#006565',
    A700: '#006565',
    contrastDefaultColor: 'light', // whether, by default, text (contrast)
    // on this palette should be dark or light
    contrastDarkColors: ['50', '100', '200', '300', '400', 'A100'],
    contrastLightColors: undefined // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('moxa').primaryPalette('moxa-material');

  $mdThemingProvider.setDefaultTheme('moxa');
};

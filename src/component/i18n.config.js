import EN from './lang/en.json';
import ZH_TW from './lang/zh-tw.json';

export default ($translateProvider, $provide) => {
  'ngInject';
  const LANG_EN = { key: 'en', label: 'English' };
  const LANG_ZH_TW = { key: 'zh-tw', label: '繁體中文' };

  $provide.constant('LANG_KEYS', [LANG_EN, LANG_ZH_TW]);
  $translateProvider.translations(LANG_EN.key, EN);
  $translateProvider.translations(LANG_ZH_TW.key, ZH_TW);

  $translateProvider
    .preferredLanguage(LANG_EN.key)
    .fallbackLanguage(LANG_EN.key)
    .useCookieStorage()
    .useSanitizeValueStrategy('escape');
};

import {
  GET_SETTINGS,
  GET_LANG,
  SET_SETTINGS,
  SET_LANG
} from '../names';

const userSettings = {
  miscDarkmode: 'auto',
  miscTimezone: '',
  country: null,
  useBrowserLanguage: true,
  defaultLanguage: '',
  orgName: '',
  orgDescriptionLabel: '',
  orgDescription: '',
  orgContactInfoLabel: '',
  orgContactInfo: '',
  jobsStatsEnabled: true,
  formSpellcheckEnabled: true,
};

export default
{
  state()
  {
    return {
      settings: userSettings,
      lang: null
    };
  },
  getters:
    {
      [GET_SETTINGS](state)
      {
        return state.settings;
      },
      [GET_LANG](state)
      {
        return state.lang;
      },
    },
  mutations:
    {
      [SET_LANG](state, value)
      {
        state.lang = value;
      },
      [SET_SETTINGS](state, obj)
      {
        state.settings[Object.keys(obj)[0]] = Object.values(obj)[0];
      }
    }
};

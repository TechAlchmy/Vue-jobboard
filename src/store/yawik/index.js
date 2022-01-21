import {
  GET_SETTINGS,
  SET_SETTINGS
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
    },
  mutations:
    {
      [SET_SETTINGS](state, obj)
      {
        state.settings[Object.keys(obj)[0]] = Object.values(obj)[0];
      }
    }
};

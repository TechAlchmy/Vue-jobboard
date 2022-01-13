/*
We use constants in Vuex for several reasons:
1. Preventing duplicate names
2. Preventing usage/calling of getter/mutation/action with non-existent name
3. Getting advantage of IDE code-completion and usage of constants (i.e. to spot unused names)
*/

// getters
export const GET_SETTINGS = 'GET_SETTINGS';
export const GET_LANG = 'GET_LANG';

// mutations
export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_LANG = 'SET_LANG';

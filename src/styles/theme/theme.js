import { themeDark } from './themeDark';
import { themeLight } from './themeLight';

// site-wide theming, toggle agnostic
const themeConstants = {
    
};

// select theme based on given 'mode' (toggled dark/light)
const theme = (mode) => {
    // include dark/light toggle theming with toggle-agnostic theme
    return mode === 'dark' ? {...themeConstants, ...themeDark} : {...themeConstants, ...themeLight};
}

export default theme;
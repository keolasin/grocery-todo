import { themeDark } from './themeDark';
import { themeLight } from './themeLight';

const theme = (mode) => {
    return mode === 'dark' ? themeDark : themeLight; 
}

export default theme;
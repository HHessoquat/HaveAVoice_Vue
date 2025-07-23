import {createI18n} from "vue-i18n";
import { cs } from './cs';
import { en } from './en.ts';
import  { fr } from './fr.ts';


const i18n = createI18n({
    locale: 'fr',
    fallbackLng: 'en',
    messages: {
        cs,
        en,
        fr
    }
})
export default i18n;
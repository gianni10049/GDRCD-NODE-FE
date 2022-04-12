// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import it from './translation/it.json';
import en from './translation/en.json';

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
	// and extend them!
	interface Resources {
		it: typeof it;
		en: typeof en;
	}
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
	// and extend them!
	interface CustomTypeOptions {
		// custom namespace type if you changed it
		defaultNS: 'it';
		// custom resources type
		resources: {
			it: typeof it;
			en: typeof en;
		};
	}
}

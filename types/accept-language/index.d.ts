declare namespace AcceptLanguage {
  export function languages(languageTags: string[]): void;
  export function get(acceptLanguageString: string): string;
}

export = AcceptLanguage;

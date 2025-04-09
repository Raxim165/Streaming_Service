export function convertLanguage(language: string) {
  switch (language) {
    case 'en': return 'Английский';
    case 'ru': return 'Русский';
    case 'es': return 'Испанский';
    case 'fr': return 'Французский';
    case 'de': return 'Немецкий';
    case 'it': return 'Итальянский';
    case 'ko': return 'Корейский';
    case 'ja': return 'Японский';
    case 'pt': return 'Португальский';
    case 'tr': return 'Турецкий';
    case 'pl': return 'Польский';
    case 'nl': return 'Голландский';
    case 'sv': return 'Шведский';
    case 'hu': return 'Венгерский';
    case 'id': return 'Индонезийский';
    case 'th': return 'Тайский';
    case 'cs': return 'Чешский';
    case 'bg': return 'Болгарский';
    case 'ro': return 'Румынский';
    case 'ar': return 'Арабский';
    case 'hi': return 'Хинди';
    case 'fa': return 'Фарси';
    case 'uk': return 'Украинский';
    case 'he': return 'Иврит';
    case 'el': return 'Греческий';
    case 'bn': return 'Бенгальский';
    case 'ta': return 'Тамильский';
    case 'ca': return 'Каталонский';
    case 'ms': return 'Малаишский';
    case 'tl': return 'Тагальский';
    case 'no': return 'Норвежский';
    case 'cn': return 'Китайский';
    case 'zh': return 'Китайский';
    case 'da': return 'Датский';
    case 'fi': return 'Финский';
    case 'et': return 'Эстонский';
    case 'lt': return 'Литовский';
    case 'lv': return 'Латвийский';
    case 'sl': return 'Словацкий';
    case 'hr': return 'Хорватский';
    case 'mk': return 'Македонский';
    default: return language;
  }
}
# Currency in Words

A privacy-friendly Chrome extension that converts numeric amounts into written
currency text. The selected currency automatically determines the output
language.

## Features

- Localized output for USD, EUR, GBP, CAD, AUD, JPY, CNY, INR, CHF, SGD, KRW,
  AED, and BHD
- Saved default currency using Chrome Sync with local-storage fallback
- Live thousands separators in the amount field
- Currency-specific decimal precision and rounding
- Korean output punctuated at the numeric three-digit boundaries
- Toolbar popup for direct conversion
- Right-click conversion of highlighted amounts in a same-page floating card
- Full result page available only when explicitly requested
- No AI, analytics, advertising, or external translation service

## Install locally

1. Download or clone this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose this repository folder.

## Right-click conversion

Highlight a numeric amount on a webpage, right-click it, and choose **Convert
selection to currency words**. The result appears in a floating card on the
same page. The extension never navigates away automatically.

## Development

Run the conversion checks with:

```sh
node tests.js
```

## Privacy

Conversion runs entirely in the browser. Highlighted text, numeric amounts, and
results are not transmitted or retained. Chrome storage is used only to save
the selected default currency.
# currency-in-words

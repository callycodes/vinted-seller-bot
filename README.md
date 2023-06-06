# vinted-seller-bot
Node script to auto message recent favourites from potential buyers

To use the script, fill in the constants.ts file with your cookie and csrf token, these can be fetched from any Vinted web request using the Chrome Web Inspector on the network tab.

The script fetches all recent notifications, filters only favouriting notifications and starts a conversation with each potential buyer. You can customise the sale message in constants.ts.

The script automatically ignores users you have already started a conversation with.

Delays added throughout to avoid hitting Vinted' strict bot rules.

Support for inline variables in the sale message soon, at the moment only ${name} is supported to include the buyers name.

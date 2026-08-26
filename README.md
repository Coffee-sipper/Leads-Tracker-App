# Leads Tracker

A simple Chrome extension (and web version) for saving and tracking leads — URLs or notes you want to revisit later — backed by Firebase Realtime Database.

**Live demo:** [leads-tracker-appk.netlify.app](https://leads-tracker-appk.netlify.app/)

## Features

- Save a lead by typing a URL (or any text) and clicking **SAVE INPUT**
- Save the current browser tab's URL with one click (extension only)
- View all saved leads in a live-updating list — no manual refresh needed
- Delete all leads at once (double-click **DELETE ALL** to avoid accidental wipes)
- Data syncs in real time via Firebase Realtime Database, so it's available across sessions

## Tech Stack

- Vanilla JavaScript (ES modules)
- HTML / CSS
- [Firebase Realtime Database](https://firebase.google.com/docs/database) for storage and live sync
- Chrome Extension Manifest V3 (for the browser extension build)

## Project Structure

```
├── index.html       # Popup / app UI
├── index.js         # App logic — Firebase read/write, rendering
├── style.css         # Styling
├── manifest.json     # Chrome extension manifest (extension build only)
└── generative.png    # Extension icon
```

## How It Works

1. `index.js` initializes Firebase using a `databaseURL` pointing at a Realtime Database instance.
2. Clicking **SAVE INPUT** calls `push()` to add the input value under the `leads` path in the database.
3. An `onValue()` listener stays subscribed to the `leads` path and automatically re-renders the list any time the data changes — whether from this device or another.
4. Clicking **DELETE ALL** (double-click) calls `remove()` to clear everything under `leads`.



## Notes / Known Limitations

- Database rules as configured for the demo are open for simplicity — don't use this setup for sensitive data without adding authentication and stricter rules.
- The extension build and the Netlify web build may drift slightly in features (e.g. "save current tab" only makes sense in the extension, since it relies on `chrome.tabs`).

## License

MIT (or update to whatever license fits your use case).

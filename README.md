## CLI Twitch chat viewer

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/darteil/twitch-chat-viewer/blob/master/LICENSE.md)

 Default mode              |  Compact mode
:-------------------------:|:-------------------------:
![](media/screen1.png)    |![](media/screen2.png)

### Usage

```bash
# Install dependencies
npm install

# Build
npm run build

# Start
node dist/index.js -c channel_name

# Create release ("release" folder)
npm run pack
```

### Configuration file
The user configuration is named as `.twitch-chat-viewer.json` and placed inside the folder `$HOME/.config/`

Default config:
``` jsonc
{
  "colors": {
    "time": "red",
    "nickname": "green",
    "message": "white"
  },
  "moderatorIcon": "◉",
  "moderatorIconColor": "#ffffff"
}
```

## License

MIT License, Copyright (c) 2021 Romanov Yuri

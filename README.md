## CLI Twitch chat viewer

[![GitHub license](https://img.shields.io/github/license/darteil/twitch-chat-viewer?style=for-the-badge)](https://github.com/darteil/twitch-chat-viewer/blob/master/LICENSE.md)

### Screenshots

Start screen:

![](media/start_screen.png)

Chat:

| Default mode              |  Compact mode             |
|:-------------------------:|:-------------------------:|
|![](media/screen1.png)     |![](media/screen2.png)     |

### Usage

```bash
# Install dependencies
npm install

# Build
npm run build

# Start
node dist/index.js

# Create release ("release" folder)
npm run pack
```

### Configuration file
The user configuration is named as `.settings.json` and placed inside the folder `$HOME/.config/twitch-chat-viewer`

Default config:
``` jsonc
{
  "showMods": true,
  "moderatorIcon": "◉",
  "moderatorIconColor": "#ffffff"
}
```

## License

MIT License, Copyright (c) 2021 Romanov Yuri

# Unconventional Meet

![](https://img.shields.io/chrome-web-store/v/bdhglnfaocjhkmbbkcpnippbkljpiini)

Tired of exiting from Google Meet calls by mistake? Or do you want to find where your call's tab is after you've opened a bunch of them during your call? This is the right chrome extension for you!

[Install it from the Chrome web store](https://chrome.google.com/webstore/detail/unconventional-meet/bdhglnfaocjhkmbbkcpnippbkljpiini?hl=it)


## Features

These are the features currently available:

- Asking for confirmation before closing Google Meet's tab during a call
- Click on the extension icon to focus Google Meet's tab
- Auto-join the meeting instead of landing in the waiting room

## Screenshots

![unconventional-meet-screenshot](https://github.com/giacomocerquone/unconventional-meet/assets/9303791/83e94c92-77d2-48b6-848d-be883a7da123)

 
## Contribute

This is some needed stuff if you'd like to give a hand:

- Develop a website through gh-pages to sponsor the extension a bit 

## Developing

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `yarn install` to install the dependencies.
4. Run `yarn build`
5. Visit `chrome://extensions/` and load a non packed extension selecting the build folder

## Packing

After the development of your extension run the command

```shell
$ yarn build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

---

Powered by [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

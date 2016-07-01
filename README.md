SoundWalk Strážky
=================
homepage: [soundwalk.sng.sk](http://soundwalk.sng.sk/)


SoundWalk Strážky is an open source mobile application built using PhoneGap (Apache Cordova). It is written entirely using HTML, CSS, and JavaScript, and runs on numerous platforms (tested for iOS and Android)

SoundWalk Strážky uses:

* PhoneGap: http://www.phonegap.com
* jQuery Mobile: http://jquerymobile.com/

SoundWalk Strážky is available in the following markets:

* iTunes: https://itunes.apple.com/sk/app/soundwalk-strazky/id757820791?mt=8
* Google Play: https://play.google.com/store/apps/details?id=sk.sng.strazky


## Installation
It requires Node.js

```
sudo npm install -g phonegap
phonegap  plugin add cordova-plugin-media
phonegap  plugin add cordova-plugin-inappbrowser
phonegap  plugins add cordova-plugin-device
phonegap run ios
```

## Usage

To start a local server to run the app in your browser:

'''
phonegap serve
'''

To test on your phone you can download the nifty [PhoneGap Developer mobile app](http://docs.phonegap.com/getting-started/2-install-mobile-app/) and point it to the Server Address you see after `phonegap serve`.

![image](http://soundwalk.sng.sk/images/logo/logo_soundwalk.png)

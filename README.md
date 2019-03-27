# Openbase Website Repository
The official bco website repository used to present the project and community guidelines.

## Technical Details

* used framework: https://vuepress.vuejs.org/
* build and served via: https://openbase.netlify.com/

## Install

### Ubuntu / Debian

1. Setup Vuepress
1.1 Add Yarn Debian Repository Key
```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```
1.2 Register Yarn Debian Repository
```echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list```
1.3 Install notejs, nps, yarn
```sudo apt-get update && sudo apt-get install nodejs npm yarn```
1.4 Navigate into the project folder and perform:
```yarn add vuepress```

### MacOs

1. Install nodejs, nps and yarn
2. Navigate into the project folder and perform:
<pre>yarn install vuepress</pre>

## Run Local Webserver
```yarn run www:dev```

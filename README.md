# Openbase Website Repository
The official bco website repository used to present the project and community guidelines.

## Technical Details

* used framework: https://vuepress.vuejs.org/
* build and served via: https://openbase.netlify.com/

## Install

### Ubuntu / Debian

* Setup Vuepress 
    * Add Yarn Debian Repository Key  
    ```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```
    
    * Register Yarn Debian Repository  
    ```echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list```

    * Install notejs, nps, yarn  
    ```sudo apt-get update && sudo apt-get install nodejs npm yarn```

    * Navigate into the project folder and install vuepress  
    ```yarn add vuepress```

### MacOs

* Setup Vuepress
    * Via brew: ```brew install nodejs npm yarn```
    * Navigate into the project folder and perform:
```yarn install vuepress```

## Run Local Webserver
Navigate into the project folder and perform:
```yarn run www:dev```

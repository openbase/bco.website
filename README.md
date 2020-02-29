# Openbase Website Repository
The official bco website repository used to present the project and community guidelines.


[![Netlify Status](https://api.netlify.com/api/v1/badges/32f23ef3-627b-4e8c-ac68-52da56fe5b9e/deploy-status)](https://app.netlify.com/sites/basecubeone/deploys)

Online: https://basecubeone.org  
Master: https://master.basecubeone.org  


## Technical Details

* used framework: https://vuepress.vuejs.org/
* build and served via: https://basecubeone.netlify.com/

## Install

### Ubuntu / Debian

* Setup Vuepress 
    * Add Yarn Debian Repository Key  
    ```curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -```
    
    * Register Yarn Debian Repository  
    ```echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list```

    * Install nodejs, npm, yarn  
    ```sudo apt-get update && sudo apt-get install nodejs npm yarn```

    * Navigate into the project folder and install vuepress  
    ```yarn add vuepress```

### MacOs

* Setup Vuepress
    * Via brew: ```brew install nodejs npm yarn```
    * Navigate into the project folder and perform:
```yarn add vuepress```

## Run Local Webserver
Navigate into the project folder and perform:
```yarn serve```

---
---
# How to setup BCO on Raspberry PI

## Hardware Requirements

## Install Middleware

### base setup
* set up base Raspbian from https://www.raspberrypi.org/downloads/ and follow the instructions
* `sudo apt install screen bison`
### install spread
* download from http://www.spread.org/download/spread-src-5.0.1.tar.gz (or newer, adapt file/dir names below in those cases) and copy file to Pi
* `tar xvf spread-src-5.0.1.tar`
* `cd spread-src-5.0.1`
* `./configure`
* `make -j4`
* `sudo make install`
### install OpenHAB
* follow instructions from https://www.openhab.org/docs/installation/openhabian.html#other-linux-systems-add-openhabian-just-like-any-other-software
* `sudo chmod ug+rws /etc/openhab2/sitemaps`

## Register Openbase Debian Repository

Register the repository public key
* `sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A0E4E7A057C6CF8D`

Register the repository
* `echo "deb https://dl.bintray.com/openbase/deb unstable main" | sudo tee -a /etc/apt/sources.list`

## Install BCO

* `sudo apt instal bco`

## First Start

## Setup Autostart via PM2


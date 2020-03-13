---
---
# How to setup BCO on Raspberry PI

## Hardware Requirements

## Install Middleware

* set up base Raspbian from https://www.raspberrypi.org/downloads/ and follow the instructions
* `sudo apt install screen bison`
* install spread
*  download from http://www.spread.org/download/spread-src-5.0.1.tar.gz (or newer, adapt file/dir names below in those cases) and copy file to Pi
*  `tar xvf spread-src-5.0.1.tar`
*  `cd spread-src-5.0.1`
*  `./configure`
*  `make -j4`
*  `sudo make install`
* install OpenHAB
*  follow instructions from https://www.openhab.org/docs/installation/openhabian.html#other-linux-systems-add-openhabian-just-like-any-other-software
* 

todo: explain spread setup

## Register Debian Repository

## Install BCO

## First Start

## Setup Autostart via PM2


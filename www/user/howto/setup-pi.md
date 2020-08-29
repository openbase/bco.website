---
---
# How to setup BCO on Raspberry PI

## Hardware Requirements

* Pi 4 with at least 4GB is recommended
* SD Card with at least 16 GB (In order to store some historical data).
* Direct ethernet connection to your router is recommended
  
## PI Preperations
1. Please install a fresh Raspberry Pi OS (previously called Raspbian) on your Pi [Install Paspberry Pi OS](https://www.raspberrypi.org/downloads/)
2. Make sure you have SSH access enabled on your pi. [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/)
3. Login via ssh to your PI
   1. Default ```ssh pi@raspberrypi```

## Define Default User
If you what to keep the "pi" user as default user just execute the following command, otherwise store the name of the default user in the following variable:

```bash
export DEFAULT_USER=$(whoami)
```

## Setup Docker Environment

Follow the official setup guidelines at [Docker Docs](https://docs.docker.com/engine/install/debian/)
or follow this short summary:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Add default user to docker group
```bash
sudo usermod -aG docker ${DEFAULT_USER}
```

## Spread Setup

### Create Docker Container
```bash
sudo docker run \
        --name spread \
        --net=host \
        -p 4803:4803 \
        -d \
        --restart=always \
        openbaseorg/spread:latest
```

## Openhab Setup

Openhab User und Gruppe anlegen
```bash
sudo adduser --system --shell /sbin/nologin openhab
sudo addgroup --system openhab
sudo usermod -a -G openhab openhab
```
enable the openhab user to access usb gateways such as zwave or zigbee sticks
```bash
sudo usermod -a -G dialout openhab
sudo usermod -a -G tty openhab
```

### Add default user to openhab group
```bash
sudo usermod -a -G openhab ${DEFAULT_USER}
```

### Create Openhab Docker
```bash
sudo docker run \
    --name openhab \
    --net=host \
    -v /etc/localtime:/etc/localtime:ro \
    -v /etc/timezone:/etc/timezone:ro \
    -v openhab_conf:/openhab/conf \
    -v openhab_userdata:/openhab/userdata \
    -v openhab_addons:/openhab/addons \
    -d \
    -e USER_ID=$(id -u openhab) \
    -e GROUP_ID=$(getent group openhab | cut -d: -f3) \
    --restart=always \
    --device=/dev/ttyACM0 \
    openhab/openhab:2.5
```

## BCO Setup

### BCO User und Gruppe anlegen
```bash
sudo adduser --system --shell /sbin/nologin bco
sudo addgroup --system bco
sudo usermod -a -G bco bco
```

### Add default user to bco group
```bash
sudo usermod -a -G bco ${DEFAULT_USER}
```

### Create BCO Core Docker
```bash
sudo docker run \
    --name bco \
    --net=host \
    --volume /etc/localtime:/etc/localtime:ro \
    --volume /etc/timezone:/etc/timezone:ro \
    --volume bco_data:/home/bco/data \
    --detach \
    --env USER_ID=$(id -u bco) \
    --env GROUP_ID=$(getent group bco | cut -d: -f3) \
    --restart=always \
    -t \
    openbaseorg/bco:experimental
```

### Create BCO Device Manager Openhab Docker
```bash
sudo docker run \
    --name bco-device-manager-openhab \
    --net=host \
    --volume /etc/localtime:/etc/localtime:ro \
    --volume /etc/timezone:/etc/timezone:ro \
    --volume bco_data:/home/bco/data \
    --volume openhab_conf:/etc/openhab2 \
    --detach \
    --env USER_ID=$(id -u bco) \
    --env GROUP_ID=$(getent group bco | cut -d: -f3) \
    --env OPENHAB_GROUP_ID=$(getent group openhab | cut -d: -f3) \
    --restart=always \
    -t \
    openbaseorg/bco-device-manager-openhab:experimental
```

### enable bco to access the sitemap directory in order to generate or update sitemaps
Make bco a member of the openhab group
```bash
sudo chmod -R g+rwX /var/lib/docker/volumes/openhab_conf/_data/sitemaps
sudo chgrp bco /var/lib/docker/volumes/openhab_conf/_data/sitemaps
```

## Setup Portainer as Docker Management Tool

https://www.portainer.io/installation/

# Outdated Stuff

## Tool Setup

Switch to python 3

`sudo ln -fs /usr/bin/python3 /usr/bin/python`


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

## Register openbase Debian Repository

Register the repository public key
* `sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys AAF438A589C2F541`

Register the repository (adjust distribution name if required to one of the following: wheezy, stretch, bionic, buster)
* `echo "deb https://dl.bintray.com/openbase/deb buster main" | sudo tee -a /etc/apt/sources.list`

In case you want to support the development of openbase applications as beta-tester, you can register the testing repo in order to receive alpha and beta releases. Those are maybe not that stable but feedback is always welcome.
* `echo "deb https://dl.bintray.com/openbase/deb buster testing" | sudo tee -a /etc/apt/sources.list`

Update your package list
* `sudo apt update`

## Install BCO

* `sudo apt install bco`

## First Start

## Setup Autostart via PM2


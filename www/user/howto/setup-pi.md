---
---
# How to setup BCO on Raspberry PI via Docker

::: warning
This installation description is in its early stage and any feedback welcome!
:::

## Hardware Requirements

* Pi 4 with at least 4GB is recommended.
* SD Card with at least 16 GB (In order to store some historical data).
* Direct ethernet connection to your router is recommended.
  
## PI Preperations
1. Install a fresh Raspberry PI OS (previously called Raspbian) on your PI [Install Paspberry Pi OS](https://www.raspberrypi.org/downloads/)
2. Make sure you have SSH access enabled on your PI. [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/)
3. Login via ssh to your PI
   1. Default ```ssh pi@raspberrypi```

## Define Default User
If you what to keep the PI user as default user just execute the following command, otherwise store the name of the default user in the following variable:

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
        openbaseorg/spread:version-5.0.2-armhf
```

## Openhab Setup

Create a new openHAB user + group
```bash
sudo adduser --system --shell /usr/sbin/nologin openhab
sudo addgroup --system openhab
sudo usermod -a -G openhab openhab
```
Enable the openHAB user to access usb gateways such as zwave or zigbee sticks
```bash
sudo usermod -a -G dialout openhab
sudo usermod -a -G tty openhab
```

### Add the default user to openHAB group
```bash
sudo usermod -a -G openhab ${DEFAULT_USER}
```

### Setup Z-Wave USB Stick
::: warning INFO
Skip this step if you do not have a Z-Wave USB Stick!
:::
At this point, make sure your Z-Wave USB Stick is plugged in and that it is available under the following path:
```bash
export ZWAVE_STICK=--device=/dev/ttyACM0
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
    $ZWAVE_STICK \
    openhab/openhab:latest
```

## BCO Setup

### BCO User und Gruppe anlegen
```bash
sudo adduser --system --shell /usr/sbin/nologin bco
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

### Enable BCO to access the sitemap directory in order to generate or update sitemaps
Make BCO user a member of the openHAB group
```bash
sudo chmod -R g+rwX /var/lib/docker/volumes/openhab_conf/_data/sitemaps
sudo chgrp bco /var/lib/docker/volumes/openhab_conf/_data/sitemaps
```

## Setup Portainer as Docker Management Tool

The official installation can be found at: [Portainer Doc](https://www.portainer.io/installation/)
Or use this shortcut for the pi: 
```bash
sudo docker volume create portainer_data
sudo docker run \
    -d -p 8000:8000 \
    -p 9000:9000 \
    --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data portainer/portainer
```
After the installation has finished, you can access portainer via port 9000
In case you did not change your PI`s hostname try: [http://raspberrypi:9000](http://raspberrypi:9000)

Now, the docker setup is finished and you can continue with the [initial openHAB setup](/user/howto/setup-openhab.md).

# How to setup BCO directly on Raspberry PI OS
::: warning
This installation description is in its early stage and any feedback welcome!
:::

## Compile and Install the Spread Middleware

## PI Preperations
1. Install a fresh Raspberry PI OS (previously called Raspbian) on your PI [Install Paspberry Pi OS](https://www.raspberrypi.org/downloads/)
2. Make sure you have SSH access enabled on your PI. [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/)
3. Login via ssh to your PI
   1. Default ```ssh pi@raspberrypi```

### Manually compile and install Spread directly on the PI
1. [Download Spread](http://www.spread.org/download/spread-src-5.0.1.tar.gz) and copy the file to the PI.
2. Compile and Install Spread
```bash
sudo apt install bison
tar xvf spread-src-5.0.1.tar
cd spread-src-5.0.1
./configure
make -j4
sudo make install
```

### Directly install OpenHAB on Pi
1. Follow instructions from https://www.openhab.org/docs/installation/openhabian.html#other-linux-systems-add-openhabian-just-like-any-other-software
2. Make sure the sitemap folder is writeable:
```bash
sudo chmod ug+rws /etc/openhab2/sitemaps
```

## Directly install BaseCubeOne on Pi

Follow the [Debian Installation Guide](/user/installation.md#on-debian-based-systems).
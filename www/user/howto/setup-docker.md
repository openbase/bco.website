---
---
# How to setup BCO via Docker

::: warning
This installation description is in its early stage and any feedback welcome!
:::
  
## Define Default User
If you what to use the current user as default one just execute the following command, otherwise store the name of the default user in the following variable:

```bash
export DEFAULT_USER=$(whoami)
```

## Setup Docker Environment

1. Follow the official setup guidelines at [Docker Docs](https://docs.docker.com/engine/install/debian/)
   * Short summary for the pi:
     1. `curl -fsSL https://get.docker.com -o get-docker.sh`
     2. `sudo sh get-docker.sh`
2. Add default user to docker group
```bash
sudo usermod -aG docker ${DEFAULT_USER}
```

## Spread Setup

### Create Docker Container
```bash
sudo docker run \
        --name spread \
        --net=host \
        -d \
        --restart=always \
        openbaseorg/spread:latest
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
Or use this shortcut: 
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
for example: [http://yourhostname:9000](http://yourhostname:9000)

## Next Step

Now, the docker setup is finished and you can continue with the [initial openHAB setup](/user/howto/setup-openhab.md).

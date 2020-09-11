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
  
## PI Preparation
1. Install a fresh Raspberry PI OS (previously called Raspbian) on your PI [Install Raspberry PI OS](https://www.raspberrypi.org/downloads/)
2. Make sure you have SSH access enabled on your PI. [Enable SSH](https://www.raspberrypi.org/documentation/remote-access/ssh/)
3. Login via ssh to your PI
   1. Default ```ssh pi@raspberrypi```

## Next Step

Now, you can follow the [docker setup guide](/user/howto/setup-docker.md).

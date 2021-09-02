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
1. Install a fresh Ubuntu Server 64-bit on your PI [Install Ubuntu Server](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview)
2. Login via ssh to your PI (the installation guide includes description on how to get the ip-address)
   1. Default ```ssh ubuntu@<ip-address>```
3. (Optional) Create a new user:
   1. `sudo adduser <username>`
   2. `sudo usermod -aG sudo <username>`
   3. Close ssh session `CTRL-D` and reconnect `ssh <username>@<ip-address>`

::: tip
We recommend 64-bit operating systems to run BCO.
:::

## Next Step

Now, you can follow the [docker setup guide](/user/howto/setup-docker.md).

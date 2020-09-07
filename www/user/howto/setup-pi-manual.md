---
---
# How to setup BCO directly on Raspberry PI OS
::: warning
This installation description is in its early stage and any feedback welcome!
:::

## Compile and Install the Spread Middleware

## PI Preparation
1. Install a fresh Raspberry PI OS (previously called Raspbian) on your PI [Install Raspberry PI OS](https://www.raspberrypi.org/downloads/)
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
1. Follow instructions from [OpenHABian](https://www.openhab.org/docs/installation/openhabian.html#other-linux-systems-add-openhabian-just-like-any-other-software) 
2. Make sure the sitemap folder is writeable:
```bash
sudo chmod ug+rws /etc/openhab2/sitemaps
```

## Next Step
Directly install BaseCubeOne on PI by following the [Debian Installation Guide](/user/howto/setup-debian.md#setup-the-openbase-debian-repository).
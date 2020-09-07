# Installation - On Debian based Systems

## Setup the openbase Debian Repository

Register the repository public key
```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys AAF438A589C2F541
```

Register the repository (adjust distribution name if required to one of the following: `wheezy`, `stretch`, `bionic`, `buster`)
```bash
echo "deb https://dl.bintray.com/openbase/deb buster main" | sudo tee -a /etc/apt/sources.list
```

In case you want to support the development of openbase applications as beta-tester, you can register the testing repo in order to receive alpha and beta releases. Those are maybe not that stable but feedback is always welcome.
```bash
echo "deb https://dl.bintray.com/openbase/deb buster testing" | sudo tee -a /etc/apt/sources.list
```

Update your package list
```bash
sudo apt update
```

### Install BCO

```bash
sudo apt install bco
``` 

## Next Steps

Now, the docker setup is finished and you can continue with the [initial openHAB setup](/user/howto/setup-openhab.md).
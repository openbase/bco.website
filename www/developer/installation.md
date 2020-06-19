# Developer Installation Guide

## Supported Platforms
* BCO Runtime
  * Ubuntu / Debian
* BCO UIs
  * Ubuntu / Debian / Linux
  * Windows 
  * Mac OS

## Requirements

* Java JDK 11 (AZUL Zulu JDK recommended)
    * Download: <https://www.azul.com/downloads/zulu>
    * Ubuntu Install Example
      * Add Key: ```sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 0xB1998361219BD9C9```
      * Add Repo: ```sudo apt-add-repository 'deb http://repos.azulsystems.com/ubuntu stable main'```
      * Update Index: ```sudo apt-get update```
      * Install: ```sudo apt-get install zulu-11```
      * Make Default: ```echo 'export JAVA_HOME="/usr/lib/jvm/zulu-11-amd64/"' >> ~/.bashrc && . ~/.bashrc```
* Maven
    * ```sudo apt-get install maven```
* Git
    * ```sudo apt-get install git```

##  Toolchain Setup

Define where to install the bco distribution via the prefix variable.
```
echo 'export prefix="$HOME/local/bco"' >> ~/.bashrc
```
Add the ```bin``` folder to your global ```$PATH``` variable to support direct binary execution.
```
echo 'export PATH="$PATH:$prefix/bin:$prefix/usr/bin"' >> ~/.bashrc
```
Reload your bash configuration
```
. ~/.bashrc
```
Make sure the ```$prefix``` folder exists.
```
mkdir -p $prefix
```
Make sure you have right permissions to ```$prefix```
```
sudo chown -R $USER $prefix
chmod -R 750 $prefix
```

## Setup Cor-Lab Debian Repository

This repository provides a collection of pre-compiled libs and tools for rsb. This includes transport layers like spread as well as dev-libs for using rsb in python or c++. To register the repository to your local debian package manager follow the instructions on [http://packages.cor-lab.de/](http://packages.cor-lab.de/)
* example for ubuntu bionic
  ```
  echo 'deb http://packages.cor-lab.de/ubuntu/ bionic main' | sudo tee -a /etc/apt/sources.list
  echo 'deb http://packages.cor-lab.de/ubuntu/ bionic testing' | sudo tee -a /etc/apt/sources.list
  wget -q http://packages.cor-lab.de/keys/cor-lab.asc -O- | sudo apt-key add -
  sudo apt-get update
  ```

## Spread Installation

[Spread](http://www.spread.org/download.html) is the recommended and most stable transport protocol for bco.

* Installation via Cor-Lab Debian Repository
    * ```sudo apt-get install spread```
* Official Installation Guide
    * <http://www.spread.org/download.html>

## RSB Configuration

By default, all bco components try to establish a connection to a spread daemon running on your local machine. The following steps are required to connect to a spread daemon running on a remote machine:
Create the configuration file ```touch ~/.config/rsb.conf``` and add the following lines to deactivate the socket, enable the spread transport protocol and to define the spread host (by set up its IP in the lines below).
::: warning INFO
Set the IP in the line ```host    = 192.168.x.x``` to match your spread host.
It can also be set to ```localhost``` if you run everything locally (```host    = localhost```).
:::
```
[transport.socket]
enabled = 0
    
[transport.spread]
enabled = 1
host    = 192.168.x.x
```

## BCO Installation

After preparing the toolchain and middleware we need to prepare our workspace.
Create a new development directory if it not already exist (e.g. ``~/workspace/openbase``) and change into these directory.
```
mkdir -p ~/workspace/openbase
cd ~/workspace/openbase
```

### Openbase Developer Tool Installation

There exist different openbase tools which help to to simplify the installation and maintenance of bco.
Therefore, before downloading bco we should install those tools via:
```
cd ~/workspace/openbase
git clone -b master https://github.com/openbase/developer.tools.git
cd developer.tools
./install.sh
```

### Main Repository Download 

Download the bco main repository into your development workspace.
```
cd ~/workspace/openbase
git clone -b master https://github.com/openbase/bco.git
```
::: tip INFO
We recommend to checkout and install the ```master``` branch in case you start the development of new components.
The ```latest-stable``` branch is still linking against BCO 1.6 which will be soon replaced by BCO 2.0.
Be aware to [setup the snapshot repository](#setup-snapshot-repository) before building the ```master``` branch.
:::

### Setup Snapshot Repository
::: tip INFO
This step is only required if you are using a non release branch (e.g. master) or link against it.
:::

BCO is using maven as build tool. All dependencies are deployed at the central maven repositories and will be downloaded without any specific configuration for stable releases.
In case you want to build a bco nightly release or your project depends on any snapshots you have to add the following public repository configuration profile to your maven settings file (```~/.m2/settings.xml```).

```xml
<?xml version="1.0"?>
<settings>
<!-- ... -->
    <profiles>
        <profile>
            <id>openbase</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <downloadJavadocs>true</downloadJavadocs>
                <downloadSources>true</downloadSources>
            </properties>
        </profile>
        <profile>
            <id>sonatype</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <repositories>
                <repository>
                    <id>sonatype-oss-public</id>
                    <url>https://oss.sonatype.org/content/groups/public/</url>
                    <releases>
                        <enabled>true</enabled>
                        <updatePolicy>daily</updatePolicy>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                        <updatePolicy>interval:60</updatePolicy>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
<!-- ... -->
</settings>
```

### Download and Prepare BCO Submodules

BCO is split into different sub-module and each of these sub-module is stored in its own repository while the main repository just bundles all sub-module repositories via ```git-modules```. The ```./prepare.sh``` script supports you to download the sourcecode of each sub-modules.
Therefore, please execute
```
cd ~/workspace/openbase/bco
./prepare.sh
./update.sh
```
in order to prepare all sub-modules and download their sourcecode. Once the preperation is done, all sub-modules should be available in the  ```module``` directory.

If the workspace is prepared, we can use the ```all``` script provided by the developer tools to ease all submodule operations.
The ```all``` command just executes the given command for all sub-modules.
Therefore, the following command can be used to compile all submodule and to install their binaries into the target directory defined by the ```$prefix``` variable.
```
cd ~/workspace/openbase/bco
all ./install.sh
```
::: tip INFO
The initial installation can take a while, so grab a coffee and relax while the scripts to the hard work.
:::

Now everything should be ready to start the development of new bco components and apps. We recommend to use IntelliJ as IDE for BCO.
The main repository includes an IntelliJ project configuration so just open ```~/workspace/openbase/bco``` in the IDE or just execute ```idea ~/workspace/openbase/bco``` in case IntelliJ is provided by your shell.

### Update

You can update bco including all sub-modules by executing ```./update.sh```. Just make sure all local changes are committed and pushed before performing the update. After updating all components you can compile and install all changes via the ```./install.sh``` script. Therefore, a full update can be performed as followed:
```
./update.sh
./install.sh
```

## Database Setup

A fresh and empty database is generated during the first start of BCO.
This database is placed at ```~/.config/bco/var/registry/db``` and only contains a root location and some system user accounts as well as the default admin account.
::: warning INFO
Please do not modify any database entries by hand as long as you exactly know what you are doing since manual modifications can lead into an inconsistent database.
:::
Once bco is started you can add further units by adding them via the ``bco-registry-editor``. User accounts can be created and passwords changed via ``bco-console``. 

In general bco takes care of all class and template database entries. Those will be updated during each startup of bco as long as an internet connection is provided.
In case you want to backup your individual setup entries just create a local git repository in the database folder and upload it to any git remote repository of your choice.
::: warning INFO
In general we recommend to use GIT to versioning your database. But please make sure the external BCO maintained DBs (template/class) are excluded via ```.gitignore```.
:::
However, please make sure that the bco class and template repositories are not part of the git. Do to so, just create the following ```.gitignore``` file.    
```
// ~/.config/bco/var/registry/db/.gitignore
activity-template-db
agent-class-db
app-class-db
device-class-db
service-template-db
unit-template-db
```

### How to setup a Demo Database
Sometimes its useful during development to play around with an already complex environment setup.
The following steps explain how to setup such an example database. 
```
mkdir -p ~/.config/bco/var/registry
cd ~/.config/bco/var/registry
git clone https://github.com/csra/bco.registry.csra-db db
```

### How to Restore a Backup

To restore an already existing bco setup, just place the related ```db``` directory within ```~/.config/bco/var/registry```.

## Additional Tools

### RSB Libs and Tools (Optional)

The rsb python and c++ libs can be installed via the cor-lab debian repository as well as the rsb developer tools:
```
sudo apt-get install librsc0.18 librsb0.18 rsb0.18 rst0.18 cl-rsb rsb-tools-cpp0.18 rsb-tools-cl0.18
```


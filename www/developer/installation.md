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
* example for ubuntu xenial
  ```
  echo 'deb http://packages.cor-lab.de/ubuntu/ xenial main' | sudo tee -a /etc/apt/sources.list
  echo 'deb http://packages.cor-lab.de/ubuntu/ xenial testing' | sudo tee -a /etc/apt/sources.list
  wget -q http://packages.cor-lab.de/keys/cor-lab.asc -O- | sudo apt-key add -
  sudo apt-get update
  ```

## Spread Installation

[Spread](http://www.spread.org/download.html) is the recommended and most stable transport protocol for bco.

* Installation via Cor-Lab Debian Repository
    * ```sudo apt-get install spread librsbspread0.18```
* Official Installation Guide
    * <http://www.spread.org/download.html>
    
## RSB Libs and Tools (Optional)

The rsb python and c++ libs can be installed via the cor-lab debian repository as well as the rsb developer tools:
```
sudo apt-get install librsc0.18 librsb0.18 rsb0.18 rst0.18 cl-rsb rsb-tools-cpp0.18 rsb-tools-cl0.18
```

## RSB Configuration

By default, bco connects to a setup running on your local host. The following steps are required to connect to a BCO remote host instance:
Create the configuration file ```touch ~/.config/rsb.conf``` and add the following lines to deactivate the socket, enable the spread transport protocol and to define the spread host. 
```
[transport.socket]
enabled = 0
    
[transport.spread]
enabled = 1
#host    = localhost
host    = 192.168.x.x
```

## BCO Installation

Create a new development directory if it not already exists (e.g. ``~/workspace/openbase``) and change into these directory.
```
mkdir -p ~/workspace/openbase
cd ~/workspace/openbase
```

## Repository Download 

Download the bco core repository into your development workspace.
```
cd ~/workspace/openbase
git clone -b master https://github.com/openbase/bco.git
```
::: tip INFO
We recommend to checkout and install the ```master``` branch in case you start the development of new components.
The ```latest-stable``` branch is still linking against BCO 1.6 which will be soon replaced by BCO 2.0.
Be aware to [setup the snapshot repository](#setup-snapshot-repository) before building the ```master``` branch.
:::
This core repository provides all binaries and libraries needed to start and setup BCO. Additionally, the sourcecode of the bco core components is provided as well via sub-modules (exclusive for bco core development). Those are empty by default and only required for BCO core development. More details about how to build the entire project form scatch can be found at the last installation section. 

## Setup Snapshot Repository
::: tip INFO
This step is only required if you are using a non release branch (e.g. master) or link against it.
:::

BCO is using the maven as build tool. All dependencies are deployed at the central maven repositories and will be downloaded without any specific configuration for stable releases. In case you want to build a bco snapshot release or your project depends on any snapshots you have to add the following public repository configuration to your global maven settings file (```~/.m2/settings.xml```).

```xml
<?xml version="1.0"?>
<settings>
<!-- ... -->
    <profiles>
        <profile>
            <id>openbase</id>
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

## Installation

Now, you should be able to start the installation. During this, all bco core components are installed to the previously defined ```$prefix```. To perform the installation (or update the components later on) execute the installation script provided by the bco folder.
```
./install.sh
```

## How to Restore a Backup or Demo Database

To restore an already existing bco setup, just place the related ```db``` directory within ```~/.config/bco/var/registry```. Sometimes its useful during development to play around with an already complex environment setup. The following steps explain how to setup such an example database. 
```
mkdir -p ~/.config/bco/var/registry
cd ~/.config/bco/var/registry
git clone https://github.com/csra/bco.registry.csra-db db
```
::: tip INFO
In general we recommend to use GIT to versioning your database. But please make sure the external BCO maintained DBs (template/class) are excluded via ```.gitigrone```.
:::
```
// ~/.config/bco/var/registry/db/.gitignore
activity-template-db
agent-class-db
app-class-db
device-class-db
service-template-db
unit-template-db
```

## BCO Core Component Development Preparations

::: tip INFO
This section is only required if you plan to extend or bug-fix any BCO core components.
:::

Before diving into the BCO core development the sourcecode needs to be downloaded and compiled for each submodule.
Because BCO persists of many submodules provided by different repositories you can use the openbase developer tools to simplify the handling.
Therefore, the first step is to download and install those tools via:
```
cd ~/workspace/openbase
git clone -b master https://github.com/openbase/developer.tools.git
cd developer.tools
./install.sh
```
Then the workspace needs to be prepared by download the latest submodule source-code.
```
cd ~/workspace/openbase/bco
./workspace-prepare.sh
./workspace-update.sh
```
If the workspace is prepared, we can use the ```all``` script to ease all submodule operations. It just executes the given command for all submodules.
Therefore, the following command can be used to compile and to install all submodule binaries into the workspace:
```
cd ~/workspace/openbase/bco
all ./install.sh
```
::: tip INFO
The initial installation can take a while, so relax and let the scripts to the work.
:::

::: warn
Once you start building BCO via its submodules you should avoid to use the ```install.sh``` script on repository top level.
Otherwise you might overwrite and downgrade your binaries placed in the ```bin``` folder of your ```$prefix```.
:::

Now everything should be ready to start the development. We recommend to use IntelliJ as IDE for BCO.
The repository includes an IntelliJ project configuration so just open ```~/workspace/openbase/bco``` in the IDE.



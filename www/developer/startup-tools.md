### How to start BCO

#### Provide a Spread Daemon

First of all we need at least one running spread daemon in your network to provide the communication between all distributed bco components.
You can choose to start your own spread daemon or to connect to an already running instance.

* Start a new spread daemon on your localhost machine
    * just execute ```spread```
* Connect to an already running instance
    * Make sure the external spread host is properly defined in the rsb configuration. 
        * Example: If there is a spread instance running on host ```spider``` your config file should provide the following entry.
            * ```~/.config/rsb.conf``` should contain ```host    = spider```
        * More details about the rsb configuration can be found at the [developer installation](installation.md) section.

#### Start BCO

You can start the bco test runtime with the following command:

```
bco-test
```

### Developer Tools
Registry introspection tool which can be used to manually modify configuration, class and template entries. 
```
bco-registry-editor
```
Util to print the current content of the registry
```
bco-print-registry
```
Util which prints the native rsb api of bco.
```
bco-print-interface-rsb
```
Util to query units via its [id, label, alias, location, type, scope].
Once a unit could be resolved via the given argument, its basic properties are printed.
It's for example useful during development to resole an alias of an unit when only its label is known.
```
bco-query
```
```
bco-action-inspector
```
```
bco-visual-remote
```

::: tip INFO
All bco binaries are offering a help page which can be accessed via the ```--help``` argument.
:::

### Simulation Mode

You can test and prove new components in a simulated environment.
```
bco-test --simulate
```

### Benchmark Mode

You can test new components via the benchmark mode to prove how your components act during massive bco system load.
During the benchmark, bco will start in simulation mode and high frequenly unit state changes are generated.
::: warning WARN
Please never start the benchmark mode if you are connected to any physical devices to avoid hardware damage.
:::
```
bco-test --benchmark
```

## Control Interfaces

### Desktop (JavaFX)
#### BCozy
![GUI Overview](/images/bcozy/bcozy_gui_overview.png)

[![Build Status](https://travis-ci.org/openbase/bco.bcozy.svg?branch=master)](https://travis-ci.org/openbase/bco.bcozy?branch=master)
[![Build Status](https://travis-ci.org/openbase/bco.bcozy.svg?branch=latest-stable)](https://travis-ci.org/openbase/bco.bcozy?branch=latest-stable)
* [Details](ui/bcozy.md)

### Android
#### BComfy
* [Details](ui/bcomfy.md)

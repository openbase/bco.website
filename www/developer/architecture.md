# BCO Software Architecture

## Domotic Abstraction Layer (DAL)

![DALayer](/images/DALayer.png)

### Unit Types

![UnitClassDiagramm](/images/UnitClassDiagramm.png)

## Location Architecture

![LocationClassStructure](/images/LocationArchitecture_ClassStructure.png)

![LocationHierarchicalStructure](/images/LocationArchitecture_HierarchicalStructure.png)

![LocationGraphStructure](/images/LocationArchitecture_GraphStructure.png)

### Modifications

#### Removal

* The root location cannot be removed
* Removing a location causes every unit to be moved to its parent
* Removing a tile causes two additional effects:
   * Regions inside the tile are removed recursively
   * Every connection connecting this tile and only one other tile is removed

### Guidelines

* The transformation provided by each unit transforms between the unit and its parent location.
    * parent location: ```unit_config -> placement_config -> location_id```
* Regions are translated but not rotated within a tile.
* The position of a unit is anchored to the base of its 3d bounding box.
* Bounding box base should be aligned to the unit position which means the bounding box offset (left_front_bottom) should not be used!

# Software Components

![GUI Overview](/images/BCO_Architecture_Paramite.png)

## Core Framework

### BCO Registry
[![Build Status](https://travis-ci.org/openbase/bco.registry.svg?branch=master)](https://travis-ci.org/openbase/bco.registry?branch=master)
[![Build Status](https://travis-ci.org/openbase/bco.registry.svg?branch=latest-stable)](https://travis-ci.org/openbase/bco.registry?branch=latest-stable)

#### Maven Artifact
```xml
<dependency>
    <groupId>org.openbase</groupId>
    <artifactId>bco.registry</artifactId>
    <version>[2.0-SNAPSHOT,2.1-alpha)</version>
</dependency>
```

Repository: <https://github.com/openbase/bco.registry.git>

### BCO DAL
[![Build Status](https://travis-ci.org/openbase/bco.dal.svg?branch=master)](https://travis-ci.org/openbase/bco.dal?branch=master)
[![Build Status](https://travis-ci.org/openbase/bco.dal.svg?branch=latest-stable)](https://travis-ci.org/openbase/bco.dal?branch=latest-stable)

#### Maven Artifact
```xml
<dependency>
    <groupId>org.openbase</groupId>
    <artifactId>bco.dal.remote</artifactId>
    <version>[2.0-SNAPSHOT,2.1-alpha)</version>
</dependency>
```

Repository: <https://github.com/openbase/bco.dal.git>

### BCO Device Manager
[![Build Status](https://travis-ci.org/openbase/bco.device.svg?branch=master)](https://travis-ci.org/openbase/bco.device?branch=master)
[![Build Status](https://travis-ci.org/openbase/bco.device.svg?branch=latest-stable)](https://travis-ci.org/openbase/bco.device?branch=latest-stable)

Repository: <https://github.com/openbase/bco.device.git>

### BCO App Manager
[![Build Status](https://travis-ci.org/openbase/bco.app.svg?branch=master)](https://travis-ci.org/openbase/bco.app?branch=master)
[![Build Status](https://travis-ci.org/openbase/bco.app.svg?branch=latest-stable)](https://travis-ci.org/openbase/bco.app?branch=latest-stable)

Repository: <https://github.com/openbase/bco.app.git>
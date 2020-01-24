# Code Examples

This examples can be used as kick-off before jumping into the bco development. They pick up the basic functions like how to query, control and access any units.

::: tip Note
Please make sure spread and bco are started within your network before executing the howtos.
:::

## Java DAL Remote

For running any java examples you only need to include the dal remote dependency in your maven or gradle project description:

```xml
<dependency>
    <groupId>org.openbase</groupId>
    <artifactId>bco.dal.remote</artifactId>
    <version>[2.0-SNAPSHOT,2.1-alpha)</version>
</dependency>
```

### How to query unit configurations
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToQueryUnits.java)

Query units
```java
LOGGER.info("query lights");
final List<UnitConfig> lightUnitConfigList =
    Registries.getUnitRegistry().getUnitConfigsByLocationIdAndUnitType(locationId, unitType);
```

### How to activate a scene
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToActivateASceneViaDAL.java)

Request the unit
```java
LOGGER.info("request the scene with the alias \"Scene-9\"");
testScene = Units.getUnitByAlias("Scene-9", true, Units.SCENE);
```
Control the unit
```java
LOGGER.info("activate the scene");
testScene.setActivationState(ActivationState.State.ACTIVE);
```

### How to control a colorable light
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToControlAColorableLightUnitViaDAL.java)

Request the unit
```java
LOGGER.info("request the light unit with the alias \"ColorableLight-0\"");
testLight = Units.getUnitByAlias("ColorableLight-7", true, Units.LIGHT_COLORABLE);
```
Control the unit
```java
LOGGER.info("switch the light on");
testLight.setPowerState(PowerState.State.ON);

LOGGER.info("switch light color to red");
testLight.setColor(HSBColor.newBuilder().setHue(0d).setSaturation(1d).setBrightness(1d).build());
```

### How to observe a location specific reed contact
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToObserveLocationSpecificReedContactsViaDAL.java)

### How to observe service state changes
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToObserveServiceStateChangesViaDAL.java)

### How to observe motion states of rooms
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToObserveMotionStatesOfAllRooms.java)

Observe a locations motion state
```java
location.addServiceStateObserver(ServiceTempus.CURRENT, ServiceType.MOTION_STATE_SERVICE, (source, data) -> {
    // we know its a motion state
    final MotionState motionState = (MotionState) data;
    LOGGER.info("EXAMPLE 2: "+location.getLabel("?") + " has changed its motion state to " + motionState.getValue().name());
});
```

### How to resolve units via its label
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToResolveUnitsViaItsLabelForVerbalInteraction.java)

Resolve the label
```java
final List<UnitConfig> targetUnitConfigs =
    Registries.getUnitRegistry().getUnitConfigsByLabel(unitLabel);
```


## Java RSB

### How to observe service state changes
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/java/org/openbase/bco/dal/example/HowToObserveServiceStateChangesViaRSB.java)

## Python RSB

### How to request, control and observe units
* [Complete Code Example](https://github.com/openbase/bco.dal/blob/master/example/src/main/python/org/openbase/bco/dal/example/HowToGivePowerConsumptionColorFeedbackViaRSB.py)

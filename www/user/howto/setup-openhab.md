# Initial openHAB Setup

Please make sure the Simple Mode of openHAB is disabled before connecting BCO to openHAB.

PaperUI → Configuration → System → Item Linking → Simple Mode → Disable

After Deactivation, please make sure that all existing items are marked as editable.
To do so, checkout the item list and validate that for each item entry the Trash Bin Symbol is displayed next to the Pencil Symbol.
If this is not the case you should [remove all items ](./setup-openhab.md#how-to-remove-all-item-entries)(BCO will recreate them anyway later on).

### How to remove all item entries

Enter the openHAB client console of your openHAB docker container
```
docker exec -it openhab /openhab/runtime/bin/client
```
::: tip
The default password for the login is: `habopen`
:::

Use the following command within the openHAB console in order to remove all items: 
```
smarthome:links clear
smarthome:items clear
```
Afterwards, just restart the BCO openHAB Device Manager container in order to recreate all items.




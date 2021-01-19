# Initial openHAB Setup
The setup differs for different OpenHAB versions.
Look only at the specific steps required for you version.

## OpenHAB 3.x.x

Access the OpenHAB UI over a webbrowser at `http://<OpenHAB_IP>:8080`.
Setup an initial user account and perform the other steps of the initial setup.

Afterwards you have to create an API Token so that BCO can authenticate its communication with OpenHAB.
To do this, access `http://<OPENHAB_IP>:8080/createApiToken`.
Enter the username and password of the user account you created and set "BCO" as the token name.
Leave the token scope field empty and click on the "Create API Token" button.
Then your generated API token of the form `oh.bco.<token>` should be displayed.
Copy this token and add the following entry to the meta config of the OpenHAB gateway config with the registry editor: 
`TOKEN=oh.bco.<token>`

## OpenHAB 2.x.x

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




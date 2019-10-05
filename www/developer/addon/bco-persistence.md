# BCO Persistence

This section introduces how ```InfluxDB ``` and the ```BCO Influxdb Connector``` app can be used to store the history of unit service state changes. This can for example be useful to compute and monitor the current economy level of the smart environment.

## How to setup InfluxDB

 [Get started](https://v2.docs.influxdata.com/v2.0/get-started/) with InfluxDB v2.0 to collect your data.  
 After you setup your initial user, bucket and organization you are able to use the database.
 
    * DEFAULT bucket: bco-persistence  
    * DEFAULT org: openbase


##  How to setup the BCO Influxdb Connector App.

The ```BCO Influxdb Connector``` is a BCO app which stores all unit changes into the influxdb.

1. ### Register the new App at the UnitRegistry  
   To install the InfluxDbConnector you need to register it by using the ```bco-registry-editor```.
   So please make sure you are connected to your BCO instance and start the ```bco-registry-editor```.
   Than, you need to navigate to: UnitRegistry → App  
   
   ![add_unit](/images/persistence/add_unit.png)
 
   Now add a new unit with right click → Add

   To add the InfluxDB connector class to the new unit, select InfluxDB Connector as AppClassId and press apply.

   ![add_unit_class](/images/persistence/new_unit.png)
   
2. ### Authenticate and Configure the App via Meta Configs
   Next, you have to setup a authentication token in order to be able to store new data into influxdb.
   Therefore lookup the token via the Chronograf interface (default: <http://localhost:9999> ). You will find your tokens here:
   ![influxd_token](/images/persistence/influxd_token.png)
   Than copy the token and past it into a new MetaConfig entry of the ```BCO Influxdb Connector``` via the ```bco-registry-editor``` e.g. ```INFLUXDB_TOKEN = PASTE_TOKEN_HERE```

       * INFLUXDB_URL → Url of your InfluxDB  (required)
            DEFAULT: http://localhost:9999
       * INFLUXDB_BUCKET → Name of the bucket where your data will be stored  (required)
            DEFAULT: bco-persistence
       * INFLUXDB_BATCH_TIME → Time limit(ms) after your batch is written to the database  (required)
            DEFAULT: 1000
       * INFLUXDB_BATCH_LIMIT → Max size of your batch  (required)
            DEFAULT: 100
       * INFLUXDB_ORG → Org for the bucket  (required)
            DEFAULT: openbase
       * INFLUXDB_ORG_ID → Id of the Org
       * INFLUXDB_TOKEN → Token with read and write access to your database  (required)

## How to query influx db.
InfluxDB 2.0 uses Flux as a functional data scripting language.
A good guide how to get started with Flux is provided by the official [Influxdb Documentation](https://v2.docs.influxdata.com/v2.0/query-data/get-started/).

## How to create a Chronograf widget 
   Chronograf is the user interface and administrative component of the InfluxDB platform.
   It is already included in influxdb 2.0.
   With Chronograf you can quickly see your data and build dashboards.  
   
   Therefore, you need to log into your Chronograf and select the Data Explorer.
   
   If you  have run ```bco-test --simulate``` and collected some data in your bucket, you should see some measurements.
   ![query_data](/images/persistence/chronograf_explorer.png)
   
   This query selects from the measurement ```power_consumption_state_service``` the field ```consumption``` data from the tag alias ```PowerConsumptionSensor-11```.  
   It creates this query in Flux (you can see the query when you select the 'Script Editor'):
   ![flux-query](/images/persistence/flux_query.png)
   
   There are more options to visualize the data like raw_data, histogram table etc.
   You can also save your graphs into dashboards.
   
   If you want know about the possibilities of chronograf you can have a look at the official documentation here [Chronograf Documentation](https://docs.influxdata.com/chronograf/v1.7/)
   
## Heartbeat
   The database contains a measurement 'heartbeat' with the field 'alive'. If the influxdb connector app is started, the value one is written into this field. Every 15 minutes the value one is written into the field again. When the app is closed a zero value is written into the field.  This can be used to check when the database was functional and stored data.
So you can consider possible downtimes during queries and calculations.


[Source Code](https://github.com/openbase/bco.app/tree/master/influxdbconnector)



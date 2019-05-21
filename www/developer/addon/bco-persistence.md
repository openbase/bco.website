# BCO Persistence

This section introduces how ```InfluxDB ``` and the ```BCO Influxdb Connector``` app can be used to store the history of unit service state changes. This can for example be useful to compute and monitor the current economy level of the smart environment.

## How to setup InfluxDB

 [Get started](https://v2.docs.influxdata.com/v2.0/get-started/) with InfluxDB v2.0 to collect your data.  
 After you setup your initial user, bucket and organization you are able to use the database.
 
    * DEFAULT bucket: bco-persistence  
    * DEFAULT org: openbase


##  How to setup setup the ```BCO Influxdb Connector``` via ```bco-registry-editor```.

1. ### UnitRegistry  
   To get a unit of the InfluxDbConnector class you need to register it.  
   Therefore, you need to choose: UnitRegistry → App  
   
   ![add_unit](/images/add_unit.png)
 
   Now add a new unit with right click → Add

   To add the InfluxDB connector class to the new unit, select InfluxDB Connector as AppClassId and press apply.

   ![add_unit_class](/images/new_unit.png)
    
      
   
3. ### Available Meta Config
   You also need to add some values to the MetaConfig of your new unit.
   If you want to use the default values all values except INFLUXDB_TOKEN are not necessary.
   
       * INFLUXDB_URL → Url of your InfluxDB  
            DEFAULT: http://localhost:9999
       * INFLUXDB_BUCKET → Name of the bucket where your data will be stored
            DEFAULT: bco-persistence
       * INFLUXDB_BATCH_TIME → Time limit(ms) after your batch is written to the database
            DEFAULT: 1000
       * INFLUXDB_BATCH_LIMIT → Max size of your batch 
            DEFAULT: 100
       * INFLUXDB_ORG → Org for the bucket 
            DEFAULT: openbase
       * INFLUXDB_TOKEN → Token with read and write access to your database
       

    When you log into your Chronograf interface (default: http://localhost:9999 ), you will find your tokens here:

    ![influxd_token](/images/influxd_token.png)

  

## How to query influx db.


InfluxDB 2.0 uses Flux as a functional data scripting language.
A good guide how to get started with Flux is provided by https://v2.docs.influxdata.com/v2.0/query-data/get-started/.
  
## How to create a Chronograf widget 
   Chronograf    is the user interface and administrative component of the InfluxDB platform.
   It is already included in influxdb 2.0.
   With Chronograf you can quickly see your data and build dashboards.
   
   Therefore, you need to log into your Chronograf and select the Data Explorer.
   
   If you  have run ```bco-test --simulate``` and collected some data in your bucket, you should see some measurements.
   ![query_data](/images/chronograf_explorer.png)
   
   This query selects from the measurement ```power_consumption_state_service``` the field ```consumption``` data from the tag alias ```PowerConsumptionSensor-11```.  
   It creates this query in Flux:
   ![flux-query](/images/flux_query.png)
   
   There are more options to visualize the data like raw_data, histogram table etc.
   You can also save your graphs into dashboards.
   
   If you want know about the possibilities of chronograf you can have a look at the official documentation here [Chronograf documentation](https://docs.influxdata.com/chronograf/v1.7/)
   
   


[Source Code](https://github.com/openbase/bco.app/tree/master/influxdbconnector)



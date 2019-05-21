# BCO Persistence

This section introduces how ```InfluxDB ``` and the ```BCO Influxdb Connector``` app can be used to store the history of unit service state changes. This can for example be useful to compute and monitor the current economy level of the smart environment.

## How to setup InfluxDB

 Visit https://v2.docs.influxdata.com/v2.0/get-started/ to get startet with InfluxDB 2.0.  
 After you setup your initial user, bucket and organization you are able to use the database.

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
       * INFLUXDB_BUCKET → Name of the bucket where your data will be saved 
            DEFAULT: bco-persistence
       * INFLUXDB_BATCH_TIME → Time limit after your batch is written to the database
            DEFAULT: 1000
       * INFLUXDB_BATCH_LIMIT → Max size of your batch 
            DEFAULT: 100
       * INFLUXDB_ORG → Org for the bucket 
            DEFAULT: openbase
       * INFLUXDB_TOKEN → Token with read and write access to your database
       
    You can find your influxdb token here:
    ![influxd_token](/images/influxd_token.png)

  

## How to query influx db.


InfluxDB 2.0 uses Flux as a functional data scripting language.
A good guide how to get started with Flux is provided by https://v2.docs.influxdata.com/v2.0/query-data/get-started/.
  
## How to create a grafana widget monitoring the current power history
   1. Grafana is...


[Source Code](https://github.com/openbase/bco.app ....)

![Grafana Widget Screenshot](/images/grafana.jpg)

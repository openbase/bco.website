## Demo Server Setup

In case you just want to play around with BCO without actual smart home devices being involved, you can setup a demo server.

```
 sudo docker run \
    --name bco-demo \
    --net=host \
    --volume /etc/localtime:/etc/localtime:ro \
    --volume /etc/timezone:/etc/timezone:ro \
    --env BCO_OPTIONS='--db /tmp/bco/db --simulate' \
    --detach \
    --restart=always \
    --log-driver=local \
    -t \
    openbaseorg/bco-demo:stable
```

Be aware that the demo server does not persist any data, which means all configuration changes are discarded after a service restart.

Remove the following line to disable hardware simulation:
```--env BCO_OPTIONS='--db /tmp/bco/db --simulate' \```
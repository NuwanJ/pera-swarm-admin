import React, { Component } from 'react';
import { Button } from 'reactstrap';
import mqttConfig from '../config/mqttConfig';
import MQTT from 'paho-mqtt';

const TOPIC_INFO = 'v1/localization/info';
const TOPIC_CREATE = 'v1/gui/create';
const TOPIC_CHANGE_COLOR = 'v1/sensor/color';
const _options = {};

class Test extends Component {
    constructor(props) {
        super(props)
        //console.log(mqttConfig);
        var client = new MQTT.Client(mqttConfig.host, Number(mqttConfig.port), "/socket.io", mqttConfig.options.clientId);

        //if(client.connect !== undefined){
        client.connect({
            userName: "swarm_user",
            password: "swarm_usere15",
            reconnect: true,
            useSSL: true,
            cleanSession: false,
            onSuccess: () => {
                client.subscribe("test");
                console.log('MQTT: connected check');
                //onMessageArrived = onMessageArrived;
                //onConnectionLost = onConnectionLost
            },
            onFailure: () => {
                console.log('MQTT: connection failed');
            },
        });



        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    publish(topic, message, callback) {
        var payload = new MQTT.Message(message);
        payload.destinationName = topic;
        this.client.send(payload);
        console.log('MQTT: published');

        if (callback != null) callback();
    }

    create(id, x, y, heading, callback) {
        console.log("create robot");
        var topic = TOPIC_CREATE;
        var payload = "Test!";
        var message = new MQTT.Message(payload);
        var callback = "Teset";
        this.publish(topic,message,callback );

    }

    delete(i,j,k,l) {
        console.log("delete robot");
    }


    render() {
        return (
            <div className="App">
                <Button variant="primary" onClick={this.create} >Create</Button>
                <br></br><br></br>
                <Button variant="primary" onClick={this.delete} >Delete</Button>
                <br></br><br></br>
            </div>
        );
    }
}

export default Test;
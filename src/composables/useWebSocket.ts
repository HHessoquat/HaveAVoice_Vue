import {ref} from "vue";

import {Client} from "@stomp/stompjs";
import type VoteWriteDto from "../model/Vote/VoteWriteDto.ts";

const voteData = ref(null);


const stompClient = new Client({
    brokerURL: import.meta.env.VITE_APP_WEBSOCKET_URL,
    reconnectDelay: 5000,
    onConnect: () => {
        console.log('starting connection with ws')
        stompClient.subscribe('/topic/vote', (message) => {
            voteData.value = JSON.parse(message.body);
        });
        console.log('connected to the server');
    },
    onStompError: (err) => {
        console.log(err.body);
    }
});

export function useWebSocket() {
    function connect() {
        stompClient.activate();
    }
    function disconnect() {
        stompClient.deactivate();
    }

    function sendVote(vote: VoteWriteDto) {
        stompClient.publish({
            destination: "/app/vote",
            body: JSON.stringify(vote),
        })
    }
    return {
        connect,
        disconnect,
        sendVoteMessage: sendVote,
        voteData
    }
}
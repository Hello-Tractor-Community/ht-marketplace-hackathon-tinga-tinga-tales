'use client';
import {Chatbox, Session} from "@talkjs/react";
import Talk from 'talkjs';
import { useCallback } from 'react';
import * as React from "react";
// const appId = process.env.NEXT_PUBLIC_APP_ID!;

export default function Chat() {

    const syncUser = useCallback(
        () =>
            new Talk.User({
                id: 'frank',
                name: 'Frank',
                email: 'frank@example.com',
                photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
                welcomeMessage: 'Hey, how can I help?',
            }),
        []
    );

    const syncConversation = useCallback((session: Talk.Session) => {
        // JavaScript SDK code here
        const conversation = session.getOrCreateConversation('new_conversation');

        const other = new Talk.User({
            id: 'nina',
            name: 'Nina',
            email: 'nina@example.com',
            photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
            welcomeMessage: 'Hi!',
        });
        conversation.setParticipant(other);
        conversation.setParticipant(session.me);

        return conversation;
    }, []);

    return(
        <Session appId="tX3c1LxB" syncUser={syncUser}>
            <Chatbox
                syncConversation={syncConversation}
                style={{ width: "100%", height: "500px" }}
            ></Chatbox>
        </Session>
    );
}
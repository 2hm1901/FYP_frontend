import React, { useEffect, useRef, useState, useContext } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

function ChatComponent({otherUserId, isOpen, onClose}) {
    const chatboxRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [chatbox, setChatbox] = useState(null);
    const {user} = useContext(AppContext);

    // Lấy thông tin người dùng
    useEffect(() => {
        setCurrentUser(user);

        axios.get(`/api/getUser?user_id=${otherUserId}`).then(response => {
            setOtherUser(response.data.data);
        }).catch(error => console.error('Error fetching other user:', error));
    }, [user]);

    // Khởi tạo TalkJS Chatbox
    useEffect(() => {
        if (!currentUser || !otherUser || !isOpen) {
            if (chatbox) {
                chatbox.destroy();
            }
            return;
        }

        Talk.ready.then(() => {
            const me = new Talk.User({
                id: currentUser.id.toString(),
                name: currentUser.username,
                email: currentUser.email,
                role: 'default',
            });

            const session = new Talk.Session({
                appId: 'tvZvoxPA',
                me: me,
            });

            const other = new Talk.User({
                id: otherUser.id.toString(),
                name: otherUser.username,
                email: otherUser.email,
                role: 'default',
            });

            const conversation = session.getOrCreateConversation(
                Talk.oneOnOneId(me, other)
            );
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            const chatbox = session.createChatbox(conversation);
            chatbox.mount(chatboxRef.current);
            setChatbox(chatbox);

            return () => chatbox.destroy();
        });
    }, [currentUser, otherUser, isOpen]);

    return (
        <div className="fixed bottom-0 right-0 w-96 h-[500px] bg-white shadow-lg rounded-t-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <h3 className="font-semibold">Chat với {otherUser?.username}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div ref={chatboxRef} className="h-[calc(100%-3rem)]" />
        </div>
    );
}

export default ChatComponent;
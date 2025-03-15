import React, { useEffect, useRef, useState, useContext } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

function ChatComponent({otherUserId, isOpen, onClose}) {
    const popupRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [popup, setPopup] = useState(null);
    const {user} = useContext(AppContext);

    // Lấy thông tin người dùng
    useEffect(() => {
        setCurrentUser(user);

        axios.get(`/api/getUser?user_id=${otherUserId}`).then(response => {
            setOtherUser(response.data.data);
        }).catch(error => console.error('Error fetching other user:', error));
    }, [user]);

    // Khởi tạo TalkJS Popup
    useEffect(() => {
        if (!currentUser || !otherUser || !isOpen) {
            if (popup) {
                popup.hide();
            }
            return;
        }

        // Kiểm tra dữ liệu trước khi khởi tạo
        if (!currentUser.id || !currentUser.username || !currentUser.email) {
            console.error('Invalid currentUser data:', currentUser);
            return;
        }
        if (!otherUser.id || !otherUser.username || !otherUser.email) {
            console.error('Invalid otherUser data:', otherUser);
            return;
        }

        Talk.ready.then(() => {
            try {
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
                    Talk.oneOnOneId(me, other),
                    { participants: [me, other] }
                );
                conversation.setParticipant(me);
                conversation.setParticipant(other);

                // Tạo popup thay vì chatbox
                const talkPopup = session.createPopup(conversation, {
                    launcher: 'hide', // Ẩn nút launcher mặc định
                    keepOpen: false, // Đóng popup khi nhấn nút close
                    width: 400, // Chiều rộng popup (px)
                    height: 500, // Chiều cao popup (px)
                });

                // Thêm delay để đảm bảo WebSocket sẵn sàng
                setTimeout(() => {
                    console.log('Mounting TalkJS popup');
                    talkPopup.mount(popupRef.current);
                    talkPopup.show();
                    setPopup(talkPopup);
                }, 2000);

                // Xử lý thông báo
                session.unreads.on('change', unreadConversations => {
                    const unreadCount = unreadConversations.length;
                    console.log('Số tin nhắn chưa đọc:', unreadCount);
                    if (unreadCount > 0) {
                        alert(`Bạn có ${unreadCount} tin nhắn chưa đọc!`);
                    }
                });

                // Cleanup khi component unmount
                return () => {
                    talkPopup.destroy();
                };
            } catch (error) {
                console.error('TalkJS initialization error:', error);
            }
        }).catch(error => console.error('TalkJS loading error:', error));
    }, [currentUser, otherUser, isOpen]);

    return (
        <div ref={popupRef} style={{ position: 'fixed', bottom: '10px', right: '10px' }} />
    );
}

export default ChatComponent;
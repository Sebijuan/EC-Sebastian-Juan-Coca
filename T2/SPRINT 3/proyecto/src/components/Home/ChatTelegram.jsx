import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ChatTelegram.css';

const ChatTelegram = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const response = await fetch(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '<YOUR_CHAT_ID>',
                text: message
            })
        });

        if (response.ok) {
            setChat([...chat, { sender: 'You', text: message }]);
            setMessage('');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClickOutside = useCallback((event) => {
        if (event.target.className === 'modal') {
            closeModal();
        }
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen, handleClickOutside]);

    return (
        <div>
            <button className="help-button" onClick={openModal}>Te podemos ayudar?</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <div className="chat-container">
                            <div className="chat-box">
                                {chat.map((msg, index) => (
                                    <div key={index} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                        <span>{msg.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="chat-input">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatTelegram;

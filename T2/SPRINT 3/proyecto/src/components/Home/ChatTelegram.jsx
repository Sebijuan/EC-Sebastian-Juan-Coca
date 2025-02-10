import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ChatTelegram.css';

const ChatTelegram = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const sendMessage = () => {
        if (message.trim() === '') return;

        const newChat = [...chat, { sender: 'You', text: message }];
        setChat(newChat);
        setMessage('');

        setTimeout(() => {
            handleMechanicResponse(message, newChat);
        }, 1000);
    };

    const handleMechanicResponse = (message, newChat) => {
        let response = "No entiendo el mensaje, por favor intente más tarde.";
        if (message.includes('Consulta General')) {
            response = "¿Cuál es el problema que está experimentando?";
        } else if (message.includes('Consulta Reparaciones')) {
            response = "¿Qué tipo de reparación necesita?";
        } else if (message.includes('Consulta de Venta')) {
            response = "¿Qué producto está interesado en comprar?";
        } else if (message.includes('Consulta de Mantenimiento')) {
            response = "¿Qué tipo de mantenimiento necesita?";
        } else if (newChat.length > 1) {
            response = "Pronto se pondrá en contacto un asesor con usted. Gracias por su consulta.";
        }

        setChat([...newChat, { sender: 'Mecánico', text: response }]);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (isChatOpen) {
            setChat([]);
            setIsOptionSelected(false);
        }
    };

    const handleOptionClick = (option) => {
        setMessage(option);
        setIsOptionSelected(true);
        sendMessage();
    };

    return (
        <div>
            <button className="help-button" onClick={toggleChat}>Te podemos ayudar?</button>
            {isChatOpen && (
                <div className="chat-box-container">
                    <div className="chat-header">
                        Chat de Asistencia
                        <span className="close-chat-button" onClick={toggleChat}>&times;</span>
                    </div>
                    <div className="chat-body">
                        {!isOptionSelected ? (
                            <div className="options">
                                <button onClick={() => handleOptionClick('Consulta General')}>Consulta General</button>
                                <button onClick={() => handleOptionClick('Consulta Reparaciones')}>Consulta Reparaciones</button>
                                <button onClick={() => handleOptionClick('Consulta de Venta')}>Consulta de Venta</button>
                                <button onClick={() => handleOptionClick('Consulta de Mantenimiento')}>Consulta de Mantenimiento</button>
                            </div>
                        ) : (
                            <div className="chat-container">
                                <div className="chat-box">
                                    {chat.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                            <span>{msg.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {isOptionSelected && (
                        <div className="chat-footer">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>Enviar</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatTelegram;

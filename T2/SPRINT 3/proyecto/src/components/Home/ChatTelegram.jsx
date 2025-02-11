import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ChatTelegram.css';

const ChatTelegram = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [currentConsultation, setCurrentConsultation] = useState('');

    const predefinedResponses = {
        'Consulta General': [
            { question: '¿Cuál es el horario de atención?', answer: 'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.' },
            { question: '¿Dónde están ubicados?', answer: 'Estamos ubicados en la Calle Falsa 123, Ciudad Ficticia.' },
            { question: '¿Ofrecen servicios a domicilio?', answer: 'Sí, ofrecemos servicios a domicilio dentro de la ciudad.' }
        ],
        'Consulta Reparaciones': [
            { question: '¿Cuánto cuesta una reparación de motor?', answer: 'El costo de la reparación de motor depende del tipo de daño. Por favor, tráiganos su vehículo para una evaluación.' },
            { question: '¿Cuánto tiempo tarda una reparación de frenos?', answer: 'La reparación de frenos generalmente toma entre 2 y 4 horas.' },
            { question: '¿Ofrecen garantía en las reparaciones?', answer: 'Sí, ofrecemos una garantía de 6 meses en todas nuestras reparaciones.' }
        ],
        'Consulta de Venta': [
            { question: '¿Qué modelos de coches tienen disponibles?', answer: 'Tenemos una amplia variedad de modelos disponibles. Por favor, visite nuestra página web para ver el catálogo completo.' },
            { question: '¿Ofrecen financiamiento?', answer: 'Sí, ofrecemos opciones de financiamiento con tasas de interés competitivas.' },
            { question: '¿Puedo hacer una prueba de manejo?', answer: 'Sí, puede programar una prueba de manejo contactándonos a través de nuestro formulario de contacto.' }
        ],
        'Consulta de Mantenimiento': [
            { question: '¿Cada cuánto debo hacer el mantenimiento del coche?', answer: 'Recomendamos hacer el mantenimiento del coche cada 10,000 km o cada 6 meses, lo que ocurra primero.' },
            { question: '¿Qué incluye el mantenimiento básico?', answer: 'El mantenimiento básico incluye cambio de aceite, revisión de frenos, y chequeo general del vehículo.' },
            { question: '¿Cuánto cuesta el mantenimiento completo?', answer: 'El costo del mantenimiento completo varía según el modelo del coche. Por favor, contáctenos para obtener una cotización.' }
        ]
    };

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
        const responses = predefinedResponses[currentConsultation];
        if (responses) {
            const matchedResponse = responses.find(r => message.toLowerCase().includes(r.question.toLowerCase()));
            if (matchedResponse) {
                response = matchedResponse.answer;
            } else {
                response = "Pronto se pondrá en contacto un asesor con usted. Gracias por su consulta.";
            }
        }

        setChat([...newChat, { sender: 'Mecánico', text: response }]);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (isChatOpen) {
            setChat([]);
            setIsOptionSelected(false);
            setCurrentConsultation('');
        }
    };

    const handleOptionClick = (option) => {
        setCurrentConsultation(option);
        setIsOptionSelected(true);
        setChat([...chat, { sender: 'Mecánico', text: `Ha seleccionado ${option}. ¿Cuál es el motivo por el que contacta?` }]);
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
                                            {msg.sender === 'Mecánico' && (
                                                <img src="/assests/icons/bot.jpg" alt="Assistant" className="assistant-image" />
                                            )}
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

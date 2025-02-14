/* global Tawk_API */
import React, { useEffect } from 'react';
import '../styles/ChatTelegram.css';

const ChatTelegram = () => {
    useEffect(() => {
        // Add Tawk.to script
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/67af9ad1f983a4190a32b9e2/1ik2v9h7q';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);

    const handleChatToggle = () => {
        if (typeof Tawk_API !== 'undefined') {
            Tawk_API.toggle();
        } else {
            console.error('Tawk_API is not defined');
        }
    };

    return (
        <div>
            <button className="help-button" onClick={handleChatToggle}>Te podemos ayudar?</button>
        </div>
    );
};

export default ChatTelegram;
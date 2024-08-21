import { useState } from 'react';
import axios from 'axios';

function GeminiApi() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/generate-response', { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={handleSendMessage}>Send</button>
            {response && <p>{response}</p>}
        </div>
    );
}

export default GeminiApi;

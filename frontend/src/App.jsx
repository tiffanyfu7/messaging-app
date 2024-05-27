import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TextField from '@mui/material/TextField';

function App() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [allData, setAllData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:5001/posts");
        console.log("response", response.data);
        setAllData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: username,
            message: message,
        };
        const response = await axios.post("http://localhost:5001/users", body);
        console.log(response)
        fetchData();
        var form = document.getElementById("form");
        form.reset();
        window.location.reload();
    };
    
    const deleteUser = async (id) => {
        const response = await axios.delete(`http://localhost:5001/posts/${id}`);
        fetchData();
        window.location.reload();
    };

    const updateMessage = async (id, newMessage) => {
        const response = await axios.put(`http://localhost:5001/posts/${id}`, {
            message: newMessage,
        });
        fetchData();
        window.location.reload();
    };

    return (
        <>
            <h2>PostIt!</h2>
            <form onSubmit={handleSubmit} id="form">
                <div id="username-text-field">
                <TextField
                    label="Username" variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <TextField
                    id="message-text-field"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br></br>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Messages Board</h2>
                <div className="message-container">
                    { allData.map((user, index) => (
                        <div key={index} className="message">
                            <button
                                style={{backgroundColor: "#f27d66"}}
                                onClick={() => deleteUser(user.id)}>
                                x
                            </button>
                            <h3> {user.username} </h3>
                            <TextField
                                key = {index}
                                id="message-text-field"
                                label="Message"
                                defaultValue= {user.message}
                                variant="standard"
                                multiline
                                rows={4}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <br></br>
                            <button onClick={() => updateMessage(user.id, newMessage)}>Rewrite</button>
                        </div>
                    )) }
                </div>
            </div>
        </>
    );
}

export default App;
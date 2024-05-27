import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
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
        var form = document.getElementById("form");
        form.reset();
        fetchData();
    };

    const likeUser = async (id, currentLikes) => {
        const response = await axios.put(`http://localhost:5001/posts/${id}`, {
            currentLikes: currentLikes,
        });
        fetchData();
    };

    // const editMessage = async (id, newMessage) => {
    //     const response = await axios.put(`http://localhost:5001/posts/${id}`, {
    //         message: newMessage,
    //     });
    //     fetchData();
    // };

    return (
        <>
            <h2> Submit a Message to PostIt!</h2>
            <form onSubmit={handleSubmit} id="form">
                <label>User Name: </label> <br></br>
                <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
                <br></br>
                <label>Message: </label> <br></br>
                <input type="text" onChange={(e) => setMessage(e.target.value)} style={{height: "40px"}}></input>
                <br></br>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Messages:</h2>
                <div className="message-container">
                    {allData.map((user, index) => (
                        <div key={index} className="message">
                            <button>Remove</button>
                            <h3> {user.username} </h3>
                            <p> {user.message} </p>
                            <button>Rewrite</button>
                            <p>Likes: {user.likes}</p>
                            <button onClick={() => likeUser(user.id, user.likes)}>Like</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
import React, { useState } from 'react'
import styles from "./index.module.css";



const Chat = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      
       
        
      

      <main className={styles.main}>
        
        <h3>Chat-AI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="chat" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );


}

export default Chat

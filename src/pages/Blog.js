import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Articles from "../components/Articles";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("Unconnu");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };

  useEffect(() => getData(), []);

  function handleSubmit(e) {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setError(false);
      setAuthor("Unconnu");
      setContent("");
      setTimeout(() => getData(), 500);
    }
  }

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Articles key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;

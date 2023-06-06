//Blogging App using Hooks
import React, { useState, useRef, useEffect } from "react";
import { db } from "../firebaseInit";

import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export default function Blog() {
  //   const [title, setTitle] = useState("");    Merge these two useStates into one
  //   const [content, setContent] = useState("");

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  //For making currsor into title at first start
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No blogs!";
    }
  }, [blogs]);
  //Passing the synthetic event as argument to stop refreshing the page on submit

  useEffect(() => {
    // async function fetchData() {
    //   const snapShot = await getDocs(collection(db, "blogs"));
    //   const blogs = snapShot.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       ...doc.data(),
    //     };
    //   });
    //   console.log(blogs);
    //   setBlogs(blogs);
    // }
    // fetchData();

    const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    titleRef.current.focus();

    //setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    // Add a new document with a generated id.

    const docRef = doc(collection(db, "blogs"));

    await setDoc(docRef, {
      title: formData.title,
      content: formData.content,
      createdOn: new Date(),
    });

    setFormData({ title: "", content: "" });
  }

  async function removeBlog(i) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    const docRef = doc(db, "blogs", i);
    await deleteDoc(docRef);
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              onChange={(e) => {
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                });
              }}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              required
              placeholder="Content of the Blog goes here.."
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <div className="blog-btn">
            <button onClick={() => removeBlog(blog.id)} className="btn remove">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}

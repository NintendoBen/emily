import React, { useEffect, useState, Component, useCallback } from "react";
// get our fontawesome imports
// import "font-awesome/css/font-awesome.min.css";

import "./App.css";
// import Subreddit from "./Subreddit.js";

const App = () => {
  const [subs, setSubs] = useState([]);
  const [query, setQuery] = useState("");

  // When the text input changes, we set the query property to the input's
  // value. In turn, the input's value is set to the query property. React
  // calls this a "Controlled Component".
  const onInputChange = useCallback((event) => {
    setQuery(event.target.value);
  });

  // We wrap this onClick handler for the button control in a useCallback
  // hook. We set the function to update itself whenever the query property
  // changes. When the button is clicked, we fetch the reddit post.
  const onClick = useCallback(
    async (event) => {
      event.preventDefault();

      const response = await fetch(`https://www.reddit.com/r/${query}.json`);
      const json = await response.json();

      // The json object looks kind of like this:
      // data: {        // a data object
      //   children: [  // an array of children
      //     {          // each child is an object that has...
      //       data: {  // another data object with all sorts of fields like...
      //         title: "I am a reddit post title!",
      //       },
      //     },
      //   ];
      // }

      // console.log(data);

      setSubs(json.data.children);
    },
    [query]
  );

  return (
    <div className="App">
      <h1 className="header">
        Reddit <i className="fa fa-reddit"></i>{" "}
      </h1>

      <form>
        <input type="text" value={query} onChange={onInputChange}></input>
        <button type="submit" onClick={onClick}>
          Search
        </button>
      </form>

      <div>{subs && subs.map((item) => <div>{item.data.title}</div>)}</div>

      {/* {subs.map((subs) => (
        <Subreddit
          title={subs.children.name}
          subreddit={subs.children.subreddit}
          post={subs.children.data.selftext}
          url={subs.children.data.url}
        />
      ))} */}
    </div>
  );
};

export default App;

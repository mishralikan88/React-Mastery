// // Infinite scroll app

import React, { useEffect, useState } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);

  // const url = `https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=20`; // Fetches 20 posts (page 1) from the JSONPlaceholder fake API

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );
      const data = await res.json();
      setLoading(false);
      setHasmore(data.length > 0);

      // If the API returns data (data.length > 0), it means there are more records to fetch,
      // so hasMore stays true.
      // On the last page, the API returns an empty array (data.length === 0),
      // so hasMore becomes false, indicating no more data to load.

      setPosts((prev) => [...prev, ...data]); // posts => old posts + new posts
    };
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      console.log("Reached the bottom");
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // clean up !! This code runs when the component unmounts . When we navigate away from this component.
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="App">
        {posts.map((post, index) => (
          <h3>
            {post.id}- {post.title}
          </h3>
        ))}

        <div>{loading && <h3>Loading ...</h3>}</div>

        <div>{!hasmore && <h3>No post to load</h3>}</div>
      </div>
    </>
  );
};

export default App;

// Infinite scrolling means loading more items automatically as the user scrolls near the bottom of the page.

// How it works (3 steps) ?
// User scrolls down → reaches bottom (or close).
// Show a loader/shimmer while fetching next data.
// Append new items below → repeat until no data left.

// Q1. Why you can't mark useEffect's callback as async?

// useEffect(async () => { //  ❌ -> Wrong
//   const data = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=20`
//   );
//   const fetchedData = await data.json();
// }, []);
// useEffect expects its callback to return either nothing or a cleanup function.
// But if you mark it async, it will always return a Promise (because async functions return Promises by default).
// React will then think that Promise is your cleanup function → ❌ wrong behavior.

// Q2.  How to Implement Infinte scrolling ?

// 1. In the first useEffect, we call fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20'), store the result in the posts state, and map over posts to render the list. This shows items 1–20.

// 2. If you change the page parameter from 1 to 2, the API returns items 21–40 because _limit=20. The page value is dynamic and controls which slice of data is fetched.

// 3. Create a page state to track the current page. When the user reaches the bottom, increment page by 1 and fetch again with the updated page value

// 4. To track scroll position and update the page, use another useEffect. When the user reaches the bottom, increment page by 1 and make an  API call for page = 2 . Show a loader while fetching, and hide it when the data arrives.

// 5. There we go infinite scroll is ready

// Q3. Understanding the Logic - scrollTop(st) + innerHeight(iH) >= scrollHeight(sH) or st + iH > sH

// 👉 1. document.documentElement.scrollHeight
// What it is → The total height of the page (all content, even the part you can’t see without scrolling).
// Think of it like → The full length of a long newspaper.

// 👉 2. document.documentElement.scrollTop
// What it is → How far the user has scrolled down from the top (in pixels).
// Think of it like → The distance your eyes are from the top edge of the newspaper.

// 👉 3. window.innerHeight
// What it is → The visible height of the browser window (the part you can see right now without scrolling).
// Think of it like → The window frame through which you’re viewing the newspaper.

// scrollHeight is the total page height.
// scrollTop is how much we've scrolled down.
// innerHeight is the viewport height.

// 1️⃣ scrollTop
// 👉 How far you’ve scrolled down from the top.
// Example: If you scrolled 200px down, scrollTop = 200.

// 2️⃣ innerHeight
// 👉 The visible window height (what you can see right now).
// Example: If your screen shows 600px at a time, innerHeight = 600.

// 3️⃣ Add them: scrollTop + innerHeight
// 👉 This tells you where your view ends.
// Example:
// Scrolled down 200px (scrollTop = 200)
// Viewport shows 600px (innerHeight = 600)
// Bottom of your view = 200 + 600 = 800px
// So right now, you’re looking at content from 200px → 800px.

// 4️⃣ Compare with scrollHeight
// 👉 scrollHeight = total height of the document.
// Example: If the page has 800px total height, then:
// scrollTop + innerHeight = 800
// scrollHeight = 800
// ✅ You’re at the bottom.

// Loading behavior:
//
// 1) Initial render: loading = true → UI shows "Loading...".
// 2) Fetch effect runs (page=1): fetch 20 items, append to posts, set loading = false → show items 1–20.
// 3) Scroll effect runs once on mount: attaches the scroll handler.
// 4) When we reach the bottom (~20th item), the scroll handler sets loading = true (show loader) and setPage(p => p + 1).
// 5) page changes → fetch effect runs again: fetch next 20, append to posts (now 1–40), set loading = false → hide loader.
// 6) Repeat the same cycle at 40, 60, ... items.

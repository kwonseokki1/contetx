import logo from "./logo.svg";
import "./App.css";
import { PostProvider } from "./contexts/PostsContext";
import { Posts } from "./components/Posts/Posts";
function App() {
  return (
    <PostProvider>
      <Posts />
    </PostProvider>
  );
}

export default App;

import { createRoot } from 'react-dom/client'
// import { TinaEditProvider } from 'tinacms'
// import client from '../tina/__generated__/client'
import App from './App.tsx'
import './index.css'

// Temporary: Test without TinaEditProvider to see if fallback mechanism works
createRoot(document.getElementById("root")!).render(<App />);
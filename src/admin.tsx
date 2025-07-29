import { createRoot } from 'react-dom/client';
import { TinaCMS, TinaEditProvider } from 'tinacms';
import App from './App'; // Import your main App component

const AdminApp = () => {
  return (
    <TinaEditProvider
      editMode={true}
      cms={new TinaCMS({ branch: 'main' })}
    >
      <App />
    </TinaEditProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AdminApp />);

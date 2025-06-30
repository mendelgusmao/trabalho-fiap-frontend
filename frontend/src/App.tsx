import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListingProvider } from "./context/ListingContext";
import { Auctions } from "./pages/Auctions/";
import { ListingPage } from "./pages/ListingPage/";

import "./styles/global.css";

export function App() {
  return (
    <ListingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auctions />} />
          <Route path="/listing/" element={<ListingPage />} />
        </Routes>
      </BrowserRouter>
    </ListingProvider>
  );
}

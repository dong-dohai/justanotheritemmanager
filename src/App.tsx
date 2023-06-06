import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OAuth from "./pages/OAuth";
import { InventoryOptimizer } from "./pages/InventoryOptimizer";
import { Suspense } from "react";

export default function App() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/oauth" element={<OAuth />} />
            <Route
              path="/inventory-optimizer"
              element={<InventoryOptimizer />}
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

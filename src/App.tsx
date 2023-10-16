import { useState } from "react";
import CategoryShips from "./components/CategoryShips";
import { Categories } from "./data/placeholders";
import Header from "./layouts/Header";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div>Sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryShips
              categories={Categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { Items } from "./components/Items";

const ITEMS_STORAGE_KEY = "todo";

const loadItems = () => {
  const itemDataRaw = localStorage.getItem(ITEMS_STORAGE_KEY);
  const itemData = itemDataRaw ? JSON.parse(itemDataRaw) : [];
  return itemData;
};

const saveItems = (items) => {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
};

function App() {
  // Initialize items with whatever is in local storage
  const [items, setItems] = useState(loadItems());

  // Save to local storage every time the items are changed
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const createItem = (content) => {
    const newItem = {
      id: `item-${items.length}`,
      content, // Tip: shortcut for writing "content: content"
    };
    setItems(() => [...items, newItem]);
  };

  const deleteItem = (itemIdx) => {
    setItems(() => {
      const newItems = [...items];
      newItems.splice(itemIdx, 1);
      return newItems;
    });
  };

  return (
    <div className="App">
      <AddItemForm createItem={createItem} />
      <Items items={items} deleteItem={deleteItem} />
    </div>
  );
}

export default App;

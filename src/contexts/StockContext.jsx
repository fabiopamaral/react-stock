import { createContext, useState } from "react";

export const StockContext = createContext({});

// nosso item: = [{ name, description, price, category, quantity, createdAt, updatedAt } , {...}, ...]
export function StockContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("stock-items");
    if (!storedItems) return [];
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
      item.createdAt = new Date(item.createdAt);
      item.updatedAt = new Date(item.createdAt);
    });
    return items;
  });

  const addItem = (item) => {
    setItems((currentState) => {
      const updatedItems = [item, ...currentState];
      localStorage.setItem("stock-items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getItem = (id) => {
    return items.find((item) => item.id === +id);
  };

  const updateItem = (id, newAttributes) => {
    setItems((currentState) => {
      const itemIndex = currentState.findIndex((item) => item.id === +id);
      const updatedItems = [...currentState];
      Object.assign(updatedItems[itemIndex], newAttributes, {
        updatedAt: new Date(),
      });
      localStorage.setItem("stock-items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const deleteItem = (id) => {
    setItems((currentState) => {
      const updatedItems = currentState.filter((item) => item.id !== id);
      localStorage.setItem("stock-items", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items: items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
  };
  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}

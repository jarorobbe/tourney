"use client";
import { useState } from "react";
import Bracket from "./bracket";

export default function BracketUI() {
  const [items, setItems] = useState<{ name: string }[]>([]);

  function addPlayer() {
    setItems([...items, { name: Math.random().toFixed(2).toString() }]);
  }
  function removePlayer() {
    const item = items.pop();
    if (item) {
      setItems(items.filter((_) => _.name !== item.name));
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Test</h1>
      <h2>{items.length}</h2>
      <br />
      <button onClick={addPlayer}>Add player</button>
      <br />
      <button onClick={removePlayer}>Remove player</button>
      <Bracket items={items} />
    </div>
  );
}

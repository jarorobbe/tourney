"use client";
import Battle from "./battle";

export default function Bracket(props: { items: { name: string }[] }) {
  const groupPlayers = () => {
    const battles = [];
    for (let i = 0; i < props.items.length; i += 2) {
      battles.push(
        <Battle
          player1={{ ...props.items[i], playerNumber: i + 1 }}
          player2={{ ...props.items[i + 1], playerNumber: i + 2 }}
        />
      );
    }
    return battles;
  };
  const getFutureBattles = () => {
    let battlesToCreate = props.items.length / 2;
    const battles = [];
    while (battlesToCreate > 1) {
      for (let i = 0; i < battlesToCreate / 2; i++) {
        battles.push(<Battle />);
      }
      battlesToCreate = battlesToCreate / 2;
    }
    return battles;
  };
  return (
    // <div
    //   className={`grid grid-rows-${
    //     props.items.length / 2
    //   } grid-flow-col row-span-1 grid-cols-${props.items.length / 2} gap-4`}
    // >
    <div className="grid grid-rows-8 grid-flow-col gap-4">
      {[...groupPlayers(), ...getFutureBattles()]}
    </div>
  );
}

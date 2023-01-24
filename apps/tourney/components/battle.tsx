export default function Battle(props: {
  player1?: { name: string; playerNumber: number };
  player2?: { name: string; playerNumber: number };
}) {
  return (
    <div className="border-4 border-cyan-300">
      <div>
        <span>P{props.player1 ? props.player1.playerNumber : "X"} | </span>
        <strong>{props.player1 ? props.player1.name : "TBD"}</strong>
      </div>
      <div>
        <span>P{props.player2 ? props.player2.playerNumber : "X"} | </span>
        <strong>{props.player2 ? props.player2.name : "TBD"}</strong>
      </div>
    </div>
  );
}

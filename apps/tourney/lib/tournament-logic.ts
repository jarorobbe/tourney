export class Player {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

enum BattleStatus {
    WAITING = 'waiting',
    READY = 'ready',
    ONGOING = 'ongoing',
    FINISHED = 'finished'
}

export class Battle {
    id: number;
    players: Player[];
    maxPlayerCount: number;
    status: BattleStatus;
    winner?: Player = undefined;
    nextBattle?: Battle;

    constructor(id: number, maxPlayerCount: number, players: Player[], nextBattle?: Battle) {
        if (players.length > maxPlayerCount) throw new Error('Max player count exceeded');
        this.id = id;
        this.maxPlayerCount = maxPlayerCount;
        this.status = players.length === maxPlayerCount ? BattleStatus.READY : BattleStatus.WAITING;
        this.players = players;
        this.nextBattle = nextBattle;
    }

    addPlayer(player: Player) {
        if (this.status === BattleStatus.READY) throw new Error('Max player count reached');
        if (this.players.map(_ => _.name).includes(player.name)) throw new Error('Player already part of this Battle')
        if (this.players.push(player) === this.maxPlayerCount) this.status = BattleStatus.READY;
    }
}


abstract class Tournament {
    abstract battles: {[round: number]: Battle[]};
    abstract battleSize: number;

    protected abstract initializeBattles(): void;
    protected abstract calculateRounds(): number;

    getBattles() {
        return this.battles;
    }
}

export class SingleElimination extends Tournament{
    battles: {[round: number]: Battle[]} = {};
    battleSize: number;
    players: Player[];

    constructor(players: Player[]) {
        super();
        this.battleSize = 2;
        this.players = players;
        this.initializeBattles();
    }

    protected initializeBattles() {
        const rounds = this.calculateRounds();
        const currentRound = rounds;
        const lastBattle = new Battle(1, this.battleSize, []);
        this.battles[currentRound] = [lastBattle];
        this.createBattlesRecursive(rounds-1, lastBattle);
    }

    private createBattlesRecursive(currentRound: number, initiator: Battle) {
        // TODO fix the IDs using some kind of faculty
        if (!(currentRound in this.battles)) {
            console.log('creating array for round', currentRound)
            this.battles[currentRound] = [];
        }
        const battle1 = new Battle(initiator.id + 1, this.battleSize, [], initiator);
        this.battles[currentRound].push(battle1)
        const battle2 = new Battle(initiator.id + 1 + (currentRound * 2), this.battleSize, [], initiator);
        this.battles[currentRound].push(battle2);
        if (currentRound === 1) return;
        this.createBattlesRecursive(currentRound - 1, battle1);
        this.createBattlesRecursive(currentRound - 1, battle2);
        return;
    }

    protected calculateRounds() {
        let exp = 0;
        // Find highest power of 2 that fits in the player count
        // THis is the number of battles needed for the first round
        while (Math.pow(2, exp) < this.players.length) {
            exp++;
        }
        const firstRoundBattleCount = exp === 0 ? 1 : Math.pow(2, exp-1);
        return Math.log2(firstRoundBattleCount) + 1;
    }
}

const main = () => {
    const players: Player[] = [];
    for (let i = 0; i < 13; i++) {
        players.push(new Player('player'+(i+1)));
    }
    const tourney = new SingleElimination(players);
    console.log(JSON.stringify(tourney.battles));
}

main();
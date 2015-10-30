package main

import (
	"fmt"
	"math/rand"
	"time"
)

var snakesAndLader map[int]int

const MaxBoardPosition = 30

type Player struct {
	Name     string
	Position int
}

func main() {
	snakesAndLader = make(map[int]int)
	snakesAndLader[27] = 1
	snakesAndLader[11] = 26
	snakesAndLader[3] = 22
	snakesAndLader[21] = 9
	snakesAndLader[17] = 4
	snakesAndLader[5] = 8
	snakesAndLader[19] = 7
	snakesAndLader[20] = 29

	A := Player{Name: "Vimlesh"}
	B := Player{Name: "Sunil"}
	C := Player{Name: "Rahul"}
	D := Player{Name: "Computer"}
		

	PlayGame(A, B, C, D)
}

func ThrowDice() int {
	rand.Seed(time.Now().UnixNano())
	diceVal := rand.Intn(7)
	if diceVal == 0 {
		diceVal++
	}
	return diceVal
}

func PlayGame(players ...Player) {

loop:
	for {
		for index, player := range players {

			diceValue := ThrowDice()
			nextPosition := player.Position + diceValue

			switch {
			case nextPosition > MaxBoardPosition:
				fmt.Printf(" %s can't proceed... waiting for %d \n", player.Name, MaxBoardPosition-player.Position)
			case nextPosition < MaxBoardPosition:
				snl_pos, found := snakesAndLader[nextPosition]
				if found {
					fmt.Printf(" Gotcha for player %s @ %d Moving from %d -> %d \n", player.Name, nextPosition, nextPosition, snl_pos)
					nextPosition = snl_pos
					player.Position = nextPosition
				} else {
					player.Position = nextPosition
				}

				players[index] = player
				fmt.Printf(" %s is at new position %d and rolled %d  \n", player.Name, player.Position, diceValue)

			case nextPosition == MaxBoardPosition:
				player.Position = nextPosition
				players[index] = player
				fmt.Printf(" %s is at new position %d and rolled is %d and wins <---- \n", player.Name, player.Position, diceValue)

				break loop
			}

			time.Sleep(10 * time.Millisecond)
		}
		fmt.Println("")
	}
}

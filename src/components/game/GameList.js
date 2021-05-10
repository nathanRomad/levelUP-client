import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    // console.log('games: ', games);


    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <header className="games__header">
                <h1>Level Up Games</h1>
            </header>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.numberOfPlayers} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.difficulty}</div>
                    </section>
                })
            }
        </article>
    )
}

{/* <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        history.push({ pathname: "/games/new" })
    }}
>Register New Game</button> */}
import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, editGame, getGameById } = useContext(GameContext)
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        difficulty: 1,
        numberOfPlayers: 1,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
            .then(() => {
                if (gameId) {
                    getGameById(gameId)
                        .then(res => {
                            setCurrentGame({
                                difficulty: res.difficulty,
                                numberOfPlayers: res.numberOfPlayers,
                                title: res.title,
                                maker: res.maker,
                                gameTypeId: res.game_type.id
                            })
                        })
                }
            })
    }, [])

    const handleInputChange = e => {
        // debugger
        const newGameState = { ...currentGame }
        newGameState[e.target.name] = e.target.value
        if (e.target.name.includes("Id")) newGameState[e.target.name] = parseInt(e.target.value)
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                        min="1"
                        max="150"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="difficulty">Skill Level: </label>
                    <input type="number" name="difficulty" required autoFocus className="form-control"
                        value={currentGame.difficulty}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select type="number" name="gameTypeId" required autoFocus className="form-control"
                        onChange={handleInputChange} value={currentGame.gameTypeId}>
                        <option key="0" value="0">Please choose a game type... </option>
                        {
                            gameTypes.map(gameType => {
                                // console.log('gameType: ', gameType);
                                return <option key={gameType.id} value={gameType.id}>{gameType.type} </option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    if (gameId) {
                        const game = {
                            id: parseInt(gameId),
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            difficulty: parseInt(currentGame.difficulty),
                            gameTypeId: parseInt(currentGame?.gameTypeId)
                        }
                        editGame(game)
                            .then(() => history.push("/"))

                        createGame(game)
                            .then(() => history.push("/games"))
                    } else {
                        const game = {
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            difficulty: parseInt(currentGame.difficulty),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        }

                        // Send POST request to your API
                        createGame(game)
                            .then(() => history.push("/games"))
                    }
                }
                }
                className="btn btn-primary">{gameId ? "Edit" : "Create"}</button>
        </form>
    )
}
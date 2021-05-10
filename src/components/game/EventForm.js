import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "./GameProvider.js"

export const EventForm = () => {
    const history = useHistory()
    const { games, getGames } = useContext(GameContext)
    const { createEvent, events, getEvents, joinEvent } = useContext(EventContext)

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        description: "",
        datetime: "",
        gameId: "",
        host: 0
        // attendees: ""

    })

    const changeEventState = (e) => {
        // Handle controlled input change
        const newEventState = { ...currentEvent }
        newEventState[e.target.name] = e.target.value
        if (e.target.name.includes("Id")) newEventState[e.target.name] = parseInt(e.target.value)
        setCurrentEvent(newEventState)
    }

    return (
        <>
            <form className="gameForm">
                <h2 className="gameForm__title">Schedule New Event</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="gameId">Game: </label>
                        <select name="gameId" className="form-control"
                            value={currentEvent.gameId}
                            onChange={changeEventState}>
                            <option key="0" value="0">Select a game...</option>
                            {
                                games.map(game => (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                ))
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Event Name: </label>
                        <input type="text" name="name" required autoFocus className="form-control"
                            value={currentEvent.name}
                            onChange={changeEventState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Event Description: </label>
                        <input type="text" name="description" required autoFocus className="form-control"
                            value={currentEvent.description}
                            onChange={changeEventState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Date: </label>
                        <input type="datetime" name="datetime" id="datetime" required className="form-control"
                            value={currentEvent.datetime}
                            onChange={changeEventState}
                        />
                    </div>
                </fieldset>

                {/* Create the rest of the input fields */}

                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()

                        // Create the event
                        const event = {
                            name: currentEvent.name,
                            description: currentEvent.description,
                            datetime: currentEvent.datetime,
                            gameId: currentEvent.gameId,
                            host: localStorage.getItem('lu_token'),
                            // attendees: currentEvent.attendees

                        }

                        // Send POST request to your API
                        // Once event is created, redirect user to event list
                        createEvent(event)
                            .then(() => history.push("/events"))
                    }}
                    className="btn btn-primary">Create Event</button>
            </form>
        </>
    )
}
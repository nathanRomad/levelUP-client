import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventList } from "./game/EventList.js"
import { EventProvider } from "./game/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./game/EventForm.js"
import { Profile } from "./auth/ProfileList.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/">
                        <GameList />
                    </Route>
                    <Route exact path="/games">
                        <GameList />
                    </Route>
                    <Route exact path="/games/new">
                        <GameForm />
                    </Route>
                    <Route exact path="/games/:gameId(\d+)/edit">
                        <GameForm />
                    </Route>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                </EventProvider>
            </GameProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>

        </main>
    </>
}

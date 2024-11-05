# Click Me
Description

## TODO
### Client Side
- [ ] User will be able to (UWBAT) see the "creature" on the screen when they visit the site.
- [ ] UWBAT enter their name when they join the server.
- [x] UWBAT click on the creature to give it health.
- [x] UBWAT see the health of the creature
- [ ] UBWAT see directions that explain how the experience will go
- [x] UBWAT see how many users are connected.
- [ ] UBWAT see the history of clicks
- [ ] UWBAT see how much time is left until the next click is needed.

### Server Side
- [x] Serve the front end page
- [x] Watch for socket connections
- [x] When the first user has joined creates the creature
- [x] When a new user has joined, emit to update the count
- [ ] When a new user has joined, reset the time between clicks
- [x] When a user exits, emit to update the count
- [x] When a click is heard, add health, emit update
- [ ] When a click is heard, reset timer, emit update
- [x] When the timer is up, remove health, emit update
- [x] When a user connects, emit the health of the creature
- [x] When there is no health left, kill creature, stop listening for clicks, emit update

creature
-health

### Stretch Goals
- [ ] Add RTC so that users can talk to collaborate
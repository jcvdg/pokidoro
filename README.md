
# Pokidoro

A productivity tool with a gamified pomodoro timer to keep users engaged.  Users can collect Pokemons or berries to evolve a Pokemon after each session is complete.

- [Pokidoro](#weather-weer)
  - [Motivation](#motivation)
  - [Optimizations](#optimizations)
  - [Lessons Learned](#lessons-learned)
  - [Built with](#built-with)

![Screenshot of landing page](img/Screen%20Shot%202022-07-07%20at%2010.57.14%20PM.png)

***
## Motivation

I wanted to create something that I could use everyday while building on what I'm learning, expanding on my knowledge of the frontend with React and building the backend with more complex logic, utilizing data from a database.

A pomodoro timer was perfect especially since there's an iPhone pomodoro timer that I loved and hated at the same time.  Pokidoro adopts the gamified elements that I enjoy and rewards users with a surprise after each focus session: user receives a pokemon, user's pokemon is evolved, or user receives a berry necessary to evolve a pokemon. These elements adds complexity to the backend, with room to expand to more use cases. 

All Pokemon related data and image assets are from the PokeAPI.
## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility



- Add push notification and audio to alert user session completion
- Refactor
- Optimize for mobile
- Add MVP for tasks and self-guided coaching tool
- Add mood check-in
- Add weekly and monthly summary page
- Refine the gaming mechanics of the pomodoro timer
- Refine the user experience for new users
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

I faced many obstacles in this project.  The most notable obstacle was designing a non-relational database

Non-relational database (MongoDB) was chosen given most of the data stored will be user's individual records (pomodoro sessions, Pokemons collected, tasks, self-guided coaching responses).  It allows for the flexibility of storing different types of user data in a single view, and easy retrieval as the data that'll be accessed together later on can be stored together into a single document.  Coming from prior understanding of SQL, this was a concept that I embraced but also questioned.  Especially the part where it's permissible and even recommended to duplicate certain data if it improves the data retrieval efficiency.

I needed to account for not only how I'd add new documents, but also consider which data set would be added, updated, and retrieved together and when.

Below were the main considerations that drove the design:
- `User` collection 
  -	All the unique user data is stored here.
  -	All the pokemons that user collected is here given it’s a bounded array.
  -	Image url of Pokemons ‘caught’ in the past 7-days (on the home page) are stored here for easy retrieval when the user logs in
- `MonthlySessions` collection
  -	All of the user’s pomodoro session data are stored here given it would’ve been unbounded which would not be ideal as an embedded document.
  -	There are plans for a summary reporting page - displaying data in a monthly view of all the past sessions from the day the user starts using the product. The monthly reporting would be in it's own document, where each document represents the user's data for that month.

## Built with

- React
- Node
- Express
- MongoDB
- Mongoose
- Redux
- Redux Thunk

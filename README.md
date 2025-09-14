# Pokémon Analytics Dashboard - Starter Kit

## Quick Start

Use `node v20.19.x`

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## What's Included

- **React 18** with Vite for fast development
- **Axios** for API calls to PokéAPI
- **Chart.js + react-chartjs-2** for data visualization
- **Basic responsive CSS** to get you started
- **Error handling and loading states** scaffolded
- **Sample API integration** with first 20 Pokémon

## Project Structure

```
src/
├── main.jsx          # React entry point
├── App.jsx           # Main application component
└── (your components) # Add your components here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Next Steps

1. Start by reading the [ASSIGNMENT.md](ASSIGNMENT.MD)
2. Clone this repo locally and change the remote origin url to your own repo via `git remote set-url origin http://github.com/YOU/YOUR_REPO` (replacing `/YOU/YOU_REPO` with a public repo in your GH)
3. Create a new branch for your updates
4. Complete the assignment in no more than 4 hours (try not to go overboard!)
5. When you're done, make sure your repo is public so we can review it. Either tag @theonlymikeever in a PR review or send us the link!

## Helpful Resources

- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [React-ChartJS-2 Examples](https://react-chartjs-2.js.org/examples)

If you have any questions during the take home, please reach out to mike@knotch.com

Good luck!


**Changes Made:**
This pr adds an interactive analytics dashboard for the pokemon api and it does multiple features:
   - 151 Pokemon loaded from API
   - 3 interactive charts (Type Distribution + Stats Radar + Height and Weight)
   -  Filtering by type and search 
   -  Click to compare 3 pokemon(max 3)
   -  Mobile responsive
   -  Loading states with progress
   -  Error handling
   -  Dark/Light mode toggle with persistent preference
   
**ASSUMPTIONS**
  - fetched only the first 151 pokemon in gen 1 since i didnt do any filtering by gen
  - assumed pokeapi always the same data in same array
  - That in memory caching was sufficient in this case in pokemonAPi
  - limited fetch in batch calls of 20 in case there was rate limiting
  - assumed to use front facing sprite to be used and was always avaliable 

**Technology choices and why**

Framework Choice: React 18 with Vite
- I went with React 18 + Vite for a fast, modern dev setup. Vite’s HMR makes iterating super quick and hotload is so nice, and React’s component model keeps the codebase easy to maintain and scale.

Charting Library: Chart.js + react-chartjs-2
- I used 4 chart types ( Bar, Pie, Radar, and Scatter) as separate components. They share a small set of utility functions for consistency, which makes adding new chart types later pretty painless.

State Management: React Hooks
- I used useState and useEffect for state management for pokemon data and it wasnt necessary to push it to a context or a global state like zustand but i did use a context for theme management to control the theme

- theme preference saved to localstorage so it persists
Axios
- I used for data fetching because of ease of use

API Rate Limiting & Caching
- I batched Pokémon fetches (20 at a time) to avoid hitting the PokeAPI rate limits. I also used an in memory cache to prevent duplicate calls. A progress bar shows users what’s loading so it feels responsive.

Code Structure & Organization
- The app is split into clear layers: API services, components, and charts. Chart utilities live in their own file, so they’re reusable. This makes it easier to maintain or swap pieces later.
Data Transformation
- I normalized all API responses so they have a consistent shape before rendering. This made things like counting types or aggregating stats much simpler and kept the UI code focused on presentation.

Trade-offs
I kept things intentionally light due to time constraints:
	•	No automatic retry if an API call fails, you gotta refresh manually.
	•	Limited the scope to 151 Pokémon for simplicity, though the setup can scale.
	•	Didn’t add virtualization since the list is small, but would add it for bigger datasets.

** What I'd improve **

- Improve on styling and accessiblity if i had more time
- work on adding end to end testing as feature is expanded upon so for logic and 
- make components more modular and redundant
- virtualize the long list of pokemon if all 1000 pokemon are shown so use a intersection observer to show cards that are in viewport
- add debounce or throttle or search and filters
- improve loading states and use optimistic updates 
- persist more user prefs view mode and filters to localstorage
- abstract the api more better with better error handling and retires
- undo or cancel pokemon selections 
- use typescript for better type safety
- use more custom hooks for pokemon data and filtering pokemon 
- also i think it be cool to add a visualization to show pokemon evolution or most poopular pokemon based of web results but i guess thats not in pokeapi ahha
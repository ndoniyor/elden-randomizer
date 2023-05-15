# Elden Ring Build Randomizer Web App
Dynamic web app built with PERN stack that generates randomized character builds for players of the game Elden Ring. Builds can be generated with pure randomness, or biased with various build flags.

## Usage
There are multiple flags that can be used to bias the generation. Here is a rundown of all of them
- Pure randomize: disables all flags and randomizes every aspect of the build; no bias
- Armor sets only: only generates armor from full sets
- Choose for me (outer): This randomly decides melee/magic build for you, and within those classes randomly selects the subclass (powerstance, dual wield, etc. for melee only and sorceries/incantations for magic)
- Melee only: only generate melee-based builds (won't generate spells)
  - Choose for me: randomly selects subclass
  - Powerstance: select 2 weapons of the same type
  - Dual wield: select 2 weapons of different types
  - Single wield: select 1 weapon
  - Shield: select 1 shield and 1 weapon
- Magic: will generate 5 random spells
  - Choose for me: randomly selects magic type
  - Sorcery: random spells are all sorceries
  - Incantations: random spells are all incantations

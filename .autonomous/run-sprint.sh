#!/bin/bash
cd /Users/jacksonc/i/pua-what-game
PROMPT=$(cat .autonomous/sprint-prompt.md)
exec claude --dangerously-skip-permissions "$PROMPT"

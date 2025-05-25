#!/bin/bash

PLAYWRIGHT=false
  CYPRESS=false
  FOLDERS=()
  
  git fetch origin 5160a111efbcb7d49ad4366cfc75d813557602e2 --depth=1
  changed=$(git diff --name-only 5160a111efbcb7d49ad4366cfc75d813557602e2 44cc9217c262a5417d21c66404e04b53e30348e3)
  echo "ch: $changed"
  if echo "$changed" | grep -q '^playwright/'; then
    FOLDERS+=("playwright")
    PLAYWRIGHT=true
  fi
  echo "f: ${FOLDERS[1]} p: $PLAYWRIGHT"
  
  if echo "$changed" | grep -q '^cypress/'; then
    FOLDERS+=("cypress")
    CYPRESS=true
  fi
  
  MATRIX_JSON=$(printf '%s\n' "${FOLDERS[@]}" | jq -R . | jq -s .)
  echo "matrix=$MATRIX_JSON\nplaywright=$PLAYWRIGHT\ncypress=$CYPRESS"
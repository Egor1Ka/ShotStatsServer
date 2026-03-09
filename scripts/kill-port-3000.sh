#!/bin/sh
# Освободить порт 3000 (например, старый процесс бэкенда или Next.js)
PID=$(lsof -ti :3000)
if [ -n "$PID" ]; then
  echo "Завершаю процесс на порту 3000 (PID: $PID)"
  kill "$PID"
else
  echo "Порт 3000 свободен"
fi

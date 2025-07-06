#!/bin/bash
cd /home/kavia/workspace/code-generation/dopaclicker-107872-818113b6/idle_clicking_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


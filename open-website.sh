#!/bin/bash

# First check if the site is running
if ! curl -s http://localhost:4001 > /dev/null; then
    echo "Website is not running. Starting it now..."
    ./start-site.sh
    echo "Waiting for the site to start..."
    sleep 15
fi

# Open in default browser
echo "Opening website in your default browser..."
open http://localhost:4001

echo "If the website doesn't load correctly, try the following:"
echo "1. Try a different browser (Safari, Firefox, Chrome, etc.)"
echo "2. Try viewing the website in an incognito/private window"
echo "3. Clear your browser cache"
echo "4. Check if any browser extensions might be blocking local connections" 
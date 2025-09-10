#!/bin/bash

echo " Starting Epic Timeline API in Development Mode..."
echo "  DevTools enabled - automatic restart on code changes"  
echo " Server will be available at: http://localhost:8080/api/"
echo ""

# Navigate to project directory
cd "$(dirname "$0")/.."

# Run Spring Boot in development mode
mvn spring-boot:run

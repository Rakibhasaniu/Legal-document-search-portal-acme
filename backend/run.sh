#!/bin/bash


echo "=========================================="
echo "Legal Document Search Portal - Backend"
echo "=========================================="
echo ""

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "Virtual environment created."
    echo ""
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "=========================================="
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo "=========================================="
echo ""

python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

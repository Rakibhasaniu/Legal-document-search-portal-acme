# Legal Document Search Portal - Backend API

A FastAPI-based backend service that provides mock legal document search functionality for a legal assistant tool.

## Features

- **RESTful API** with FastAPI framework
- **Mock Document Database** with 3 hardcoded legal documents:
  - Employment Agreement Template
  - Non-Disclosure Agreement (NDA)
  - SaaS Terms of Service
- **Intelligent Search** with relevance scoring and excerpt extraction
- **Interactive API Documentation** with Swagger UI
- **Health Check Endpoint** for monitoring
- **Error Handling** with proper HTTP status codes

## Technology Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **Uvicorn** - ASGI server for running the application
- **Pydantic** - Data validation using Python type hints
- **Python 3.12** - Programming language

## Project Structure

```
backend/
├── main.py              # FastAPI application and endpoints
├── mock_data.py         # Mock legal documents and search logic
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── .dockerignore       # Docker ignore patterns
├── run.sh              # Convenience script to run the server
└── README.md           # This file
```

## Prerequisites

- Python 3.12 or higher
- pip (Python package manager)
- Virtual environment support (`python3-venv`)

## Installation & Setup

### Option 1: Using the Run Script (Recommended)

1. **Install python3-venv** (if not already installed):
```bash
sudo apt install python3.12-venv
```

2. **Make the run script executable and run it**:
```bash
chmod +x run.sh
./run.sh
```

The script will automatically:
- Create a virtual environment
- Install all dependencies
- Start the FastAPI server

### Option 2: Manual Setup

1. **Install python3-venv** (if not already installed):
```bash
sudo apt install python3.12-venv
```

2. **Create a virtual environment**:
```bash
python3 -m venv venv
```

3. **Activate the virtual environment**:
```bash
source venv/bin/activate
```

4. **Install dependencies**:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

5. **Run the application**:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Option 3: Using Docker

1. **Build the Docker image**:
```bash
docker build -t legal-doc-backend .
```

2. **Run the container**:
```bash
docker run -p 8000:8000 legal-doc-backend
```

## API Endpoints

### Root Endpoint
- **GET** `/`
- Returns API information and available endpoints

### Health Check
- **GET** `/health`
- Returns server health status and number of documents loaded

### List Documents
- **GET** `/documents`
- Returns a list of all available legal documents

### Search Documents (Main Endpoint)
- **POST** `/generate`
- Searches legal documents based on query

**Request Body:**
```json
{
  "query": "employment termination",
  "max_results": 10
}
```

**Response:**
```json
{
  "success": true,
  "query": "employment termination",
  "summary": "Found 1 relevant legal document(s)...",
  "documents_found": 1,
  "results": [
    {
      "document_id": 1,
      "title": "Employment Agreement Template",
      "category": "Employment Law",
      "relevance_score": 25,
      "matched_terms": ["employment", "termination"],
      "excerpts": ["...excerpt text..."],
      "effective_date": "2024-01-15",
      "jurisdiction": "California"
    }
  ],
  "processing_time": 0.523,
  "timestamp": "2024-11-05T10:30:00.000Z"
}
```

## Mock Data

The backend includes 3 hardcoded legal documents:

1. **Employment Agreement Template** (Employment Law)
   - Covers position, compensation, benefits, termination, confidentiality
   - Jurisdiction: California

2. **Non-Disclosure Agreement** (Contract Law)
   - Mutual NDA covering confidential information
   - Jurisdiction: New York

3. **SaaS Terms of Service** (Technology Law)
   - Cloud service terms covering accounts, payments, data privacy
   - Jurisdiction: Delaware


### Adding New Documents

To add more legal documents, edit [mock_data.py](mock_data.py) and add to the `LEGAL_DOCUMENTS` list:

```python
{
    "id": 4,
    "title": "Your Document Title",
    "category": "Document Category",
    "content": "Full document text...",
    "effective_date": "2024-01-01",
    "jurisdiction": "State/Country"
}
```

# Legal Document Search Portal

A full-stack web application for searching and summarizing legal documents. Built with React frontend and FastAPI backend.
 

-**GITHUB REPOSITORY**==============https://github.com/Rakibhasaniu/Legal-document-search-portal-acme

 Features

- **Intelligent Search**: Debounced search with 3-character minimum for optimal performance
- **Real-time Results**: Auto-search as you type with 800ms debounce delay
- **Clickable Suggestions**: Quick-start suggestions for common legal topics
- **Relevance Scoring**: Advanced algorithm ranks results by relevance
- **Excerpt Extraction**: Contextual snippets showing matched terms
- **Professional UI/UX**: Clean, responsive design optimized for legal professionals
- **Error Handling**: Comprehensive error messages and loading states
- **State Management**: Redux Toolkit for predictable state updates

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design

### Backend
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Python 3.8+** - Programming language

## 📁 Project Structure

```
Acme/
├── backend/
│   ├── main.py              # FastAPI application and endpoints
│   ├── mock_data.py         # Legal documents and search logic
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Docker configuration
│   ├── .dockerignore        # Docker ignore rules
│   └── run.sh              # Quick start script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx        # Search input with debounce
│   │   │   ├── ResultsDisplay.jsx   # Search results display
│   │   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   │   └── ErrorMessage.jsx     # Error display
│   │   ├── store/
│   │   │   ├── store.js             # Redux store configuration
│   │   │   └── searchSlice.js       # Search state management
│   │   ├── api/
│   │   │   └── client.js            # Axios API client
│   │   ├── hooks/
│   │   │   └── useDebounce.js       # Custom debounce hook
│   │   ├── App.jsx                  # Main application component
│   │   ├── App.css                  # Application styles
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Entry point
│   ├── package.json         # npm dependencies
│   ├── vite.config.js       # Vite configuration
│   └── index.html           # HTML template
└── README.md               # This file
```

## 📦 Prerequisites

### Required
- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **Python** 3.8 or higher
- **pip** package manager

### Optional
- **Docker** (for containerized deployment)
- **Git** (for version control)

##  Installation & Setup

### Option 1: Quick Start (Recommended)

#### Backend Setup
```bash
cd backend

chmod +x run.sh

./run.sh
```

The backend will start at `http://localhost:8000`

#### Frontend Setup
```bash
cd frontend

npm install

npm run dev
```

The frontend will start at `http://localhost:5173`

### Manual Setup

#### Backend Manual Setup
```bash
cd backend

python3 -m venv venv

source venv/bin/activate
# On Windows:
# venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Manual Setup
```bash
cd frontend

npm install

npm run dev
```


##  API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy"
}
```

#### 2. Get All Documents
```http
GET /documents
```
**Response:**
```json
{
  "documents": [
    {
      "id": "doc-001",
      "title": "Employment Agreement Template",
      "category": "Employment Law",
      "content": "..."
    }
  ]
}
```

#### 3. Search Documents (Main Endpoint)
```http
POST /generate
```
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
  "summary": "Found 2 relevant legal documents...",
  "results": [
    {
      "id": "doc-001",
      "title": "Employment Agreement Template",
      "category": "Employment Law",
      "relevance_score": 25,
      "matched_terms": ["employment", "termination"],
      "excerpts": [
        "...employment termination procedures..."
      ]
    }
  ],
  "documents_found": 2,
  "processing_time": 0.523
}
```

### Interactive API Docs
Visit http://localhost:8000/docs for Swagger UI documentation.

#  Usage Guide

### Basic Search
1. Type at least 3 characters in the search box
2. Results appear automatically after 800ms
3. Search is case-insensitive and matches partial words

### Quick Search with Suggestions
1. Click any suggestion word below the search box
2. Results appear immediately
3. Suggestions include: `employment`, `confidential`, `subscription`, `termination`

### Advanced Features
- **Clear Search**: Click the ✕ button to clear and start over
- **Manual Search**: Press Enter or click Search button
- **View Excerpts**: Each result shows contextual snippets with matched terms highlighted
- **Relevance Sorting**: Results are ranked by relevance score

### Search Tips
- Use specific terms for better results (e.g., "termination" vs "term")
- Try single words first, then combine terms
- Check excerpts to see context of matches


##  Project Details

### Mock Legal Documents

The application includes 3 hardcoded legal documents:

1. **Employment Agreement Template** (Employment Law)
   - Topics: hiring, termination, compensation, benefits

2. **Non-Disclosure Agreement (NDA)** (Contract Law)
   - Topics: confidentiality, trade secrets, authorized personnel

3. **SaaS Subscription Agreement** (Technology Law)
   - Topics: subscription, payment, intellectual property, termination

### Search Algorithm

The backend uses a relevance scoring algorithm:
- **Content matches**: +1 per occurrence
- **Title matches**: +10 (higher priority)
- **Category matches**: +5 (medium priority)

Results are sorted by relevance score in descending order.

### State Management

Redux Toolkit manages:
- Search query
- Search results
- Loading states
- Error states
- Search history (hasSearched flag)

### Performance Optimizations

- **Debounced Search**: 800ms delay prevents excessive API calls
- **Minimum Characters**: 3-character minimum for auto-search
- **Result Limiting**: max_results parameter (default: 10)
- **Excerpt Extraction**: 200-character context windows
- **Caching**: Browser caching for static assets


### Adding New Documents

Edit `backend/mock_data.py`:
```python
{
    "id": "doc-004",
    "title": "Your Document Title",
    "category": "Document Category",
    "content": "Full document text..."
}


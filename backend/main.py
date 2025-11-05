"""
Legal Document Search Portal - Backend API
FastAPI application with mock legal document search functionality
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import time
from datetime import datetime

from mock_data import search_documents, generate_summary, LEGAL_DOCUMENTS

app = FastAPI(
    title="Legal Document Search API",
    description="API for searching and summarizing legal documents",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    """Request model for document search query"""
    query: str = Field(..., min_length=1, max_length=500, description="Search query for legal documents")
    max_results: Optional[int] = Field(default=10, ge=1, le=50, description="Maximum number of results to return")

    class Config:
        json_schema_extra = {
            "example": {
                "query": "employment termination",
                "max_results": 10
            }
        }


class DocumentExcerpt(BaseModel):
    """Model for document excerpt"""
    document_id: int
    title: str
    category: str
    relevance_score: int
    matched_terms: List[str]
    excerpts: List[str]
    effective_date: str
    jurisdiction: str


class GenerateResponse(BaseModel):
    """Response model for document search"""
    success: bool
    query: str
    summary: str
    documents_found: int
    results: List[DocumentExcerpt]
    processing_time: float
    timestamp: str


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: str
    documents_loaded: int


# API Endpoints

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Legal Document Search API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "generate": "/generate (POST)",
            "documents": "/documents"
        }
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify API is running
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        documents_loaded=len(LEGAL_DOCUMENTS)
    )


@app.get("/documents", tags=["Documents"])
async def list_documents():
    """
    List all available legal documents
    """
    document_list = [
        {
            "id": doc["id"],
            "title": doc["title"],
            "category": doc["category"],
            "effective_date": doc["effective_date"],
            "jurisdiction": doc["jurisdiction"]
        }
        for doc in LEGAL_DOCUMENTS
    ]

    return {
        "total_documents": len(document_list),
        "documents": document_list
    }


@app.post("/generate", response_model=GenerateResponse, tags=["Search"])
async def generate_response(request: QueryRequest):
    """
    Main endpoint for searching legal documents

    This endpoint:
    1. Accepts a search query
    2. Searches through mock legal documents
    3. Returns relevant excerpts and summaries
    4. Simulates realistic processing time

    Args:
        request: QueryRequest containing the search query

    Returns:
        GenerateResponse with search results and summary
    """
    start_time = time.time()

    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    query = request.query.strip()

    time.sleep(0.5) 

    try:
        search_results = search_documents(query)

        limited_results = search_results[:request.max_results]

        summary = generate_summary(query, limited_results)

        processing_time = time.time() - start_time

        response = GenerateResponse(
            success=True,
            query=query,
            summary=summary,
            documents_found=len(limited_results),
            results=[
                DocumentExcerpt(**result) for result in limited_results
            ],
            processing_time=round(processing_time, 3),
            timestamp=datetime.utcnow().isoformat()
        )

        return response

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )


@app.get("/generate", tags=["Search"])
async def generate_get_not_allowed():
    """
    GET method not allowed for /generate endpoint
    """
    raise HTTPException(
        status_code=405,
        detail="Method not allowed. Please use POST request with a JSON body containing 'query' field."
    )



@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Handle 404 errors"""
    return {
        "success": False,
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist. Please check the API documentation."
    }


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    """Handle 500 errors"""
    return {
        "success": False,
        "error": "Internal server error",
        "message": "An unexpected error occurred. Please try again later."
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

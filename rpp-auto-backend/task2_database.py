"""Database Configuration for RPP Auto

Production-ready database setup with connection pooling for Supabase.
Uses Pooler connection (Port 6543) for better performance and reliability.

Environment Variables Required:
- DATABASE_URL: PostgreSQL connection string with pooler port
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import logging

logger = logging.getLogger(__name__)

# Get database URL from environment
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:password@db.gfhthbmbgoxqqbzxnauv.supabase.co:6543/postgres"
)

# Production database engine with connection pooling
try:
    engine = create_engine(
        DATABASE_URL,
        poolclass=QueuePool,
        pool_size=int(os.getenv("DB_POOL_SIZE", "10")),
        max_overflow=int(os.getenv("DB_MAX_OVERFLOW", "20")),
        pool_pre_ping=True,  # Verify connections before use
        pool_recycle=3600,   # Recycle connections every hour
        echo=os.getenv("ENVIRONMENT") != "production",  # SQL logging in dev only
        connect_args={
            "connect_timeout": 10,
            "options": "-c timezone=utc"
        }
    )
    logger.info("Database engine created successfully")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    raise

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for declarative models
Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    """Database session dependency for FastAPI.
    
    Usage:
        @app.get("/items")
        def read_items(db: Session = Depends(get_db)):
            return db.query(Item).all()
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

# Database health check
def check_database_health():
    """Check if database connection is healthy.
    
    Returns:
        bool: True if database is accessible, False otherwise
    """
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False

# Initialize database tables
def init_db():
    """Create all database tables.
    
    Should be called on application startup or via migrations.
    """
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise

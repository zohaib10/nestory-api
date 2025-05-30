# Nestory API

Nestory is a family tree management system built with FastAPI and PostgreSQL on the backend, and React (with TypeScript) on the frontend. It provides a comprehensive solution for managing family trees, relationships, and users.

## Project Structure

```js
/*
nestory_api/
│
├── app/
│ ├── __init__.py
│ ├── main.py # Entry point for FastAPI app
│ ├── models/ # SQLAlchemy or Pydantic models
│ │ ├── __init__.py
│ │ └── person.py
│ ├── schemas/ # Pydantic request/response schemas
│ │ ├── __init__.py
│ │ └── person.py
│ ├── crud/ # Database interaction logic
│ │ ├── __init__.py
│ │ └── person.py
│ ├── api/ # API route handlers
│ │ ├── __init__.py
│ │ └── person.py
│ ├── db/ # Database config and session
│ │ ├── __init__.py
│ │ └── database.py
│ └── core/ # Settings, config, and utilities
│ ├── __init__.py
│ └── config.py
│
├── .env # Environment variables
├── requirements.txt # Project dependencies
└── README.md
*/
```

## Overview

Nestory allows users to create and manage family trees. It enables the following core features:

- **User management**: Each user can create and own multiple family trees.
- **Family trees**: Each family tree can hold multiple people and their relationships.
- **Person records**: Each person has a detailed record, including their name, birth date, gender, and relationships to other people.
- **Relationships**: Define relationships between people, such as parent-child, sibling, and spouse.

### Example Data Structure

```json
{
  "users": [
    {
      "id": "user_001",
      "email": "zohaib@example.com",
      "name": "Son Goku",
      "created_at": "2025-05-04T12:00:00Z"
    }
  ],

  "family_trees": [
    {
      "id": "tree_001",
      "title": "Goku Family Tree",
      "owner_id": "user_001",
      "created_at": "2025-05-04T12:10:00Z"
    }
  ],

  "people": [
    {
      "id": "person_001",
      "tree_id": "tree_001",
      "full_name": "Son Goku",
      "birth_date": "1995-03-20",
      "gender": "male"
    },
    {
      "id": "person_002",
      "tree_id": "tree_001",
      "full_name": "Chi Chi",
      "birth_date": "1996-07-15",
      "gender": "female"
    },
    {
      "id": "person_003",
      "tree_id": "tree_001",
      "full_name": "Kirillin",
      "birth_date": "1997-08-05",
      "gender": "male"
    },
    {
      "id": "person_004",
      "tree_id": "tree_001",
      "full_name": "Master Roshi",
      "birth_date": "1965-04-10",
      "gender": "male"
    }
  ],

  "relationships": [
    {
      "id": "rel_001",
      "tree_id": "tree_001",
      "person_one_id": "person_004",
      "person_two_id": "person_001",
      "relationship_type": "parent"
    },
    {
      "id": "rel_002",
      "tree_id": "tree_001",
      "person_one_id": "person_004",
      "person_two_id": "person_003",
      "relationship_type": "parent"
    },
    {
      "id": "rel_003",
      "tree_id": "tree_001",
      "person_one_id": "person_001",
      "person_two_id": "person_003",
      "relationship_type": "sibling"
    },
    {
      "id": "rel_004",
      "tree_id": "tree_001",
      "person_one_id": "person_001",
      "person_two_id": "person_002",
      "relationship_type": "spouse"
    }
  ],

  "user_person_links": [
    {
      "id": "upl_001",
      "user_id": "user_001",
      "person_id": "person_001",
      "tree_id": "tree_001",
      "relation_type": "self"
    }
  ]
}
```

erDiagram

    auth_users ||--o{ workouts : "creates"
    workouts ||--|{ sets : "contains"
    exercises ||--o{ sets : "used_in"
    
    auth_users {
        UUID id PK
        string email
    }
    exercises {
        UUID id PK
        string name
        string muscle_group
    }
    workouts {
        UUID id PK
        UUID user_id FK
        string name
        string notes
        boolean is_completed
        boolean is_template
        timestamp created_at
    }
    sets {
        UUID id PK
        UUID workout_id FK
        UUID exercise_id FK
        int set_number
        numeric weight
        int reps
        numeric rpe
        string notes
    }

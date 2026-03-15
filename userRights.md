flowchart TD

    Guest([Unauthenticated Guest])
    AuthUser([Authenticated User])

    Guest -->|Allowed| Auth(Sign Up / Log In)
    Guest -.-x|Blocked| DB[(Supabase DB)]

    AuthUser -->|Reads all| Ex(Exercises Dictionary)
    AuthUser -->|Manages own| W(Workouts)
    AuthUser -->|Manages own| S(Sets)

    Ex --- RLS{RLS Policies}
    W --- RLS
    S --- RLS
    RLS --- DB

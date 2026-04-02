import * as Yup from 'yup';

export const userExerciseSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must  be at least 2 characters')
        .required('Exercise name is required')
        .max(50, 'Name cannot be longer than 50 characters!'),

    description: Yup.string()
        .min(2, 'Description is too short')
        .max(500, 'Description cannot be longer than 500 characters!'),
    muscle_group: Yup.string()
        .min(2, 'Muscle group must be at least 2 characters')
        .required('Muscle group is required')
})

import * as Yup from 'yup';

export const userExerciseSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Too Short!')
        .required('Required')
        .max(50, 'Too Long!'),

    description: Yup.string()
        .min(2, 'Too Short!')
        .max(500, 'Too Long!'),
    muscle_group: Yup.string()
        .min(2, 'Too Short!')
        .required('Required')
})

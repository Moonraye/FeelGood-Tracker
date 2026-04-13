import { useFormik } from "formik";
import { useExerciseMutation } from "./useUserExerciseMutation";
import { userExerciseSchema } from "../schema/userExerciseSchema";

interface UseCreateExerciseFormProps {
    onSuccess?: () => void;
}

export const useCreateExerciseForm = ({ onSuccess }: UseCreateExerciseFormProps) => {
    const exerciseMutation = useExerciseMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            muscle_group: ''
        },
        validationSchema: userExerciseSchema,
        onSubmit: (values, { resetForm }) => {
            exerciseMutation.mutate(values, {
                onSuccess: () => {
                    resetForm();
                    if(onSuccess) onSuccess();
                },
                onError: (error) => {
                    console.log(error);
                }
            })
        }
    })
    return {
        formik,
        exerciseMutation
    }
}
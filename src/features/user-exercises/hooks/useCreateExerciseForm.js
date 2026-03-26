import { useFormik } from "formik";
import { useExerciseMutation } from "./useUserExerciseMutation";
import { userExerciseSchema } from "../schema/userExerciseSchema";
import { useNavigate } from "react-router-dom";

export const useCreateExerciseForm = (onSuccessCallback) => {
    const exerciseMutation = useExerciseMutation();
    const navigate = useNavigate();

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
                    if(onSuccessCallback) onSuccessCallback();
                    navigate(-1);
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
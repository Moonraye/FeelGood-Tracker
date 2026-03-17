import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "./useAuthMutation";
import { registerSchema } from "../schema/authSchema";

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            registerMutation.mutate(values, {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error) => {
                    console.log(error);
                }
            })
        }    
    })
    return { formik, registerMutation };
}
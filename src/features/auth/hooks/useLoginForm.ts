import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "./useAuthMutation";
import { loginSchema, LoginFormValues } from "../schema/authSchema";

export const useLoginForm = () => {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            loginMutation.mutate(values, {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error) => {
                    console.log(error);
                }
            })
        }    
    })
    return { formik, loginMutation };
}
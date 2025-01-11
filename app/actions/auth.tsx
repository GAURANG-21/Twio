import { validateForm } from "../lib/definitions";

export async function signup(formData: FormData){
    const validateFields = validateForm.safeParse({
        name: formData.get("name"),
        password: formData.get('password'),
        email: formData.get('email'),
    });

    if(!validateFields.success) return {errors: validateFields.error};

    console.log('Validation successful');    
}
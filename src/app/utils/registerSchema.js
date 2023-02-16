import * as Yup from 'yup';
import { PASSWORD_VALID } from '../constants/regex'

export default Yup.object({
    email: Yup  
        .string()
        .required('Le champ email est requis')
        .email('Veuillez saisir une adresse email valide'),
    lastname: Yup   
        .string()
        .required('Merci de renseigner votre nom'),
    firstname: Yup  
        .string()
        .required('Merci de renseigner votre prénom'),
    username: Yup   
        .string()
        .required("Veuillez choisir un nom d'utilisateur-trice"),
    password: Yup   
        .string()
        .required('Le champ mot de passe est requis')
        .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
        .matches(PASSWORD_VALID, 
            "Le mot de passe doit contenir au moins une minucule, une majuscule, un chiffre et un caractère spécial"),
    passwordConfirmation: Yup   
        .string()
        .required('Merci de confirmer votre mot de passe')
        .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')   
});
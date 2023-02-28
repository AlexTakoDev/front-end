import React, { useState} from "react";
import { XIcon } from "@heroicons/react/solid";
import { Field, Formik } from 'formik';
import ButtonBis from '../base/ButtonBis'
import apiGateway from '../../api/backend/apiGateway';
import { URL_BACK_NEW_EXPERIENCE} from '../../constants/urls/urlBackEnd';
import * as Yup from 'Yup';

export default function ModalNewExperience(){
    const [showModal, setShowModal] = useState(false);

    const formShema = Yup.object().shape({
        name : Yup.string().min(3).max(30).required('required'),
        date_start : Yup.string().required('required').matches(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)/gm),
        date_end : Yup.string().matches(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)/gm),
        location : Yup.string().min(3).required('required'),
        description : Yup.string().min(3).required('required')
    })  

    return (
        <div>
            <ButtonBis 
                title="Ajouter une expérience" 
                onClick={() => setShowModal(true)}
            />
        {showModal ? (
                <Formik
                initialValues={{
                    name :  "titre",
                    date_start :  "",
                    date_end : "",
                    place :  "lieux",
                    description :  "description"
                }}
                onSubmit={async (values, actions) => {
                    const valueJson = {};
                    valueJson.experience = values;
                    await apiGateway.post(URL_BACK_NEW_EXPERIENCE,values).then((res) => {
                        console.log(res);
                        setShowModal(false);
                    }).catch((err) => {
                        if(err){
                            alert("erreur server")
                        }
                        console.log(err);
                        setShowModal(false);
                    });
                  }}
                  //validationSchema={formShema}
                >
                    {props => (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-2x1">
                                        {/*content*/}
                                        <div className="border-4 border-solid border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <form onSubmit={props.handleSubmit}>
                                                <div className="flex justify-end p-1 border-solid rounded-t">
                                                    <button onClick={() => setShowModal(false)} type="button">
                                                        <XIcon className='h-4 w-4 m-1' />
                                                    </button>
                                                </div>
                                                <div className="relative px-8 flex-col justify-around text-center mb-3">
                                                    <p className="text-3x1">Ajouter une expérience</p>
                                                    <Field
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                        id="name" 
                                                        name="name" 
                                                        type="text"
                                                    />
                                                    <div className="flex justify-between">
                                                        <Field 
                                                            id="date_start" 
                                                            name="date_start" 
                                                            type="date" 
                                                            className="border-2 border-gradient-v rounded-lg my-2 "
                                                        />
                                                        <Field 
                                                            id="date_end" 
                                                            name="date_end" 
                                                            type="date" 
                                                            className="border-2 border-gradient-v rounded-lg my-2 "
                                                        />
                                                    </div>
                                                    <Field 
                                                        id="place"  
                                                        name="place" 
                                                        type="text"  
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                    />
                                                    <Field 
                                                        as="textarea" 
                                                        id="description" 
                                                        name="description"  
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full h-20 resize-none"
                                                    />
                                                    <ButtonBis 
                                                        title="Ajouter une exepérience" 
                                                        type="submit"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        )}
                </Formik>
            ) : null }
        </div>
    )
}
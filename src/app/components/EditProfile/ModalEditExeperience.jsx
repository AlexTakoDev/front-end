import React, { useState} from "react";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { Field, Formik } from 'formik';
import ButtonBis from '../base/ButtonBis';
import apiGateway from '../../api/backend/apiGateway';
import { URL_BACK_UPDATE_EXPERIENCE} from '../../constants/urls/urlBackEnd';
import validationSchema from '../../utils/experienceSchema';

export default function ModalEditExperience(props){
    const [showModal, setShowModal] = useState(false);

    const isoDateToInputFormat = (isoDate) => {
        const dateSplit = isoDate.split('/');
        return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                <PencilIcon className='h-4 w-4 m-1' />
            </button>
        {showModal ? (
                <Formik
                initialValues={{
                    name : props.name ? props.name : "",
                    date_start : isoDateToInputFormat(props.date_start),
                    date_end : props.date_end ? isoDateToInputFormat(props.date_end) : "",
                    place : props.place ? props.place : "",
                    description : props.description ? props.description : ""
                }}
                onSubmit={async (values, actions) => {
                    const valueJson = {};
                    valueJson.experience = values;
                    valueJson.experience.uuid = props.uuid;
                    await apiGateway.post(URL_BACK_UPDATE_EXPERIENCE,values).then((res) => {
                        props.handleUpdate(res.data.result);
                        setShowModal(false);
                    }).catch((err) => {
                        if(err){
                            alert("erreur server")
                        }
                        console.log(err);
                        setShowModal(false);
                    });
                  }}
                  validationSchema={validationSchema}
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
                                                <div className="relative px-8 flex-col justify-around text-center mb-3 ">
                                                    <p className="text-3x1">Modifier une experience</p>
                                                    <Field
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                        id="name" 
                                                        name="name" 
                                                        type="text"
                                                        placeholder='Titre'
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
                                                        placeholder='Lieux'
                                                    />
                                                    <Field 
                                                        as="textarea" 
                                                        id="description" 
                                                        name="description"  
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full h-20 resize-none"
                                                        placeholder='Description'
                                                    />
                                                    <ButtonBis 
                                                        title="Modifier" 
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
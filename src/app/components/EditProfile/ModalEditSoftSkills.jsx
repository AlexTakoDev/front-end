import React, { useState } from "react";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { Field, Formik } from 'formik';
import ButtonBis from '../base/ButtonBis'
import apiGateway from '../../api/backend/apiGateway';
import {updateSoftSkill} from '../../api/backend/profile';
import validationSchema from '../../utils//soft_skillSchema';

export default function ModalEditSoftSkills(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                <PencilIcon className='h-4 w-4 m-1' />
            </button>
            {showModal ? (
                <Formik
                    initialValues={{
                        name: props.name ? props.name : "",
                        description: props.description ? props.description : ""
                    }}
                    onSubmit={async (values, actions) => {
                        const valueJson = {};
                        valueJson.soft_skill = values;
                        valueJson.soft_skill.uuid = props.uuid;
                        console.log(valueJson)
                        await updateSoftSkill(valueJson).then((res) => {
                            props.handleUpdate(res.data.result);
                            setShowModal(false);
                        }).catch((err) => {
                            if (err) {
                                alert("erreur server")
                            }
                            console.log(err);
                            setShowModal(false);
                        });
                        actions.setSubmitting(false)
                    }}
                    validationSchema={validationSchema}
                >
                    {props => (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative my-6 mx-auto max-w-2x1 w-2/6 min-w-fit">
                                    {/*content*/}
                                    <div className="border-4 border-solid border-black rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="flex justify-end p-1 border-solid rounded-t">
                                                <button onClick={() => setShowModal(false)} type="button">
                                                    <XIcon className='h-4 w-4 m-1' />
                                                </button>
                                            </div>
                                            <div className="relative px-8 flex-col justify-around text-center mb-3 ">
                                                <p className="text-3x1">Modifier un Soft_skill</p>
                                                <div className="flex flex-col">
                                                    <Field
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder='Titre'
                                                    />
                                                    {props.errors.name && props.touched.name ? (
                                                        <div>{props.errors.name}</div>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col">
                                                    <Field
                                                        as="textarea"
                                                        id="description"
                                                        name="description"
                                                        className="border-2 border-gradient-v rounded-lg my-2 w-full h-20 resize-none"
                                                        placeholder='Description'
                                                    />
                                                    {props.errors.description && props.touched.description ? (
                                                        <div>{props.errors.description}</div>
                                                    ) : null}
                                                </div>
                                                <ButtonBis
                                                    title="Ajouter un soft_skill"
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
            ) : null}
        </div>
    )
}
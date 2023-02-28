import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux-store/userProfileSlice";
import Button from "../Base/Button";
import { Link } from "react-router-dom";
import { URL_EDITPROFILE } from "../../constants/urls/urlFrontEnd";
import { UserCircleIcon } from "@heroicons/react/solid";

const ProfileUser = () => {
  const [users, setUsers] = useState({
    firstname: "",
    lastname: "",
    email: "",
    date_birth: "",
    username: "",
    job: "",
    description: ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8010/users/uuid");
        setUsers(response.data);
        dispatch(setUser(response.data)); // sauvegarde l'utilisateur dans le store Redux
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        firstname: "Firstnamane",
        lastname: "Lastname",
        date_birth: "28/02/2023",
        email: "tree-up@gmail.com",
        description: "Courte description",
        username: "Tree_up590",
        job: "Developpeur Back"

      }}
    >
      <div>
        <div className="flex p-5">
          <div className="flex flex-col w-1/4">
            <UserCircleIcon />
            <p className="text-center">{users.username}</p>
            <p className="text-center mt-1">{users.job}</p>
            <Link to={URL_EDITPROFILE}>
              <Button className="mt-3" title="Editer mon profil" />
            </Link>
          </div>
          <div className="border-2 border-red-500 flex flex-col ml-5 rounded-md pb-5 w-11/12">
            <p className="text-center">Description</p>
            <p className="pt-5">{users.description}</p>
          </div>
        </div>
        <h3 className=" mt-5 mx-5">Paramètres utilisateurs</h3>

        <Form >
          <div className="justify-between flex mt-5 mx-5">

            <Field
              type="text"
              name="firstname"
              placeholder={users.firstname} // affiche le prénom de l'utilisateur
              className="input w-1/3"
            />
            <Field
              type="text"
              name="lastname"
              placeholder={users.lastname} // affiche le nom de l'utilisateur
              className="input w-1/3"
            />
          </div>
          <div className="flex mx-5 ">
            <Field
              type="date"
              name="date_birth"
              placeholder={users.date_birth} // affiche la date de naissance
              className="input mt-5 w-11/12"
            />
          </div>
          <div>
            <h3 className=" mt-5 mx-5">Paramètre du profil</h3>
          </div>
          <div className="flex mx-5">
            <Field
              type="text"
              name="email"
              placeholder={users.email} // affiche l'email de l'utilisateur
              className="input flex mt-5 w-full "
            />
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default ProfileUser;
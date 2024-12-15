import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setContactData(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": authorizationToken,
      },
    });
    if(response.ok){getContactsData()}
    const data = await response.json();
        console.log(data);
  }


  useEffect(() => {
    getContactsData();
  }, []);

  return <>
    <section className="admin-contacts-section">
      <h1>Admin Contact Data</h1>
      <div className="container admin-users">
        {
          contactData.map((curContactData, index) => {
            return (
              <div key={index}>
                <p>{curContactData.username}</p>
                <p>{curContactData.email}</p>
                <p>{curContactData.message}</p>
                <button onClick={() => deleteContactById(curContactData._id)}>Delete</button>
              </div>
            );
          })
        }
      </div>
    </section>

  </>
};

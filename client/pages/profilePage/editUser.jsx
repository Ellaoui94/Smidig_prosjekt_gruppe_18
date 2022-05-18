import React, { useContext, useEffect, useState } from "react";

/* Needs handleSubmit and handleInput to fully work. */
/* THIS CODE _DOES NOT WORK_ */

/*export function editUser() {
  const [user, setUser] = useState("");
  useEffect(() => {
    //Waiting on database
    try {
      //ye this doesnt work...
      const user = updateUserProfile();
      setUser(user.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <div>Edit user</div>;
}*/

/* This is taken from Johannes' repo, postJSON. Only thing I edited is "PUT", but doesnt know
 * if that will work. Probably not. */
/*async function updateJSON(url, object) {
  //doublecheck that this one makes updates!
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

async function updateUserProfile(user) {
  //doublecheck if url-endpoint-user_id and "user" is the same thing.
  return await updateJSON(`/api/profile/edit/${user_id}`, user);
}*/

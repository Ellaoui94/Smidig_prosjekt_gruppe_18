import axios from "axios";
import { useEffect, useState } from "react";

export function AddNewFriendPage() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const users = ["Martine", "Grianker"];
  useEffect(async () => {
    const url = `${window.location.origin}/api/users/getAllUsers`;
    const { data: res } = await axios.get(url);
    res.map((r) => {
      users.push(r.firstName);
      setFirstName(r.firstName);
      setLastName(r.lastName);
    });
  }, []);

  console.log(users);
  return (
    <div>
      <h1>Add new Friend</h1>
      {users.map((tester) => (
        <div>{tester}</div>
      ))}
    </div>
  );
}

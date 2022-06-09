import axios from "axios";
import { useEffect, useState } from "react";
import img from "../mainPage/dummyPics/img.png";
import img1 from "../mainPage/dummyPics/img_1.png";
import img2 from "../mainPage/dummyPics/img_2.png";
import img3 from "../mainPage/dummyPics/img_3.png";
import img4 from "../mainPage/dummyPics/img_4.png";
import img5 from "../mainPage/dummyPics/img_5.png";
import img6 from "../mainPage/dummyPics/img_6.png";
import { Button } from "@mui/material";
import "./addNewFriednPage.css";
import SearchIcon from "@mui/icons-material/Search";

const myFriends = [
  {
    name: "Noah",
    photo: img
  },
  {
    name: "Mia",
    photo: img1
  },
  {
    name: "Karl",
    photo: img2
  },
  {
    name: "Herman",
    photo: img3
  },
  {
    name: "Casper",
    photo: img4
  },
  {
    name: "Emma",
    photo: img5
  },
  {
    name: "Anna",
    photo: img6
  }
];

export function AddNewFriendPage({ id }) {
  const [filterData, setFilterData] = useState([]);
  const [input, setInput] = useState("");

  const [friendName, setFriendName] = useState();
  const [friendPhoto, setFriendPhoto] = useState();

  const [error, setError] = useState("");


  const friendObj = {name: friendName, photo: friendPhoto}

/*search functions*/
  const newFilter = myFriends.filter((value) => {
    return value.name.toLowerCase().includes(input.toLowerCase());
  });

  function handleSearch(e) {
    e.preventDefault();
    setFilterData(newFilter);
  }

/* add friend */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert(`${friendName} lagt til!`)
      const url = `${window.location.origin}/api/users/postFriend/${id}/${encodeURIComponent(JSON.stringify(friendObj))}`;
      location.reload()
      const { data: res } = await axios.post(url, friendObj);
      console.log(res.message);

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Legg til venner</h1>
      <div className={"add-friend-search-container"}>
        <form className={"add-friend-form"} onSubmit={handleSearch}>
          <input type="search" placeholder="Søk på navn" className="search-field"
                 onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </form>
      </div>

      {error && <div>{error}</div>}

      <h3>Forslag basert på emnene dine</h3>
      <div className={"add-friends-box"}>
        {filterData.length === 0 ?
          myFriends.map((friend, key) => (
            <form onSubmit={handleSubmit} key={key} className={"add-friends-wrapper"}>
              <img id={"myFriendsIMG"} width={"80px"} height={"80px"} src={friend.photo} />
              <h6 id={"myFriendsName"} style={{ marginLeft: "10px" }}>{friend.name}</h6>
              <Button
                type={"submit"}
                onClick={() => {
                  setFriendName(friend.name);
                  setFriendPhoto(friend.photo)
                }}
                style={{
                  background: "#1381A4",
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "50px",
                  height: "40px",
                  margin: "20px 5px 0px 80px"
                }}
              >Legg til</Button>
            </form>
          )) :
          filterData.map((friend, key) => (
            <form onSubmit={handleSubmit} key={key} className={"add-friends-wrapper"}>
              <img width={"80px"} height={"80px"} src={friend.photo} />
              <h6 style={{ marginLeft: "10px" }}>{friend.name}</h6>
              <Button
                type={"submit"}
                onClick={() => {
                  setFriendName(friend.name);
                  setFriendPhoto(friend.photo)
                }}
                style={{
                  background: "#1381A4",
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: "50px",
                  height: "40px",
                  margin: "20px 5px 0px 80px"
                }}
              >Legg til</Button>
            </form>
          ))
        }
      </div>

    </div>
  );
}

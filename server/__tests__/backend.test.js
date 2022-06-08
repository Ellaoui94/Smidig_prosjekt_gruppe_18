import axios from "axios";

describe("API connection", () => {
  it("should connect to localhost", async () => {
    const response = await axios.get("http://localhost:3000/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status).toEqual(200);
  });
  it.only("should get planned sessions", async () => {
    const response = await axios.get(
      "http://localhost:3000/api/session/planned-session",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status).toEqual(200);
  });
  it.only("should log in", async () => {
    const response = await axios
      .post(
        "http://localhost:3000/api/auth/",
        {
          email: "tryingtotest@test.no",
          password: "HorsePony69!Banana",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
    console.log(response);
  });
});

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "jackbauer";
const yourPassword = "ILOVEWEBDEV123";
const yourAPIKey = "fdaca689-7ce5-4c68-8950-206e8d31fb3f";
const yourBearerToken = "6f220235-9f34-464f-9fcc-1879c21959c6";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`)
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) })
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`${API_URL}/all?page=2`, 
  {}, 
  {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  });
  const result = response.data;
  console.log(result);
  res.render("index.ejs", { content: JSON.stringify(result) })
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter?score=5&apiKey=${yourAPIKey}`)
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) })
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

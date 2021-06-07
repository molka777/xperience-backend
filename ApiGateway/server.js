const express = require("express");
const { default: axios } = require("axios");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const userServiceProxy = "http://localhost:5001/user";
const experienceServiceProxy = "http://localhost:5002/experience";
const reservationServiceProxy = "http://localhost:5003/reservation";
const reclamationServiceProxy = "http://localhost:5004/reclamation";

app.post("/register", (req, res) => {
  try {
    axios.post(userServiceProxy + "/register", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.post("/login", (req, res) => {
  try {
    axios.post(userServiceProxy + "/login", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.put("/profile/:id", (req, res) => {
  try {
    axios
      .put(userServiceProxy + "/profile/" + req.params.id, req.body)
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/users", (req, res) => {
  axios.get(userServiceProxy + "/users").then((response) => {
    res.send(response.data);
  });
});
app.get("/user/:id", (req, res) => {
  try {
    axios.get(userServiceProxy + "/user/" + req.params.id).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.delete("/delete/:id", (req, res) => {
  try {
    axios
      .delete(userServiceProxy + "/delete/" + req.params.id)
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/preferences", (req, res) => {
  try {
    axios.get(userServiceProxy + "/preferences").then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
//---------------------------------------EXPERIENCE------------------------------------------------------

app.get("/experience", (req, res) => {
  try {
    axios.get(experienceServiceProxy + "/experience").then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.post("/experience", (req, res) => {
  try {
    axios.post(experienceServiceProxy + "/experience", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.put("/experience/:id", (req, res) => {
  try {
    axios
      .put(experienceServiceProxy + "/experience/" + req.params.id, req.body)
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/experience/:id", (req, res) => {
  try {
    axios.get(experienceServiceProxy + "/experience/"+ req.params.id).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.delete("/experience/:id", (req, res) => {
  try {
    axios
      .delete(experienceServiceProxy + "/experience/" + req.params.id)
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.post("/session", (req, res) => {
  try {
    axios.post(experienceServiceProxy + "/session", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
//---------------------------------------RESERVATION------------------------------------------------------
app.post("/reservation", (req, res) => {
  try {
    axios.post(reservationServiceProxy + "/reservation", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.put("/reservation/:id", (req, res) => {
  try {
    axios
      .put(reservationServiceProxy + "/reservation/" + req.params.id, req.body)
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/reservation/:id", (req, res) => {
  try {
    axios.get(reservationServiceProxy + "/reservation/"+ req.params.id).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/reservations", (req, res) => {
  try {
    axios.get(reservationServiceProxy + "/reservations").then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
//---------------------------------------RECLAMATION------------------------------------------------------
app.post("/reclamation", (req, res) => {
  try {
    axios.post(reclamationServiceProxy + "/reclamation", req.body).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/reclamation/:id", (req, res) => {
  try {
    axios.get(reclamationServiceProxy + "/reclamation/"+ req.params.id).then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
app.get("/reclamations", (req, res) => {
  try {
    axios.get(reclamationServiceProxy + "/reclamations").then((response) => {
      res.send(response.data);
    });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});
const PORT = process.env.PORT || 5005;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);

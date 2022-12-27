const express = require("express");
const app = express();
const { Octokit } = require("octokit");
// const cors = require("cors");

// app.use(cors());

app.use(express.json());

app.get("/", async function (req, res) {
  let token = req.headers.authorization || req.headers.Authorization;
  token = token.split(" ")[1];
  console.log(token);
  const octokit = new Octokit({
    auth: token,
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log(login);

  // to get all repo of the user logged in

  let result = await octokit.request("GET /user/repos", {});
  res.send(result.data);

//   to get  all the repo of particular organization

  let { org } = req.body;
  let result2 = await octokit.request(`GET /orgs/${org}/repos`, {});
  return res.send(result2)


});

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});

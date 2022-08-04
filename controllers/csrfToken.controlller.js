// Create a new csrf token for the user in databse and send it to the client to hide it in a form

exports.getNewCsrfToken = (req, res) => {
  if (!req.csrfToken) {
    return res
      .status(400)
      .json(
        {
          message:"Le Sychronizer pattern n'a pas été correctement initialisé"
        }
      )
  }

  res
    .status(200)
    .json(
      {
        csrfToken: req.csrfToken
      }
    )
}
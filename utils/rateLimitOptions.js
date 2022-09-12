const rateLimit = require('express-rate-limit')

// Use rate limiter to avoid too many request will be sent from the client to the server


exports.registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		"Trop de tentatives de création de comptes faites en moins d'une heure de la même adresse ip, veuillez patientez une heure avant de retenter de vous enregistrer",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 create account requests per `window`
	message:
		{
      message: "Trop de tentatives de connexion faites en moins de quinze minutes de la même adresse ip, veuillez patientez quinze minutes avant de retenter de vous enregistrer"
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 hour
	max: 1000, // Limit each IP to 100 create account requests per `window`
	message:
		{
      message: "Trop de requêtes envoyées au serveur de la même adresse ip en moins d'une heure, veuillez patientez une heure avant de recommencer vos activités sur le site"
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})
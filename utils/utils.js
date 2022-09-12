// File for useful functions

/**
 * Returns true or false to indicate to the middleware if we have to return a response with code status 400 if there is a missing fields or an extra field in the incomming request
 * 
 * @param {array} fieldsArray the array containing all the fields that the body of the request must contain
 * @param {Object} reqBody The req.body of the incoming request
 * @return {boolean} 
 */
exports.checkFieldsPresence = (fieldsArray, reqBody) => {
  // Check if fieldsArray length and reqBody length are equal
  if (Object.keys(reqBody).length !== fieldsArray.length) {
    return false
  } 

  // Check if the variables are the ones expected
  fieldsArray.forEach(key => {
    if (!Object.keys(reqBody).includes(key)) return false
  })

  return true
}

/**
 * Function to return a string representing a date from a formatted date object
 * 
 * @param {object} date 
 * @return {string}
 */
exports.formatDate = (date) => {
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  const year = date.getFullYear(),
    month = months[date.getMonth()],
    day = date.getDate(),
    hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`,
    minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

  return `${day} ${month} ${year} à ${hour}h${minutes}`
}


/**
 * Function to remove all accents from a string
 * 
 * @param {string} date 
 * @return {string}
 */
exports.removeAccentsInString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

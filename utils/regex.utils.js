exports.verifyEmailSyntax = (email) => {
  emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  return emailRegex.test(email)
}

exports.verifyPasswordSyntax = (password) => {
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-_]{8,}$/)
  return passwordRegex.test(password)
}

exports.verifyUrlSyntax = (url) => {
  urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
  return urlRegex.test(url)
}

exports.verifyYoutubeUrlSyntax = (youtubeUrl) => {
  youtubeUrlRegex = new RegExp( /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)

  if (youtubeUrlRegex.test(youtubeUrl)) return youtubeUrl.match('v=([a-zA-Z0-9_-]+)&?')[1]
  else return false
}

const fs = require('fs');

module.exports = class FileUploader {

  static uploadFile(img, context) {
    const MIME_TYPES = {
      'image/jpg': 'jpg',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/svg+xml': 'svg',
      'image/gif': 'gif'
    }

    let newFileName,
      extension = MIME_TYPES[img.mimetype];

    console.log("Img in fileUploader utils", img)
    console.log("context in utils file upload =>", context)
    if (context?.username && context?.flag === 'profile_image') {
      console.log("USER name in fileUploader utils =>", context.username)
      newFileName = context.username + '_Profil_img_' + Date.now() + '.' + extension
    } else if (context?.postId && context?.flag === 'posts_images') {
      console.log("Post unique image in utils for the post =>", context.postId)
      let removeWhiteSpaces = img.name.split(' ').join('_');
      newFileName = removeWhiteSpaces.split('.').slice(0, -1) + '_' + context.flag + '_' + context.postId + '_' + Date.now() + '.' + extension;
    }

    return newFileName
  }

  static uploadFiles(images, id, flag) {
      console.log("Images => ", images);
      console.log("LENGTH IMAGES ARRAY => ", images.length);
      
      const MIME_TYPES = {
          'image/jpg': 'jpg',
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/svg+xml': 'svg',
          'image/gif': 'gif'
      };
      console.log("FLAG => ", flag)
      let filesArray = [];
      for(let i = 0; i < images.length; i++) {
        if (images.size > 200000) {
          return res
            .status(500)
            .json(
              { 
                message: "La taille du fichier de doit pas excéder 200 ko" 
              }
            )
        }
        let extension = MIME_TYPES[images[i].mimetype];
        let removeWhiteSpaces = images[i].name.split(' ').join('_');
        let newFileName = removeWhiteSpaces.split('.').slice(0, -1) + '_' + flag + '_' + id + '_image_' + i + '_' + Date.now() + '.' + extension;
        filesArray.push(newFileName);     
      }

      return filesArray;
  }

  static deleteFile(fileName, flag) {
    let folder;
    if (flag === 'image_profil') folder = 'profile'
    if (flag === 'posts_images') folder = 'posts'

    fs.unlink(`public/uploads/${folder}/` + fileName, (err) => {
      if (err) {
          console.error(err)
          return err
      }
    })
  }

  static deleteFiles(filesNameArray, flag) {
    let folder
    if(flag === 'posts_images') folder = 'posts'

    for (let i = 0; i < filesNameArray.length; i++) {
      fs.unlink(`public/uploads/${folder}/` + filesNameArray[i], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ err: err })
        }
      })
    }
  }
}
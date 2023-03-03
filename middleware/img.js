const cloudinary = require('cloudinary').v2;
const config = require('../config/config')
const fs = require('fs');
// cloudinary.config({
//     cloud_name: config.cloudinary.cloud_name,
//     api_key: config.cloudinary.api_key,
//     api_secret: config.cloudinary.api_secret
//   });

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "datidmq6e",
  api_key: "759781736949789",
  api_secret: "ch7sy_0v7lcV_n0z1GxZcKP3wSs",
  secure: true
});

// // Log the configuration
console.log(cloudinary.config());


// /////////////////////////
// // Uploads an image file
// /////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
    

// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
   

// //////////////////////////////////////////////////////////////
// // Creates an HTML image tag with a transformation that
// // results in a circular thumbnail crop of the image  
// // focused on the faces, applying an outline of the  
// // first color, and setting a background of the second color.
// //////////////////////////////////////////////////////////////
const createImageTag = (publicId) => {
    
    // Set the effect color and background color
    // const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId
      // transformation: [
      //   { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
      //   { radius: 'max' },
      //   { effect: 'outline:10', color: effectColor },
      //   { background: backgroundColor },
      // ],
    );

    return imageTag;
};
   

// //////////////////
// //
// // Main function
// //
// //////////////////
// (async () => {

//     // Set the image to upload
//     // const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
//  const imagePath = 'den4.jpg';

//     // Upload the image
//     const publicId = await uploadImage(imagePath);

//     // Get the colors in the image
//     const colors = await getAssetInfo(publicId);

//     // Create an image tag, using two of the colors in a transformation
//     const imageTag = await createImageTag(publicId);

//     // Log the image tag to the console
//     console.log(imageTag);

// })();

exports.uploadImage = async (req, res, next) => {
  console.log(req);
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;

        const imagePath = avatar.name;
        avatar.mv('./uploads/' + avatar.name);
       
    // Upload the image
    const publicId = await uploadImage('./uploads/'+imagePath);
    fs.unlinkSync('./uploads/'+imagePath);
    // Get the colors in the image
    const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId);

    // Log the image tag to the console
    console.log(imageTag);
        //Use the mv() method to place the file in the upload directory (i.e. "uploads")
        // avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                imageTag: imageTag,
                size: avatar.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
    
  };
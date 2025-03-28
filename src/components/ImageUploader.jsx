// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";

// const ImageUploader = ({ onImagesUpload }) => {
//   const [images, setImages] = useState([]);
//   const [crop, setCrop] = useState({ aspect: 1 });
//   const [currentImage, setCurrentImage] = useState(null);
//   const [captions, setCaptions] = useState({});

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     multiple: true,
//     onDrop: (acceptedFiles) => {
//       const imagePreviews = acceptedFiles.map((file) =>
//         Object.assign(file, { preview: URL.createObjectURL(file) })
//       );
//       setImages(imagePreviews);
//     },
//   });

//   const handleCaptionChange = (index, caption) => {
//     setCaptions((prev) => ({ ...prev, [index]: caption }));
//   };

//   const handleCropComplete = (crop, index) => {
//     // Save cropped image logic here
//     console.log("Cropped image for index", index);
//   };

//   const handleSubmit = () => {
//     onImagesUpload(images, captions);
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-gray-100">
//       <div {...getRootProps()} className="p-6 border-dashed border-2 rounded-lg cursor-pointer text-center">
//         <input {...getInputProps()} />
//         <p>Drag & Drop images or Click to Upload</p>
//       </div>

//       {images.length > 0 && (
//         <div className="mt-4 space-y-4">
//           {images.map((image, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <ReactCrop
//                 src={image.preview}
//                 crop={crop}
//                 onChange={(newCrop) => setCrop(newCrop)}
//                 onComplete={() => handleCropComplete(crop, index)}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Caption"
//                 value={captions[index] || ""}
//                 onChange={(e) => handleCaptionChange(index, e.target.value)}
//                 className="mt-2 p-2 border rounded w-full"
//               />
//             </div>
//           ))}
//           <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//             Upload Images
//           </button>
//         </div>
//       )}
//     {/* </div> */}
//   );
// };

// export default ImageUploader;

import axios from "axios";

export async function bookService(serviceName: string, formData: FormData) {
  
  try{
    const response = await axios.post(
    "www.backendServer.com",
    {
      serviceName,
      formData,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
   console.log("Upload successful:", response.data);
} catch (err){
    console.log(err);
    
}
}

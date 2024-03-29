import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from "../conf.js";

export class DbService{                
   client = new Client()
   databases;
   storage;

   constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.projectId)

   this.databases = new Databases(this.client)
   this.storage = new Storage(this.client)
   }

   async createPost({title, slug, content, featuredImage, status, userId, username}){
    try {
         return await this.databases.createDocument(conf.databaseId, conf.collectionId,
             slug,
             {
                title,
                content,
                featuredImage,
                status,
                userId,
                username
             })
    } catch (error) {
        console.log("Error while Creating post ::", error);
         throw error
    }
   }

   async updatePost( slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(conf.databaseId, conf.collectionId,
           slug,
           {
            title, 
            content, 
            featuredImage,
            status,
           } )
    } catch (error) {
        console.log("Error While Updating Post::", error);
    }
   }

   async getAllPost( queries = [Query.equal("status", "public"), Query.orderDesc('$createdAt')]){
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
         conf.collectionId, 
         queries)
    } catch (error) {
     console.log("Error While fetching All Post::", error); 
    }
   }
   async getUserPost(userId){
    const queries = [Query.equal('userId' , userId)]
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
         conf.collectionId, 
         queries)
    } catch (error) {
     console.log("Error While fetching User All Post::", error); 
    }
   }

   async getPost(slug){
   try {
     return await this.databases.getDocument(
         conf.databaseId,
         conf.collectionId,
         slug
     )
   } catch (error) {
    console.log("Error While fetching Post::", error);  
   }
   }

   async deletePost(slug){
    try {
     await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug)
     return true; 
    } catch (error) {
     console.log("Error While Deleting Post::", error); 
     return false
    }
   }
   
  // file upload methods
   async  uploadFile(file){
      try {
          return await this.storage.createFile(
              conf.bucketId, 
              ID.unique(), 
              file
              )
      } catch (error) {
       console.log("Error While Uploading File::", error.message) 
      }
   }
   
   async deleteFile(fileId){
    try {
         await this.storage.deleteFile(conf.bucketId, fileId)
         return true
    } catch (error) {
    console.log("Error While deleting file::", error);
    return false  
        
    }
   }

  previewFile(fileId){
   try {
     return   this.storage.getFilePreview(conf.bucketId, fileId )
   } catch (error) {
    console.log("Error While previewing file::", error);  
   }
   }

}

let dbService = new DbService();

export default dbService;
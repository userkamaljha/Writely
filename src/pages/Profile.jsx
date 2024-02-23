import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Logo } from "../components";
import { GoArrowLeft } from "react-icons/go";
import { RiTwitterXLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/db";
import formatDate from "../appwrite/date";

function Profile() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const userId = user.$id;
console.log(posts);
  useEffect(() => {
    appwriteService.getUserPost(userId).then((posts) => {
      if (posts) {
        setPosts(posts.documents.reverse());
      }
    });
  }, [user]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    }
    fetchUserData();
  }, [setUser]);

  return (
    <div className="bg-[#f3f6f9] w-full md:px-24 md:py-16 xl:px-28 min-h-screen">
      <div className="flex gap-8 items-start">
        <Link to={"/"}>
          <GoArrowLeft title="Home page" className="text-3xl hover:bg-gray-300 p-1 rounded-sm mt-3 mr-3  " />
        </Link>
        <div className="w-3/12">
          <header className=" rounded-lg  justify-between  items-start    min-h-60">
            <Logo className=""></Logo>
            <div className=" my-4 mx-6">
              <h1 className=" md:text-2xl text-4xl font-serif font-semibold text-[#373f45]">
                Writely{" "}
              </h1>
              <h3 className="text-[#373f45c8] md:text-lg text-xl my-2 font-serif font-semibold">
                by Kamal Jha
              </h3>
              <p className="md:my-6 md:mb-4 my-8 md:text-base border-b pb-4 text-lg md:leading-7 leading-8">
                Welcome to Writely, where users can seamlessly write, read,
                update, and delete their blogs while effortlessly incorporating
                striking featured images to enhance their storytelling.
              </p>
              <span className="font-serif font-semibold gap-4 flex items-center">
                Share{" "}
                {
                  <RiTwitterXLine className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }
                {
                  <FaFacebook className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }
                {
                  <MdEmail className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }{" "}
              </span>
            </div>
          </header>
        </div>
        <div className="w-full  bg-white py-8 px-14 rounded-lg">
          <div className="flex justify-start items-center  gap-28  w-full mb-6">
            <div className="h-44 bg-blue-400 rounded-full border w-44   ">
              {/* <img alt="image" className=" w-full rounded-xl h-full" /> */}
            </div>

            <div className="mb-4">
              <h1 className="text-4xl leading-snug capitalize  font-serif text-[#373f45] font-bold">
                {user.name}{" "}
              </h1>
              <span className=" text-lg text-[#373f45c8] hover:underline   font-serif">
                {user.email}
              </span>
              <br />
              <span className=" text-md ">
              Joined : {formatDate(user.$createdAt)}
              </span>
            </div>
          </div>

          <hr />

          <div className="my-8 py-5 min-h-24 text-lg leading-relaxed ">
            <h1 className="text-4xl leading-snug capitalize  font-serif text-[#373f45] font-bold">
              All Posts
            </h1>
            <div className="flex flex-wrap h-full   justify-start gap-8 items-start my-12">
              
              {posts.length !== 0 ? (
                posts.map((post) => (
                <Link to={`/post/${post.$id}`}>
                  <div className="flex flex-col  overflow-hidden drop-shadow-sm  w-44 gap-4 rounded-md">
                    <div className="h-40 overflow-hidden ">
                    <img
                      src={appwriteService.previewFile(post.featuredImage)}
                      alt={post.title}
                      className=" w-full h-40 transition shadow-md ease-in-out delay-150 duration-300 hover:scale-110"/>
                    </div>
                   
                    <div className=" w-full h-14 py-2  text-center line-clamp-3    ">
                    <h1 className=" text-base capitalize  line-clamp-1 font-semibold ">{post.title}</h1>
                    <span className="text-sm">{post.status} • {formatDate(post.$createdAt)}</span>
                    </div>
                    <span className="text-sm text-center ">Last updated • {formatDate(post.$updatedAt)}</span>
                    <span className=" p-2 text-sm font-normal text-center bg-[#f6f6f7] hover:bg-[#e8e8ebf4] rounded-md w-full">Edit Post</span>
                  </div>
                </Link>

                ))
              ) : (
                <h1>No Post Found!!</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

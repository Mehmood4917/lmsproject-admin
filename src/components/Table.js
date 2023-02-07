import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { useEffect } from "react";
import { post } from "../services";

function Table(props) {

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [nextpage, setNextpage] = useState(currentPage + 1);
  // const [prevpage, setPrevpage] = useState(currentPage - 1);
  const [postsPerPage, setPostsperpage] = useState(5);
  const [newd, setNewd] = useState([]);
  const [filetring,SetFiltering] = useState(false)
  const [currentPosts,setCurrentposts] = useState([])
  
  
  const [back,setBack]=useState()

  console.log(' Table props', props)
  console.log('post data', props?.data)
  // Pagination
 
  useEffect(() => {
    setPosts(props.data)
    setNewd(props.data)

  }, [props.data])
  console.log(posts,newd)
  // useEffect(()=>{
  //   setNewd(posts)
  // },[posts])
  console.log(newd,"newd")
  // console.log(props.isBackend)
  // if(props.isBackend){
  //   useEffect(()=>{
  //     props.pageNoSize(parseInt(currentPage-1));
  //   },[currentPage])
  // }
  var last = Math.ceil(props.items/postsPerPage)


  // const last = Math.ceil(posts.length / postsPerPage);
  const setNext = () => {
    if (currentPage < last) {
       setCurrentPage(currentPage + 1);
      }
  };
  const setPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage-1);
    }
  };
  const setFirst = () => {
    setCurrentPage(1);
  };
  const setLast = () => {
     setCurrentPage(last);
  };

  const set = (e) => {
    setPostsperpage(parseInt(e.target.value));
    setCurrentPage(1);
    props.sizeperpage(parseInt(e.target.value));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Filtering
  const filter = (e) => {
    SetFiltering(true)
    setNewd(
      posts.filter((posts) =>
        JSON.stringify(posts).includes(e.target.value.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  // var currentPosts = newd.slice(indexOfFirstPost, indexOfLastPost);
  const setb = ()=>{
    console.log(props.isBackend)
    if(props){
    if(props.isBackend){
      props.pageNoSize(parseInt(currentPage-1));
       last = Math.ceil(props.items / postsPerPage);
       setCurrentposts(posts)
      console.log("ifblock")
    }else{
       last = Math.ceil(newd.length/postsPerPage);
       setCurrentposts(newd.slice(indexOfFirstPost,indexOfLastPost))
       console.log("elseblock")
    }
  }
  }
    useEffect(()=>{
      setb()
    },[currentPage,props,props.data,newd])
  return (
    <>


      <form className="px-4">
        <input
          onChange={filter}
          className="w-full border-b border-gray-300  outline-none  text-lg  "
          type="text"
          placeholder="Filter"
        />

        <div className="pt-4 ">
          <table className="w-full  ">
            <thead>
              <tr className="bg-gray-100 ">
                {props.headers.map((item, i) => (
                  <td className="p-4 text-base text-gray-400 font-medium ">
                    {item?.headerName}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentPosts.map((q, i) => (
                <tr key={i}>
                  {props?.headers?.map((w) => (
                    <td className="font-medium  text-thin p-4 border-b border-gray-200">
                      {(w?.field) ? q[w?.field] : w.onRender(q)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 float-right flex">
          <div className="pr-4">
            <label className="font-medium text-gray-400 text-sm p-2">
              Items per page:
            </label>
            <select
              className=" border-b-2 border-gray-300  outline-none w-10 text-sm font-medium w-16 "
              // onChange={(e)=>{setPostsperpage(parseInt(e.target.value))&&setCurrentPage(1)}}
              onChange={set}

            >
              <option className="w-full bg-white" value="5">
                5
              </option>
              <option className="w-full bg-white" value="10">
                10
              </option>
              <option className="w-full bg-white" value="20">
                20
              </option>
            </select>
          </div>
          <div className="px-4">
            {/* {posts.length > 0 ? { indexOfFirstPost + 1}  of {props.items}} */}

            {posts.length === 0 ? 0 : indexOfFirstPost + 1} - {indexOfLastPost > props.items ? props.items : indexOfLastPost} of {props.items}
          </div>
          <div className="flex">
            <AiFillStepBackward size="1.5rem" className="cursor-pointer" onClick={setFirst} />
            <IoCaretBackOutline size="1.5rem" className="cursor-pointer" onClick={setPrev} />
            <span> {currentPage} </span>
            <IoCaretForwardOutline size="1.5rem" className="cursor-pointer" onClick={setNext} />
            <AiFillStepForward size="1.5rem" className="cursor-pointer" onClick={setLast} />
          </div>
        </div>
      </form>
    </>

  );
}

export default Table;

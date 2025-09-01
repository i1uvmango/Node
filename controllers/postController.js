//게시물 CRUD 로직처리
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post"); //게시물
const comment = require("../models/PostComment"); //댓글



//게시물

    //GETALL
    const getAllPosts = asyncHandler(async (req,res) => {
        const posts = await Post.find();
         if( posts.length === 0 ){
            throw new Error("게시물을 찾을 수 없습니다.");
        }
        res.render("allpost", {posts : posts});
        
    }) 

    //GET/:Id 렌더링
    const getPostById = asyncHandler(async(req,res) => {
        const post = await Post.findById(req.params.id)
      
        if(!post){
            throw new Error("게시물을 찾을 수 없습니다.");
        }
        res.render("postId", {post : post})
    })

    //POST 생성
    const createPost = asyncHandler(async(req,res) => {
        const {title, content, category} = req.body;
        if(!title || !content || !category){
            throw new Error("제목, 내용, 카테고리를 모두 입력해주세요.");
        }
        const post = await Post.create({
            title, content, category
        })
        res.send("게시물이 작성되었습니다.");
    })

    //UPDATE
    const updatePost = asyncHandler(async(req,res) => {
        const id = req.params.id;
        const {title, category, content} = req.body; //req.body(입력) 받기
        const post = await Post.findById(id);
        if(!post){
            throw new Error("검색 결과가 없습니다.");
        }

        post.title = title;
        post.category = category;
        post.content = content
        await post.save();
        res.redirect("/post");
    })

    //DELETE
    const deletePost = asyncHandler(async(req,res)=>{
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(id);
        if(!post){
            throw new Error("삭제할 게시물이 없습니다.");
        }
        res.redirect("/post")
    })

router.use("/:postId/comments", require("./comments"));

module.exports= router;
//commentController
    const express = require("express");

    // mergeParams: true → 부모 라우터의 :postId 파라미터를 이 라우터에서도 사용 가능
    const router = express.Router({ mergeParams: true });

    const {
        createComment,
        deleteComment,
    } = require("../controllers/commentsController");

    // POST
    router.post("/", createComment);

    // DELETE
    router.delete("/:commentId", deleteComment);

    module.exports = router;

// review.controller.js
 // Adjust path based on your folder structure

export const sendReview = async (req, res) => {
    const { clueDescriptions, review } = req.body;
    console.log(review)
    res.send("ok");
};

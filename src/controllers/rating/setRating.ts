import { RatingModel } from "../../models/ratingModel";

export async function setRating(req: any, res: any) {
  try {
    const { clientId, productId, rating } = req.body;
    

    let ratingExist = await RatingModel.findOne({ clientId, productId });
    if(ratingExist) {
        ratingExist.rating = rating;
        await ratingExist.save();
    } else {
        const newRating = new RatingModel({
            clientId,
            productId,
            rating,
          });

        await newRating.save();
    }





    res.status(200).json({ message: "Rating added successfully"});
  } catch (error: any) {
    console.error("Error in addToCart:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
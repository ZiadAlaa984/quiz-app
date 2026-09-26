import Result from "../models/result.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import Factory from "../utils/factory.js";

const resultFactory = new Factory(Result);

const getAllResults = resultFactory.getAll;

const getResult = catchAsync(async (req, res, next) => {
    const doc = await Result.findById(req.params.id);

    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }

    const userId = req.user._id; // or req.user.id, depending on your auth middleware

    if (userId.toString() !== doc.user.toString()) {
        return next(new AppError("You can only view your own result", 403));
    }

    res.status(200).json({
        status: "success",
        data: {
            doc
        }
    });
});

const createResult = resultFactory.createOne;
const updateResult = resultFactory.updateOne;
const deleteResult = resultFactory.deleteOne;

export default { getAllResults, getResult, createResult, updateResult, deleteResult };
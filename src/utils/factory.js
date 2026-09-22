import AppError from "./AppError.js";
import catchAsync from "./catchAsync.js";

class Factory {
    constructor(model) {
        this.model = model;
    }

    getAll = catchAsync(async (req, res, next) => {
    const data = await this.model.find();
    res.status(200).json({
    status: "success",
    results: data.length,
    data
    })
    }); 


    createOne = catchAsync(async (req, res, next) => {
        
    const doc = await this.model.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            doc
        }
    })
    })

    getOne = catchAsync(async (req, res, next) => {
    const doc = await this.model.findById(req.params.id);
    if (!doc) {
    return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            doc
        }
    })
    })

    updateOne = catchAsync(async (req, res, next) => {
    const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            doc
        }
    })})

    deleteOne = catchAsync(async (req, res, next) => {
    const doc = await this.model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null
    })
    })
}

export default Factory;
import mongoose from "mongoose";
import * as _ from "lodash";
import Promise from "bluebird";
import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import uniqueValidator from "mongoose-unique-validator";

const category = {
  ENTERTAINMENT: "ENTERTAINMENT",
  MEETING: "MEETING",
  MEDICAL_VISIT: "MEDIAL VISIT",
  VISITS: "VISIT",
};

const categories = [
  category.ENTERTAINMENT,
  category.MEDICAL_VISIT,
  category.MEETING,
  category.VISITS,
];

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: categories,
      default: category.ENTERTAINMENT,
      required: false,
    },
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  {
    collection: "event",
  }
);

const EventModel = mongoose.model("event", eventSchema);

const createNewOrUpdate = (event) => {
  return Promise.resolve()
    .then(() => {
      if (!event.id) {
        return new EventModel(event).save().then((result) => {
          if (result) {
            return mongoConverter(result);
          }
        });
      } else {
        return EventModel.findByIdAndUpdate(event.id, _.omit(event, "id"), {
          new: true,
        });
      }
    })
    .catch((error) => {
      if ("ValidationError" === error.name) {
        error = error.errors[Object.keys(error.errors)[0]];
        throw applicationException.new(
          applicationException.BAD_REQUEST,
          error.message
        );
      }
      throw error;
    });
};

const getAllEventsForUser = async (userId) => {
  return await EventModel.find({ userId });
};

const removeById = async (id) => {
  return await EventModel.findByIdAndRemove(id);
};

const getById = async (id) => {
  return await EventModel.findById(id);
};

export default {
  createNewOrUpdate: createNewOrUpdate,
  removeById: removeById,
  getAllEventsForUser,
  getById,

  categories,
  model: EventModel,
};

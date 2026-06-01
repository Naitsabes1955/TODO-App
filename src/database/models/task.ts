import mongoose, { Schema } from "mongoose";
import type { Task } from "@/types/task";

export const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending" , "inProgress" , "Done"],
    default: "Pending",
  },    
  accumulatedAt: {
    type: Number,
    default: 0,
  },
  createdAt:{
    type: Number,
    default: 0,
  },
  startedAt:{
    type: Number,
    default: null
  },
  finalizedAt:{
    type: Number,
    default: Date.now,
  }
});

export const TaskModel =
    mongoose.models.Task || mongoose.model<Task>("Task", TaskSchema);
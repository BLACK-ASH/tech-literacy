import mongoose, { model, models } from "mongoose";

export type ParticipationType = {
    name: string,
    eventId: string,
    type: "solo" | "team",
    members: {
        name: string,
        email: string,
    }[]
}


const participationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["solo", "team"],
        required: true
    },
    members: {
        type: [{
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }],
        required: true
    }
}, {
    timestamps: true
})

const Participation = models.Participation || model("Participation", participationSchema);

export default Participation;
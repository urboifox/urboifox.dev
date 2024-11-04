import mongoose, { Model } from 'mongoose';

export interface Craft {
    id: string;
    title: string;
    repo: string;
    link: string;
    slug: string;
    client: string;
    clientUrl: string;
    description: string;
    published: boolean;
    image: string;
    additionalImage: string[];
    startDate: Date;
    endDate: Date;
}

const CraftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    repo: {
        type: String
    },
    link: {
        type: String
    },
    slug: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    clientUrl: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    additionalImage: {
        type: [String]
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

CraftSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
        delete ret._id;
    }
});

const CraftModel: Model<Craft> = mongoose.models.Craft || mongoose.model('Craft', CraftSchema);

export default CraftModel;

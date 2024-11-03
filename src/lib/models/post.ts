import mongoose, { Model } from 'mongoose';

export interface Post {
    id: string;
    content: string;
    title: string;
    summary: string;
    tags: string[];
    published: boolean;
    readingTime: number;
    image: string;
    youtubeId: string;
    createdAt: Date;
}

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    published: {
        type: Boolean,
        default: false
    },
    readingTime: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    youtubeId: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
        delete ret._id;
    }
});

const PostModel: Model<Post> = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default PostModel;

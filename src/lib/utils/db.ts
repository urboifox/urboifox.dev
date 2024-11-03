import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';
/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
    isConnected: 0
};

export const dbConnect = async () => {
    if (mongoConnection.isConnected === 1) {
        console.log('already connected to mongodb. skipping...');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            return;
        }

        await mongoose.disconnect();
    }
    await mongoose.connect(MONGODB_URI ?? '');
    mongoConnection.isConnected = 1;
    console.log('connected to mongodb');
};

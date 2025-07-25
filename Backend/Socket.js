const socketIo = require('socket.io');
const userModel = require('./Models/Usemodel');
// const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
                // } else if (userType === 'captain') {
                //     await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                // }
            } catch (err) {
                console.error('Error joining socket:', err);
                socket.emit('error', { message: 'Failed to update user/captain socketId' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // try {
            //     await captainModel.findByIdAndUpdate(userId, {
            //         location: { ltd: location.ltd, lng: location.lng }
            //     });
            // } catch (err) {
            //     console.error('Error updating location:', err);
            //     socket.emit('error', { message: 'Failed to update location' });
            // }
        });

        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            try {
                // Remove socketId from user or captain when disconnected
                await userModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
                await captainModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
            } catch (err) {
                console.error('Error clearing socketId on disconnect:', err);
            }
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };
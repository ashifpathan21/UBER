const socketIo = require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')




let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(
                    userId, {
                    socketId: socket.id
                }
                )
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId,  location } = data;
            console.log(`user ${userId} upadate location to ${location}  `)

            if (!location || !location.ltd || !location.lng) {
                console.error('Invalid location data:', location);
                return;
            }

         
            
                await captainModel.findByIdAndUpdate(userId, { location: {
                    ltd: location.ltd ,
                    lng: location.lng
                } } ,
            {new: true});
            

        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
}

function sendMessageToSocketId(socketId, messageObject) {
    if (!io) {
        throw new Error('Socket.io has not been initialized.');
    }
    io.to(socketId).emit(messageObject.event,messageObject.data);
}

module.exports = { initializeSocket, sendMessageToSocketId };

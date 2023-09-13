import mongoose from 'mongoose';

export const connect = async () => {
    mongoose.set('strictQuery', true);

    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected sucessfully.');
        });

        connection.on('error', (err) => {
            console.log(err);
            process.exit();
        });
    } catch (error) {
        console.log(error);
        console.log('ERROR!!!!!!');
    }
};

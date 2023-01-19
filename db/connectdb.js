import mongoose, { set } from 'mongoose';
mongoose.set('strictQuery', true)

/*async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/curd')
    .then(()=>{console.log('Database connected')})
}
main();*/

const ConnectDB = async (DATABASE_URL)=>{
    try{
        const DB_OPTION ={
            dbName:"curd",
        };
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log('connected');

    }catch{
        console.log('err');
    }
}

export default ConnectDB;


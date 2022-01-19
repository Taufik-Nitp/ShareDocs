//  import {mongoose} from "mongoose";
   const mongoose= require("mongoose")
const Connection = async (username = 'taufika999', password = '1234') => {
  const url = `mongodb://taufika999:${password}@cluster0-shard-00-00.uoopx.mongodb.net:27017,cluster0-shard-00-01.uoopx.mongodb.net:27017,cluster0-shard-00-02.uoopx.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-9086bt-shard-0&authSource=admin&retryWrites=true&w=majority`

  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('database connected...')
  } catch (error) {
    console.log('Error while connecting', error)
  }
}
  Connection();

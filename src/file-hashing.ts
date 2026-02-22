import { ParallelHasher } from "ts-md5";

const getFileHash = async(filePath:string)=>{
    const  file = Bun.file(filePath);
    const hasher = new ParallelHasher('/path/to/ts-md5/dist/md5_worker.js');
    const hash = await hasher.hash(file);
    return hash;
}

export default getFileHash;
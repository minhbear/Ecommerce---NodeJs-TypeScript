import mongoose from "mongoose";
import os from 'os';
import process from "process";

const _SECONDS = 5000;

export const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        
        // Example maximum number of connections based on number of core
        // Assume that each core in computer can handle maximum connection is 5
        const maxConnection = numCores * 5;

        console.log(`Active connection ::: ${numConnection}`);
        console.log(`Memory used ::: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnection > maxConnection) {
            console.log(`Connection overload detectd!`);
        }
    }, _SECONDS);
}

export const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number if connections ::: ${numConnection}`);
}
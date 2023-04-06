import { connect } from "mongoose";
import { dbConnection } from '@databases/index';
import { countConnect } from "@helpers/check.connect";

class Database {
    static instance: Database;

    constructor() {
        this.connect();
    }

    connect() {
        connect(dbConnection.url, dbConnection.options)
        .then(() => {
            console.log(`Connected mongodb success`);
            countConnect()
        })
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

export const instanceMongoDb: Database = Database.getInstance();



const appwrite = require('appwrite');

const Client = appwrite.Client;
const Databases = appwrite.Databases;

const projectId = '668e8c9a001544e566fa'
const databaseId = '668ec2fe0025f1aceef7'
const collectionId = '66953a5900039caec51d'

class AppwriteManager {
    constructor() {
        this.client = new Client();
        this.databasesManager = new Databases(this.client);
    }

    async config() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(projectId);
    }

    async createNotification(documentId, data) {
        try {
            await this.databasesManager.createDocument(
                databaseId,
                collectionId,
                String(documentId),
                {
                    notifications: data
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}

const appwriteManagerInstance = new AppwriteManager();

module.exports = {
    AppwriteManager,
    appwriteManagerInstance
};
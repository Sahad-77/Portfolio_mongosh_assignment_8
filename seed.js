// seed.js

require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "portfolio";

// Portfolio projects
const projects = [
    {
        name: "NextGen ISP",
        technologies: "Python, Django, ReactJS, SQLite",
        description:
            "An ERP and CRM platform designed specifically for Internet Service Providers.",
        github: "https://github.com/Sahad-77/NextGenISP"
    },
    {
        name: "Criminal Management System",
        technologies: "HTML, CSS, PHP, JavaScript",
        description:
            "A web-based platform designed to manage and track criminal activities.",
        github: "https://github.com/Sahad-77/criminalmanagementsystem"
    },
    {
        name: "HappenChain",
        technologies: "Python, Django, MySQL, HTML, CSS, JavaScript",
        description:
            "An event management system designed for educational institutions.",
        github: "https://github.com/Sahad-77/happenchain"
    }
];

// Portfolio certificates
const certificates = [
    {
        name: "Full Stack Web Dev with AI Tools",
        organization: "Edunet",
        description:
            "Training in frontend technologies, REST APIs, Git, and AI tools.",
        image: "Edu.png"
    },
    {
        name: "Power BI Training Program",
        organization: "ICTAK",
        description:
            "Training in data transformation, data modeling, dashboards, and DAX.",
        image: "powerbi.png"
    },
    {
        name: "ReactJS for Beginners",
        organization: "Simplilearn SkillUp",
        description:
            "Training in ReactJS frontend development.",
        image: "React.png"
    },
    {
        name: "AI Skills Passport",
        organization: "EY and Microsoft",
        description:
            "Learning about AI concepts, sustainability, and employability skills.",
        image: "Alpass.png"
    }
];

// Insert data into MongoDB
async function seedDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        console.log("Connected to MongoDB.");

        const db = client.db(dbName);

        // Insert projects
        await db.collection("projects").deleteMany({});
        await db.collection("projects").insertMany(projects);

        // Insert certificates
        await db.collection("certificates").deleteMany({});
        await db.collection("certificates").insertMany(certificates);

        console.log("Projects inserted successfully!");
        console.log("Certificates inserted successfully!");

        console.log(`Database: ${dbName}`);
        console.log(`Projects: ${projects.length}`);
        console.log(`Certificates: ${certificates.length}`);

    } catch (error) {
        console.error("Error inserting data:", error);
        process.exitCode = 1;

    } finally {
        await client.close();
    }
}

seedDatabase();
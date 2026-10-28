require("dotenv").config();

const express = require("express");
const path = require("path");
const { connectDB, getDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files such as CSS and images
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// About page
app.get("/about", (req, res) => {
    res.render("about");
});

// Projects and certificates from MongoDB
app.get("/projects", async (req, res) => {
    try {
        const db = getDB();

        const projects = await db
            .collection("projects")
            .find()
            .toArray();

        const certificates = await db
            .collection("certificates")
            .find()
            .toArray();

        res.render("projects", {
            projects,
            certificates
        });
    } catch (error) {
        console.error("Error loading projects:", error);
        res.status(500).send("Unable to load projects.");
    }
});

// Contact page
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exitCode = 1;
    }
}

startServer();
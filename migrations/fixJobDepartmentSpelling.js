const mongoose = require("mongoose");
const Pharmacist = require("../models/Pharmacist");
require("dotenv").config();

const fixJobDepartmentSpelling = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.NODE_MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");

    // Update all documents that have jobDepertment field
    const result = await Pharmacist.updateMany(
      { jobDepertment: { $exists: true } },
      { $rename: { jobDepertment: "jobDepartment" } }
    );

    console.log(`Updated ${result.modifiedCount} documents`);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the migration
fixJobDepartmentSpelling();

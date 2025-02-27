const mongoose = require('mongoose');
const Clinic = require('../models/Clinic');
const Doctor = require('../models/Doctor');
// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
console.log(process.env.MONGODB_URI,"this is processenv")
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    // Generate random clinics
    const clinicNames = [
        "Healthy Hearts Clinic", "Bright Smiles Dental", "General Care Hospital", "City Health Center",
        "Wellness Family Clinic", "Sunrise Pediatrics", "OrthoCare Center", "Lakeside Dermatology",
        "Vision Plus Optometry", "Harmony Mental Health", "Evergreen Physiotherapy", "Westside Medical Group"
    ];

    const clinics = clinicNames.map(name => ({
        name,
        address: `${Math.floor(Math.random() * 999) + 1} ${["Main St", "Oak Ave", "Pine Rd", "Elm Blvd"][Math.floor(Math.random() * 4)]}`
    }));

    const insertedClinics = await Clinic.insertMany(clinics);
    console.log('Clinics inserted');

    // Generate random doctors
    const specializations = ["Cardiology", "Dentistry", "General Medicine", "Pediatrics", "Orthopedics", "Neurology", "Dermatology", "Ophthalmology"];

    const doctors = [];
    for (let i = 0; i < 150; i++) {
        const doctorName = `Dr. ${["Alice", "Bob", "Caroline", "David", "Erica", "Frank", "Grace", "Henry", "Ivy", "Jack"][Math.floor(Math.random() * 10)]} ${["Johnson", "Patel", "Smith", "Martinez", "Moore", "Lee", "Brown", "Davis", "Wilson", "Garcia"][Math.floor(Math.random() * 10)]}`;
        const specialization = specializations[Math.floor(Math.random() * specializations.length)];

        // Assign doctor to 1-3 random clinics
        const assignedClinics = insertedClinics
            .sort(() => 0.5 - Math.random()) // Shuffle clinics
            .slice(0, Math.floor(Math.random() * 3) + 1) // Take 1-3 clinics
            .map(clinic => clinic._id);

        doctors.push({
            name: doctorName,
            specialization,
            clinics: assignedClinics
        });
    }

    await Doctor.insertMany(doctors);
    console.log('Doctors inserted');

    mongoose.connection.close();
    console.log('Database seeding complete');
}).catch(err => {
    console.error('Database seeding failed:', err);
    mongoose.connection.close();
});

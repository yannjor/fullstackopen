import patientData from "../../data/patients";
import { Patient } from "../types";

const patients: Patient[] = patientData as Patient[];

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): Omit<Patient, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = () => {};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
};

import patientData from "../../data/patients";
import { NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

let patients: Patient[] = patientData as Patient[];

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

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
};

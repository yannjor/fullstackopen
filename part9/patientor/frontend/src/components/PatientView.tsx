import { useState, useEffect } from "react";

import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { useParams } from "react-router-dom";

export const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    id && patientService.getById(id).then((p) => setPatient(p));
    diagnosesService.getAll().then((d) => setDiagnoses(d));
  }, [id]);

  if (patient) {
    return (
      <div>
        <h3>{patient.name}</h3>
        <p>ssn: {patient?.ssn}</p>
        <p>gender: {patient.gender}</p>
        <p>date of birth: {patient?.dateOfBirth}</p>
        <p>occuption: {patient.occupation}</p>

        <h4>Entries</h4>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find((d) => d.code === code);
                  return (
                    <li key={code}>
                      {code} {diagnosis?.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

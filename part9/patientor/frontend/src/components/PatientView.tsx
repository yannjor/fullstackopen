import { useState, useEffect } from "react";

import { Patient } from "../types";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";

interface PatientViewProps {
  patient: Patient;
}

export const PatientView = (props: PatientViewProps) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>(props.patient);

  useEffect(() => {
    id && patientService.getById(id).then((p) => setPatient(p));
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
        {patient.entries.map((e) => (
          <div key={e.id}>
            <p>
              {e.date} {e.description}
            </p>
            <ul>
              {e.diagnosisCodes &&
                e.diagnosisCodes.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

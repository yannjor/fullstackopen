import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { PatientView } from "./components/PatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch("/patients/:id");
  const patient = match ? patients.find((p) => p.id === match.params.id) : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="patients/:id"
            element={<PatientView patient={patient as Patient} />}
          />
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

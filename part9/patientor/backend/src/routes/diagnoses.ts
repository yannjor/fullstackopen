import express from "express";
import diagnoseService from "../services/diagnoseService";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
    const diagnoses: Diagnose[] = diagnoseService.getEntries();
    res.send(diagnoses);
});

export default router;

import { api } from "@/server/api";
import { Student } from "@/types";
import { StudentsFileResponse } from "@/types/types";
import { getStudent } from "@/utils/studentUtil";
import path from "path";
import {promises as fs} from "fs"

const STUDENTS_FILE_PATH = path.join(process.cwd(), "data", "students.json");

export async function POST(request: Request): Promise<Response> {
    const student: Student = await getStudent(request);
    const data = await fs.readFile(STUDENTS_FILE_PATH, "utf-8");
    const studentsData: Student[] = JSON.parse(data);

    if(studentsData.find((storedStudent: Student) => storedStudent.userName === student.userName && storedStudent.password === student.password)) {
        return new Response(JSON.stringify(student), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    return new Response("Invalid credentials", {
        status: 401,
        headers: {
            "Content-Type": "text/plain"
        }
    });
}
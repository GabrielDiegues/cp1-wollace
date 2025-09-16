import AsyncStorage from "@react-native-async-storage/async-storage";
import { Student } from "@/types";
import {promises as fs} from "fs"
import { getStudent } from "@/utils/studentUtil";
import { StudentsFileResponse } from "@/types/types";
import axios from "axios";
import { api } from "@/server/api";
import path from "path";

const STUDENTS_FILE_PATH = path.join(process.cwd(), "data", "students.json");

export async function POST(request: Request): Promise<Response> {
    // const student: Student  = await request.json();
    
    // const data = await fs.readFile(STUDENTS_FILE, "utf-8");
    // const parsedData: LoggedStudent[] = JSON.parse(data);

    const student: Student = await getStudent(request);
    const data = await fs.readFile(STUDENTS_FILE_PATH, "utf-8");
    const studentsData: Student[] = JSON.parse(data);

    if(studentsData.find((storedStudent: Student) => storedStudent.userName === student.userName)) {
        return new Response("User is already registered", {
            status: 409,
            headers: {
                "Content-Type": "text/plain",
            },
        })
    }
    const newStudent: Student = {...student, id: studentsData.length + 1, borrowedBooks: []}
    studentsData.push(newStudent)
    await fs.writeFile(STUDENTS_FILE_PATH, JSON.stringify(studentsData, null, 2));
    
    return new Response(`User resgisted with success`, {
        status: 201,
        headers: {
            "Content-Type": "text/plain",
        },
    })
}
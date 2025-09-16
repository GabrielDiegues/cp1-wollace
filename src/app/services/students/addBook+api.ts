

import { Student } from "@/types";
import path from "path";
import {promises as fs} from "fs"
import { getStudent } from "@/utils/studentUtil";
const STUDENTS_FILE_PATH = path.join(process.cwd(), "data", "students.json");

export async function PATCH(request: Request): Promise<Response> {
    try{
        const student: Student = await getStudent(request);
        const data = await fs.readFile(STUDENTS_FILE_PATH, "utf-8");
        const studentsData: Student[] = JSON.parse(data);
        const book = student.borrowedBooks.pop();
        if(book) {
            studentsData[student.id - 1].borrowedBooks.push(book);
            await fs.writeFile(STUDENTS_FILE_PATH, JSON.stringify(studentsData, null, 2));
            return new Response(`New book registered with success`, {
                status: 201,
                headers: {
                    "Content-Type": "text/plain",
                },
            })
        }
        return new Response("Coudn't register book", {
            status: 401,
            headers: {
                "Content-Type": "text/plain",
            },
        })
    }
    catch(error) {
        const msg = error instanceof Error ? error.message : String(error);
        return new Response(msg, {
            status: 401,
            headers: {
                "Content-Type": "text/plain",
            },
        })
    }
}
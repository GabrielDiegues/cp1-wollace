import { Student } from "@/types";



const DefaultStudent: Omit<Student, "id" | "borrowedBooks"> = {
    userName: "",
    password: "",
};


// Functions
const updateStudentProp = <K extends keyof Student>(prop: K, value: string) => (prev: typeof DefaultStudent) => ({...prev, [prop]: value}); 

const getStudent = async (jsonStudent: Request): Promise<Student> => await jsonStudent.json();




export {DefaultStudent, updateStudentProp, getStudent}
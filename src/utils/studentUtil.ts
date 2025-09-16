import { Student } from "@/types";



const DefaultStudent: Student = {
    id: 0,
    userName: "",
    password: "",
    borrowedBooks: [],
};


// Functions
const updateStudentProp = <K extends keyof Student>(prop: K, value: string) => (prev: Student) => ({...prev, [prop]: value}); 

const getStudent = async (jsonStudent: Request): Promise<Student> => await jsonStudent.json();




export {DefaultStudent, updateStudentProp, getStudent}
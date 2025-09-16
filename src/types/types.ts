interface Book {
    id: number;
    title: string;
    author: string;
    synopsis: string;
    borrowed: boolean;
}


interface Student {
    id: number;
    userName: string;
    password: string;
    borrowedBooks: Book[];
}



interface StudentsFileResponse {
    STUDENTS_FILE_PATH: string;
    studentsData: Student[];
}
export type {Book, Student, StudentsFileResponse}
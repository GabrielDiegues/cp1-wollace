import path from "path";
import {promises as fs} from "fs"
import { Book } from "@/types";

const BOOKS_FILE_PATH = path.join(process.cwd(), "data", "books.json");

export async function GET(): Promise<Response> {

    const data = await fs.readFile(BOOKS_FILE_PATH, "utf-8");
    const books: Book[] = JSON.parse(data);
    const availableBooks = books.filter(book => !book.borrowed);
    const jsonBooks = JSON.stringify(availableBooks);
    return new Response(jsonBooks, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
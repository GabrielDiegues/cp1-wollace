import path from "path";
import {promises as fs} from "fs"
import { getBook } from "@/utils/booksUtil";
import { Book } from "@/types";

const BOOKS_FILE_PATH = path.join(process.cwd(), "data", "books.json");

export async function PATCH(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const bookId = Number(searchParams.get("id"));
    const data = await fs.readFile(BOOKS_FILE_PATH, "utf-8");
    const books: Book[] = JSON.parse(data);
    if(bookId && !isNaN(bookId)) {
        const book = books.find(storedBook => storedBook.id === bookId);
        if(book) {
            if(book.borrowed) {
                return new Response("Book is already borrowed", {
                    status: 409,
                    headers: {
                        "Content-Type": "text/plain",
                    },
                })
            }
            books[book.id - 1].borrowed = true;
            await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
            return new Response("book borrowed with success!", {
                status: 200,
                headers: {
                    "Content-Type": "text/plain",
                },
            });
        }
    }
    return new Response("Couldn't borrow the book. Invalid request format", {
        status: 400,
        headers: {
            "Content-Type": "text/plain",
        },
    })
}
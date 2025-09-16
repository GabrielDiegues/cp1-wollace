import { Book } from "@/types";

const getBook = async (jsonBook: Request): Promise<Book> => await jsonBook.json();

export {getBook}
import { nanoid } from "nanoid";
import InvariantError from "../../exception/InvariantError.js";
import NotFoundError from "../../exception/NotFoundError.js";

export default class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError("Catatan gagal ditambahkan");
    } else {
      return id;
    }
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError("Catatan tidak ditemukan");
    } else {
      return note;
    }
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      const updatedAt = new Date().toISOString();
      this._notes[index] = {
        ...this._notes[index],
        title,
        body,
        tags,
        updatedAt,
      };
    } else {
      throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan");
    }
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this._notes.splice(index, 1);
    } else {
      throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
    }
  }
}

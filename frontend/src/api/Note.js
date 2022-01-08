import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/"
})

class NotesService {
    async getAll() {
        const response = await http.get('/notes');
        return response.data
    }

    async create(title, description) {
        const response = await http.post('/notes', { title, description});
        return response.data
    }

    async edit(id, title, description) {
        const data = { title, description }
        const response = await http.patch(`/notes/${id}`, data)
        return response.data
    }

    async delete(id) {
        const response = await http.delete(`/notes/${id}`)
        return response.data
    }
}

const service = new NotesService()

export default service;
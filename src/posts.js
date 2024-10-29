import { defineStore } from 'pinia';

export const usePosts = defineStore('posts', {
    state: () => ({
        /** @type {{ text: string, comments: string[], id: number }[]} */
        posts: [],
        nextId: 0,
    }),
    getters: {
        allPosts() {
            return this.posts
        },
    },
    actions: {
        addPost(text) {
            this.posts.push({text, comments: [], id: this.nextId++})
        },

        removePost(id) {
            this.posts.splice(this.posts.findIndex((post) => post.id === id), 1)
        },

        editPost(id, text) {
            this.posts.find((post) => post.id === id).text = text
        },

        addComment(id, text) {
            this.posts.find((post) => post.id === id).comments.push(text)
        },

        removeComment(id, commentId) {
            this.posts.find((post) => post.id === id).comments.splice(commentId, 1)
        },
    },
})
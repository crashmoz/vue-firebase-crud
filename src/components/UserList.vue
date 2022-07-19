<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Avatar</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.key">
                        <td class="py-4">
                            {{ user.name }}
                        </td>
                        <td class="py-4">{{ user.email }}</td>
                        <td class="py-4">{{ user.phone }}</td>
                        <td>
                            <img
                                :src="getAva(user)"
                                sizes="200"
                                width="70"
                                height="70"
                            />
                        </td>
                        <td class="py-4">
                            <router-link
                                :to="{ name: 'edit', params: { id: user.key } }"
                                class="btn btn-primary mx-2"
                            >
                                Edit
                            </router-link>
                            <button
                                @click.prevent="deleteUser(user.key)"
                                class="btn btn-danger mx-2"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseDB";
export default {
    data: () => ({
        users: [],
        urlAva: "https://icotar.com/initials/",
    }),
    created() {
        onSnapshot(collection(db, "users"), (snapshot) => {
            this.users = [];
            snapshot.forEach(
                (doc) => {
                    this.users.push({
                        key: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        avatar: doc.data().avatar,
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    },
    methods: {
        getAva(data) {
            if (data.avatar) {
                return data.avatar;
            }
            return this.urlAva + data.name;
        },
        deleteUser(id) {
            if (window.confirm("Do you really want to delete ?")) {
                deleteDoc(doc(db, "users", id))
                    .then(() => {
                        console.log("Document deleted");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>

<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update User</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.name"
                        required
                    />
                </div>
                <div class="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="user.email"
                        required
                    />
                </div>
                <div class="form-group mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.phone"
                        required
                    />
                </div>
                <div class="form-group">
                    <button
                        class="btn btn-primary btn-block"
                        @click="onUpdateForm"
                    >
                        Update User
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { db } from "../firebaseDB";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default {
    data: () => ({
        user: {},
    }),
    created() {
        const docRef = doc(db, "users", this.$route.params.id);
        getDoc(docRef)
            .then((doc) => {
                this.user = doc.data();
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        onUpdateForm(e) {
            e.preventDefault();
            const dataRef = doc(db, "users", this.$route.params.id);
            updateDoc(dataRef, this.user)
                .then(() => {
                    this.$router.push("/list");
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>

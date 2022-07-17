<template>
    <div class="row justify-content-center">
        <div class="col-md-5 p-2">
            <div class="card p-4 shadow-lg">
                <h3 class="text-center">Add User</h3>
                <form @submit.prevent="onFormSubmit">
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
                            @click="onFormSubmit"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseDB";
import { v4 as uuidv4 } from "uuid";
export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                phone: "",
            },
        };
    },
    methods: {
        async onFormSubmit(e) {
            e.preventDefault();
            // db.collection("users")
            //     .add(this.user)
            //     .then(() => {
            //         alert("User successfully created!");
            //         this.user.name = "";
            //         this.user.email = "";
            //         this.user.phone = "";
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            try {
                await setDoc(doc(db, "users", uuidv4()), this.user);
                alert("User successfully created!");
                this.user.name = "";
                this.user.email = "";
                this.user.phone = "";
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>

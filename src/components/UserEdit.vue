<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card p-4 shadow-lg">
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
                    <div class="form-group mb-3">
                        <label>Avatar</label>
                        <div class="col mb-3">
                            <img
                                v-if="user.avatar && !img"
                                :src="user.avatar"
                                width="80"
                                height="80"
                                class="text-center"
                            />
                            <img
                                v-if="img"
                                :src="img"
                                width="80"
                                height="80"
                                @click="showImage(img)"
                            />
                        </div>
                        <button class="btn btn-secondary" @click="click1">
                            Update Avatar
                        </button>
                        <input
                            type="file"
                            @change="previewImage"
                            ref="input1"
                            style="display: none"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-primary btn-block float-end"
                            @click="onUpdateForm"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../firebaseDB";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
    data: () => ({
        user: {},
        img: "",
        imageData: "",
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
        click1(e) {
            e.preventDefault();
            this.$refs.input1.click();
        },
        previewImage(e) {
            const [file] = e.target.files;
            this.imageData = file;
            if (file) {
                this.img = URL.createObjectURL(file);
            }
        },
        uploadAva() {
            const storage = getStorage();
            const imageLoc = "avatar/avatar-" + this.user.name + ".jpg";
            const storageRef = ref(storage, imageLoc);

            return new Promise((resolve, reject) => {
                uploadBytes(storageRef, this.imageData)
                    .then((snapshot) => {
                        this.img = "";
                        this.imageData = null;
                        getDownloadURL(ref(storage, imageLoc)).then((res) => {
                            resolve(res);
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(error);
                    });
            });
        },
        updateForm() {
            const dataRef = doc(db, "users", this.$route.params.id);
            updateDoc(dataRef, this.user)
                .then(() => {
                    this.$router.push("/list");
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        onUpdateForm(e) {
            e.preventDefault();
            if (this.imageData) {
                if (this.uploadAva()) {
                    this.updateForm();
                }
            } else {
                this.updateForm();
            }
        },
    },
};
</script>

<style scoped></style>

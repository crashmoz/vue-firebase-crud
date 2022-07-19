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
                    <div class="form-group mb-3">
                        <label>Avatar</label>
                        <input
                            type="file"
                            @change="previewImage"
                            class="form-control"
                            ref="fileImage"
                        />
                        <img
                            v-if="img1"
                            :src="img1"
                            class="rounded mt-2"
                            width="250"
                            height="250"
                        />
                        <img
                            v-if="user.name"
                            :src="getImg()"
                            width="200"
                            height="200"
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
        <!-- <div class="col-md-5 p-2">
            <div class="card p-4 shadow-lg">
                <h3 class="text-center">Upload image</h3>
                <div class="my-2 mx-auto bg-primary">
                    <button class="btn btn-secondary mauto" @click="click1">
                        Choose photo
                    </button>
                    <input
                        type="file"
                        ref="input1"
                        style="display: none"
                        @change="previewImage"
                        accept="image/*"
                    />
                </div>
                <div
                    v-if="imageData !== null"
                    class="row justify-content-center"
                >
                    <img
                        class="my-2 img-fluid rounded"
                        height="250"
                        width="300"
                        :src="img1"
                    />
                    <button class="btn btn-primary" @click="onUpload">
                        Upload image
                    </button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebaseDB";
// import { v4 as uuidv4 } from "uuid";
export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                phone: "",
            },
            img1: "",
            imageData: null,
        };
    },
    methods: {
        getImg() {
            const url =
                "https://icotar.com/initials/" + this.user.name + ".jpg";

            return url;
        },
        click1() {
            this.$refs.input1.click();
        },
        previewImage(e) {
            // this.uploadValue = 0;
            const [file] = e.target.files;
            this.imageData = file;
            if (file) {
                this.img1 = URL.createObjectURL(file);
            }
        },
        onUpload() {
            // const file = this.imageData;
            let file = "";
            if (this.imageData) {
                file = this.imageData;
            } else {
                file =
                    "https://icotar.com/initials/avatar" +
                    this.user.name +
                    ".jpg";
            }
            const storage = getStorage();
            // const storageRef = ref(storage, "avatar/" + file.name);
            const imageLoc = "avatar/avatar-" + this.user.name + ".jpg";
            const storageRef = ref(storage, imageLoc);

            return new Promise((resolve, reject) => {
                uploadBytes(storageRef, file)
                    .then((snapshot) => {
                        this.img1 = "";
                        this.imageData = null;
                        console.log("Image uploaded");
                        getDownloadURL(ref(storage, imageLoc)).then((res) => {
                            // this.user.avatar = res;
                            resolve(res);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        async onFormSubmit(e) {
            e.preventDefault();
            try {
                // await setDoc(doc(db, "users", uuidv4()), this.user);
                if (this.imageData) {
                    const url = await this.onUpload();
                    this.user.avatar = url;
                    console.log("add user avatar");
                }
                await addDoc(collection(db, "users"), this.user);
                console.log("push user");
                alert("User successfully created!");
                this.$refs.fileImage.value = "";
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

<style scoped>
.mauto {
    margin: 0 auto !important;
}
</style>

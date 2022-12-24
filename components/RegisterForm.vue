<template>
   <!-- Registration Form -->
   <div class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert" :class="reg_alert_variant">
      {{ reg_alert_msg }}
   </div>
   <VForm :validation-schema="schema" @submit="register" :initial-values="userData" @click="firetest">
      <!-- Name -->
      <div class="mb-3">
         <label class="inline-block mb-2">Name</label>
         <VField type="text" name="name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name" />
         <VErrorMessage class="text-red-600" name="name" />
      </div>
      <!-- Email -->
      <div class="mb-3">
         <label class="inline-block mb-2">Email</label>
         <VField type="email" name="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email" />
         <VErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Age -->
      <div class="mb-3">
         <label class="inline-block mb-2">Age</label>
         <VField type="number" name="age"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Age" />
         <VErrorMessage class="text-red-600" name="age" />
      </div>
      <!-- Password -->
      <div class="mb-3">
         <label class="inline-block mb-2">Password</label>
         <VField name="password" :bails="false" v-slot="{ field, errors }">
            <input type="password"
               class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
               placeholder="Password" v-bind="field" />
            <div class="text-red-600" v-for="errors in errors" :key="error">
               {{ error }}
            </div>
         </VField>
         <VErrorMessage class="text-red-600" name="password" />
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
         <label class="inline-block mb-2">Confirm Password</label>
         <VField type="password" name="confirm_password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password" />
         <VErrorMessage class="text-red-600" name="confirm_password" />
      </div>
      <!-- Country -->
      <div class="mb-3">
         <label class="inline-block mb-2">Country</label>
         <VField as="select" name="country"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
            <option value="Japan">Japan</option>
            <option value="N/A">N/A</option>
            <option value="Other">Other</option>
         </VField>
         <VErrorMessage class="text-red-600" name="country" />
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
         <VField type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" name="tos" value="1" />
         <label class="inline-block">Accept terms of service</label>
         <VErrorMessage class="text-red-600 block" name="tos" />
      </div>
      <button type="submit" :disabled="reg_in_submission"
         class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
         Submit
      </button>
   </VForm>
</template>



<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
   name: "RegisterForm",
   data() {
      return {
         schema: {
            name: "required|min:3|max:100|alpha_spaces",
            email: "required|min:3|max:100|email",
            age: "required|min_value:10|max_value:111",
            password: "required|min:5|max:100|not_one_of:password",
            confirm_password: "confirmed:@password",
            country: "required|country_excluded:N/A",
            tos: "tos"
         },
         userData: {
            country: "Canada",
         },
         reg_in_submission: false,
         reg_show_alert: false,
         reg_alert_variant: "bg-blue-500",
         reg_alert_msg: "Paimon says to wait. Your account is being created.",
      }
   },
   methods: {
      ...mapActions(useUserStore, {
         createUser: "register",
      }),
      async register(values) {
         this.reg_show_alert = true;
         this.reg_in_submission = true;
         this.reg_alert_variant = "bg-blue-500";
         this.reg_alert_msg = "Paimon says to wait. Your account is being created.";

         try {
            await this.createUser(values)
         }

         catch (error) {
            this.reg_in_submission = false;
            this.reg_alert_variant = "bg-red-500";
            this.reg_alert_msg = "Paimon is sad, Please try again later.";
            return;
         }

         this.reg_alert_variant = "bg-green-500";
         this.reg_alert_msg = "Paimon says yay. Your account has been created!";

         window.location.reload();
      },
   },
}
</script>

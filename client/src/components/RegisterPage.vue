<template>
  <div class="flex justify-content-center">
    <div class="card">
      <h5 class="text-center form-title">Register</h5>
      <form @submit.prevent="handleRegister(!v$)" class="p-fluid">
        <div class="field">
          <div class="p-float-label">
            <InputText
              id="name"
              v-model="name"
              :class="{ 'p-invalid': name && submitted }"
            />
            <label for="name" :class="{ 'p-error': name && submitted }"
              >Name*</label
            >
          </div>
        </div>
        <div class="field">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText
              id="email"
              v-model="email"
              :class="{ 'p-invalid': email && submitted }"
              aria-describedby="email-error"
            />
            <label for="email" :class="{ 'p-error': email && submitted }"
              >Email*</label
            >
          </div>
          <span v-if="email && submitted">
            <span
              id="email-error"
              v-for="(error, index) of emails"
              :key="index"
            >
              <small class="p-error">{{ error }}</small>
            </span>
          </span>
        </div>
        <div class="field-checkbox">
          <CheckboxComp
            id="accept"
            name="accept"
            value="Accept"
            v-model="accept"
            :class="{ 'p-invalid': accept && submitted }"
          />
          <label for="accept" :class="{ 'p-error': accept && submitted }"
            >I agree to the terms and conditions*</label
          >
        </div>
        <ButtonComp type="submit" label="Submit" class="mt-2" />
      </form>
    </div>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import AuthenticationService from "@/services/AuthenticationService";
// import CountryService from "@/services/CountryService ";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      email: "",
      password: "",
      date: null,
      country: null,
      accept: null,
      submitted: false,
      countries: null,
      showMessage: false,
    };
  },
  watch: {
    name(value) {
      console.log("name", value);
    },
  },
  //countryService: null,
  validations() {
    return {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      accept: {
        required,
      },
    };
  },
  created() {
    //this.countryService = new CountryService();
  },
  mounted() {
    // this.countryService.getCountries().then((data) => (this.countries = data));
  },
  methods: {
    async handleRegister(isFormValid) {
      const response = await AuthenticationService.register({
        name: this.name,
        email: this.email,
      });
      console.log(
        `i ran handleRegister: data {name: ${this.name}, email: ${this.email}}`,
        isFormValid,
        "response",
        response
      );
      // this.submitted = true;

      // if (!isFormValid) {
      //   return;
      // }

      // this.toggleDialog();
    },
    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.date = null;
      this.country = null;
      this.accept = null;
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    width: 30%;
    padding: 2rem;
    background: #fff7e8;
    border: 1px solid #ffe7e7;
  }

  form {
    margin-top: 2rem;
  }

  .field {
    margin-bottom: 1.5rem;
  }

  .form-title {
    font-size: 1.2rem;
    font-weight: lighter;
  }

  @media screen and (max-width: 420px) {
    .card {
      background: greenyellow;
      width: 40%;
    }
  }
}
</style>

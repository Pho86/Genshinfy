import { defineRule, configure } from "vee-validate";
// import { required, email, min, max, alpha_spaces as alphaSpaces } from '@vee-validate/rules';
import * as rules from "@vee-validate/rules";
import { required, not_one_of, email, min, max, min_value, max_value, confirmed, alpha_spaces } from "@vee-validate/rules";


export default defineNuxtPlugin((nuxtApp) => {
   // defines every rule available in vee-validate
   // Object.keys(rules)
   // .filter((k) => k !== "default")
   // .forEach((rule) => {
   //    defineRule(rule, rules[rule]);
   //    console.log(rules);
   // });
   defineRule('country_excluded', not_one_of);
   defineRule('alpha_spaces', alpha_spaces);
   defineRule('not_one_of', not_one_of);
   defineRule('tos', required);
   defineRule('required', required);
   defineRule('max_value', max_value);
   defineRule('min_value', min_value);
   defineRule('max', max);
   defineRule('min', min);
   defineRule('email', email);
   defineRule('confirmed', confirmed);

   configure({
      generateMessage: (context) => {
         const messages = {
            required: `The field ${context.field} is required.`,
            min: `The field ${context.field} is too short.`,
            max: `The field ${context.field} is too long.`,
            confirmed: `The passwords don't match.`,
            alpha_spaces: `The field ${context.field} may only contain alphabetical characters and spaces.`,
            email: `The field ${context.field} must be a valid email.`,
            min_value: `The field ${context.field} is too low.`,
            max_value: `The field ${context.field} is too high.`,
            not_one_of: `You are not allowed to use this value for the field ${context.field}.`,
            tos: `You must accept the Terms of Service 😰.`,
            country_excluded: `We do not accept people like you.`,
         };
         const message = messages[context.rule.name] ? messages[context.rule.name] : `The field ${context.field} is invald`;
         return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
   })
});

import { faker } from '@faker-js/faker';

/**
 * Function where it returns student object with random data
 */
export const getUser = function () {
   const firstName = faker.person.firstName();
   const lastName = faker.person.lastName();
   const email = faker.internet.email({ provider: 'gmail.com' });
   const password = faker.internet.password();
   const phoneNumber = faker.phone.number('+1##########');
   const address = faker.location.streetAddress();
   const age = faker.number.int({ min: 18, max: 65 });
   const gender = faker.person.gender();

   return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      age: age,
      gender: gender,
   };
};

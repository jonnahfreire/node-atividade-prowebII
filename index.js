import inquirer from "inquirer";
import chalk from "chalk";

const showErrorMessage = (message) => console.log(chalk.red(`\n${message}`));

const showFormData = (answer) => {
  console.log("\n\nConfira seus dados abaixo: ");
  console.log(`Nome: ${chalk.greenBright(answer.name)}`);
  console.log(`Email: ${chalk.greenBright(answer.email)}`);
  console.log(`Telefone: ${chalk.greenBright(answer.phone)}`);
  console.log(`CPF: ${chalk.greenBright(answer.cpf)}`);
};

const questions = [
  {
    message: "Informe seu nome: ",
    name: "name",
    type: "input",
    validate: (input) => {
      if (input.length == 0) {
        showErrorMessage("Por favor, informe seu nome.");
      } else {
        return true;
      }
    },
  },
  {
    message: "Informe seu email: ",
    name: "email",
    type: "input",
    validate: (input) => {
      if (input.length == 0) {
        showErrorMessage("Por favor, informe seu email.");
      } else if (
        !RegExp(
          "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$"
        ).test(input)
      ) {
        showErrorMessage("Insira um email válido.");
      } else {
        return true;
      }
    },
  },
  {
    message: "Insira seu CPF: ",
    name: "cpf",
    type: "input",
    validate: (input) => {
      if (input.length == 0) {
        showErrorMessage("Por favor, informe um CPF.");
      } else if (RegExp(/\D/g).test(input)) {
        showErrorMessage(
          "Insira apenas números."
        );
      } else if (input.length < 11 || input.length > 11) {
        showErrorMessage("Digite um CPF válido.");
      } else {
        return true;
      }
    },
  },
  {
    message: "Insira seu número de telefone: ",
    name: "phone",
    type: "input",
    validate: (input) => {
      if (input.length == 0) {
        showErrorMessage("Por favor, informe seu número.");
      } else if (RegExp(/\D/g).test(input)) {
        showErrorMessage("Digite apenas números no formato XX X XXXX XXXX.");
      } else if (input.length < 11 || input.length > 11) {
        showErrorMessage("Digite um número válido de até 11 dígitos.");
      } else {
        return true;
      }
    },
  },
];

inquirer
  .prompt(questions)
  .then((answers) => showFormData(answers))
  .catch((error) => {
    if (error.isTtyError) {
      showErrorMessage("Desculpe! Houve um erro ao acessar o console.");
    } else {
      showErrorMessage("Desculpe! Não foi possível validar seus dados.");
    }
  });

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../components/{{snakeCase name}}/{{snakeCase name}}.component.yml',
        templateFile: 'templates/component.yml.hbs',
      },
      {
        type: 'add',
        path: '../components/{{snakeCase name}}/index.htm',
        templateFile: 'templates/index.htm.hbs',
      },
      {
        type: 'add',
        path:
          '../components/{{snakeCase name}}/README.md',
        templateFile: 'templates/README.md.hbs',
      },
      {
        type: 'add',
        path:
          '../src/features/{{snakeCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'templates/component.jsx.hbs',
      },
      {
        type: 'add',
        path:
          '../src/features/{{snakeCase name}}/index.js',
        templateFile: 'templates/index.js.hbs',
      },
    ],
  })
}

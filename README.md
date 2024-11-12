## Installing Dependencies

Open the terminal on your VS Code and run the following command:

```shell
npm install
```

Also install the playwright browser binaries, please note that this will take few mins

```shell
npx playwright install
```

Once the project installation and set-up is done, you can use the following commands
to execute a test. There are two modes of execution:

Manual test execution:

```shell
npx playwright test --ui
```

Headed test execution:

```shell
npx playwright test
```

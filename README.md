# :unicorn: Twify

![Build](https://img.shields.io/github/workflow/status/tzsk/twify/CI/main?logo=github&style=for-the-badge)
[![npm](https://img.shields.io/npm/v/twify?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/twify)
[![npm](https://img.shields.io/npm/dt/twify?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/twify)
![GitHub top language](https://img.shields.io/github/languages/top/tzsk/twify?logo=typescript&style=for-the-badge)

A simple tool to setup [Tailwind CSS](https://tailwindcss.com/) in your fresh project with a Single Command.

## :fire: How It Works

Here is a screen grab of how it looks.

![Twify](./assets/twify.png)

## :gift: Installation

Scaffold a new project of your choice of framework, then simply run,

```sh
npx twify init
```

### Command Options

Other than `--help` you can also do more.

#### Preserve Existing CSS

By default, twify will replace your existing CSS and only keep Tailwind. But if you want to preserve the existing CSS you can use the `-p, --preserve` flag.

```sh
npx twify init -p
# OR
npx twify init --preserve
```

#### Force Package Manager for Installation

By default, twify will try to guess the Package Manager for installing dependencies in your project but if you want to force your standard or you don't want to take any chances you can use the `-i, --installer` option.

```sh
npx twify init -i yarn # Options: npm, yarn, pnpm
# OR
npx twify init --installer yarn
```

## :star: Supported Projects

Below are the list of Supported Projects,

| **Framework**    | **Javascript**     | **Typescript**     |
|------------------|--------------------|--------------------|
| Next JS          | :white_check_mark: | :white_check_mark: |
| Remix            | :white_check_mark: | :white_check_mark: |
| Nuxt 2           | :white_check_mark: | :white_check_mark: |
| Nuxt 3           | :white_check_mark: | :white_check_mark: |
| Svelte Kit       | :white_check_mark: | :white_check_mark: |
| Laravel Mix      | :o: WIP            | :o: WIP            |
| Laravel Vite     | :o: WIP            | :o: WIP            |
| Gatsby           | :o: WIP            | :o: WIP            |
| Vite             | :white_check_mark: | :white_check_mark: |
| Angular          | :white_check_mark: | :white_check_mark: |
| Create React App | :white_check_mark: | :white_check_mark: |


## :microscope: Testing

After Cloning the repository, install all npm dependencies by running: `npm install`.

Then Run Tests:

```bash
$ npm run test
$ npm run coverage
```

## :date: Change log

Please see [release history][link-releases] for more information on what has changed recently.

## :heart: Contributing

Please feel free to contribute ideas and PRs are most welcome.

## :crown: Credits

- [Kazi Mainuddin Ahmed][link-author]
- [All Contributors][link-contributors]

## :policeman: License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[link-author]: https://github.com/tzsk
[link-contributors]: ../../contributors
[link-releases]: ../../releases

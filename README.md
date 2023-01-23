<p align="center">
  <img src="https://user-images.githubusercontent.com/13273787/178304155-23c2e2bd-4540-4b0a-bd51-cef236079bc9.jpg" alt="Logo Twify" />
</p>

<p align="center">
  <a href="https://github.com/tzsk/twify/actions"><img src="https://img.shields.io/github/actions/workflow/status/tzsk/twify/test.yaml?branch=main&logo=github&style=for-the-badge" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/twify"><img src="https://img.shields.io/npm/dt/twify?logo=npm&style=for-the-badge" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/twify"><img src="https://img.shields.io/npm/v/twify?logo=npm&style=for-the-badge" alt="Latest Stable Version"></a>
  <a href="https://github.com/tzsk/twify"><img src="https://img.shields.io/github/languages/top/tzsk/twify?logo=typescript&style=for-the-badge" alt="Language"></a>
</p>
<p align="center">
  A simple tool to setup <a href="https://tailwindcss.com/">Tailwind CSS</a> in your fresh project with a Single Command.
</p>

![Twify](./assets/twify.png)

## :rocket: New Project

Scaffold a new project of your choice of framework, with tailwindcss

```sh
npx twify@latest create vite <my-app-directory>

# Or with preferred package Manager
# Yarn
npx twify@latest yarn create vite <my-app-directory>
# PNPM
npx twify@latest pnpm create vite <my-app-directory>
```

Above the project that is specified is `vite`. You can choose any of the following.

**Project Usage**:

Below commands will install the `@latest` versions of the respective frameworks.

| **Framework**    | **Command**                                |
| ---------------- | ------------------------------------------ |
| Next 13          | `npx twify@latest create next <my-app>`    |
| Remix            | `npx twify@latest create remix <my-app>`   |
| Nuxt 2           | `npx twify@latest create nuxt <my-app>`    |
| Nuxt 3           | `npx twify@latest create nuxt3 <my-app>`   |
| Svelte Kit       | `npx twify@latest create svelte <my-app>`  |
| Laravel Vite     | `npx twify@latest create laravel <my-app>` |
| Vite             | `npx twify@latest create vite <my-app>`    |
| Solid Start      | `npx twify@latest create solid <my-app>`   |
| Angular          | `npx twify@latest create angular <my-app>` |
| Create React App | `npx twify@latest create react <my-app>`   |

You can pass all the framework specific flags as well like the following,

```sh
npx twify@latest pnpm create vite my-vite-app --template vue-ts
```

Above will create a new project with the vite vue typescript project with the `pnpm` package manager and it will be configured with Tailwind CSS.

## :gift: Existing Project

You can also configure existing project with tailwindcss.

```sh
npx twify@latest init
```

### Command Options

Other than `--help` you can also do more.

#### Keep Existing CSS

By default, twify will replace your existing CSS and only keep Tailwind. But if you want to keep the existing CSS you can use the `-k, --keep` flag.

```sh
npx twify init -k
# OR
npx twify init --keep
```

#### Force Package Manager for Installation

By default, twify will try to guess the Package Manager for installing dependencies in your project but if you want to force your standard or you don't want to take any chances you can use the `-i, --installer` option.

```sh
npx twify init -i yarn # Options: npm, yarn, pnpm
# OR
npx twify init --installer yarn
```

#### Configure Tailwind Prettier

Optionally if you want to install the Tailwind Prettier Plugin also, you can opt for `-p, --pretty` flag. Because this plugin doesn't play well with other prettier plugins it is kept under the flag not a default.

```sh
npx twify init -p
# OR
npx twify init --pretty
```

## :star: Supported Projects

Below are the list of Supported Projects,

| **Framework**    | **Javascript**     | **Typescript**     |
| ---------------- | ------------------ | ------------------ |
| Next 13          | :white_check_mark: | :white_check_mark: |
| Remix            | :white_check_mark: | :white_check_mark: |
| Nuxt 2           | :white_check_mark: | :white_check_mark: |
| Nuxt 3           | :white_check_mark: | :white_check_mark: |
| Svelte Kit       | :white_check_mark: | :white_check_mark: |
| Laravel Vite     | :white_check_mark: | :white_check_mark: |
| Vite             | :white_check_mark: | :white_check_mark: |
| Angular          | :white_check_mark: | :white_check_mark: |
| Create React App | :white_check_mark: | :white_check_mark: |
| Solid JS         | :white_check_mark: | :white_check_mark: |
| Astro            | :o: WIP            | :o: WIP            |
| Qwik             | :o: WIP            | :o: WIP            |

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

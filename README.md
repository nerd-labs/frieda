![Frieda](./assets/frieda.svg)

## About

Frieda is a component build framework for [monorepos](https://en.wikipedia.org/wiki/Monorepo) where each component decides their own build steps.

Being build on top of [Lerna](https://github.com/lerna/lerna), it provides a lot of possibilities going from dependency linking to automatic versioning based on commit messages. It is also reponsible for publishing these packages to the package feed of your choise.

At the moment we provide build steps for the following types:

- SCSS
- Angular

For future improvements see the [roadmap](#roadmap).


## Why does Frieda exist?

Managing a monorepo is challenging, but is even more challenging if this repo has more then one technology to use.
By moving the responsibility of the build to the component itself, we can for example migrate an existing Angular component to Webcomponents.


## Getting started

What is needed to get Frieda rolling?

```
npm start
```


To start the demo, run the following:

```
npm run start:demo
```


## Adding new components

### Angular

```
ng generate library [COMPONENT NAME]
```

Do not just copy another component, since the `ng generate` command also changes things inside `tsconfig.json`


### SCSS

Create a new folder in the `packages` folder with the following structure:

```
[COMPONENT NAME]
    src/
        [COMPONENT NAME].scss
```

## Roadmap

- [X] Monorepo
- [X] Lerna
- [X] SCSS
- [X] Angular
- [X] Watch build
- [X] Angular:build + copy to dist
- [X] Clean dist
- [ ] Commitizen
- [ ] Changelogs + releases
- [ ] Stencil
- [ ] Build logging + errors?

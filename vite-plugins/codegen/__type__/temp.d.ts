declare module "declaration.hbs" {
    const template: {
        compiler: [number, string];
        useData: true;
        main: () => void;
    };
    export default template;
}
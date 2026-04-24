let register

export const createRegister = () => {
    if (!register) {
        register = {
            deps: {
                helpers: new Map(),
                classes: new Map()
            },
            components: new Map()
        }
    }
}

/* para guadar y acceder: metodos */
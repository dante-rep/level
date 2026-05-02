export const init = async () => {
    const [global, register] = await Promise.all([
        import("./createGlobal.js"),
        import("./register.js")
    ])

    await Promise.all([
        global.addGlobalLevel(),
        register.createRegister()
    ])

    console.log("level.route:", level.route || "local")
}
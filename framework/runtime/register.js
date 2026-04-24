const


const infoLists = {
    "comp": `${level.route}/framework/conf/components_paths.js`,
    "deps": `${level.route}/framework/conf/dependencies_paths.js`,
}
await level.helper.import.object(infoLists)

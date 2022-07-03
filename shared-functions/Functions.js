const saveRecipe = async (filename, saved, directory, handleSaved, datos, ingredientes, recipeImages, instructions) => {

    // FileSystem.readDirectoryAsync(directory)
    // .then((response)=>console.log(response))
    // .catch((error)=>console.log(error))

    if (!saved){
        handleSaved
        
        FileSystem.makeDirectoryAsync(directory)
        .then(()=>console.log("Directorio Creado"))
        .catch((error)=>console.log(error))

        FileSystem.makeDirectoryAsync(directory+'/photos/')
        .then(()=>console.log("Directorio de fotos creado"))
        .catch((error)=>console.log(error))

            
        const cargarData = async () => {
            const multimedia = []
            const images = []

            for (let i = 0; i < recipeImages.length; i++) {
                const extension = recipeImages[i].split('.')
                await FileSystem.downloadAsync(recipeImages[i], directory+'/photos/photo_'+i+'.'+extension[extension.length-1])
                images.push(directory+'/photos/photo_'+i+'.'+extension[extension.length-1])    
            }


            let index = 0;
            for (const inst of instructions){
                const subMultimedia = [];
                const instructionDir = directory+'/instruction'+index+'/';
                try{
                    await FileSystem.makeDirectoryAsync(instructionDir)
                }catch(e){
                    console.log(e)
                }

                try{
                    const res = await axios.get(`https://tasty-hub.herokuapp.com/api/multimedia/instruction/${inst.id}`)
                    const data = res.data
                    
                    for (const multi of data){
                        try{
                            await FileSystem.downloadAsync(multi.urlContent, instructionDir+'multimedia_'+index+'.'+multi.extension)
                            subMultimedia.push(instructionDir+'multimedia_'+index+'.'+multi.extension)
                            console.log(instructionDir+'multimedia_'+index+'.'+multi.extension)
                        }catch(e){
                            console.log(e)
                        }
                    }
                    
                    multimedia.push(subMultimedia)
                    
                }catch(e){
                    console.log(e)
                }

                index ++;
            }
            
            const object  = {
                datos: datos,
                ingredientes: ingredientes,
                instructions: instructions,
                directory: directory,
                images: images,
                multimedia: multimedia
            }
            
            AsyncStorage.setItem(filename, JSON.stringify(object))
            .then(()=>console.log("Agregado"))
            .catch((error) => console.log(error))

            try {
                const jsonValue = await AsyncStorage.getItem(filename)
                if(jsonValue !== null){
                    console.log(JSON.parse(jsonValue))
                }
            } catch(e) {
                console.log(e)
            }
            
        }

        cargarData()
    }else{
        handleSaved
        
        AsyncStorage.removeItem(filename)
        .then((response) => console.log("Eliminado"))
        .catch((error) => console.log(error))

        FileSystem.deleteAsync(directory)
        .then(()=> console.log("directorio eliminado"))
        .catch((error)=>console.log(error))  
    }
} 


module.exports = {
    saveRecipe
}
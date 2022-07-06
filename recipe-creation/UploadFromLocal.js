import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const url = 'https://tasty-hub.herokuapp.com/api'

const getQueue = async (queueType, userId) => {
    const data = await AsyncStorage.getItem(`user_${userId}_${queueType}_queue`);
    if (data === null) {
        return null
    } else {
        return JSON.parse(data).queue;
    }
}

export const hasQueues = async (userId) => {
    const up = await AsyncStorage.getItem(`user_${userId}_upload_queue`);
    const ow = await AsyncStorage.getItem(`user_${userId}_overwrite_queue`);
    const ed = await AsyncStorage.getItem(`user_${userId}_edit_queue`);

    return up || ow || ed;
}

export const UploadNormal = async (userId) => {
    const queue = getQueue('upload', userId);
    if (queue !== null) {
        for (let recipeData of queue) {
            const auxRecipe = {
                description: recipeData.description,
                duration: recipeData.duration,
                enabled: false,
                name: recipeData.name,
                ownerId: recipeData.ownerId,
                peopleAmount: recipeData.peopleAmount,
                portions: recipeData.portions,
                typeId: recipeData.typeId,
            }

            //SUBO LA RECETA
            const recipeRes = await axios.post(`https://tasty-hub.herokuapp.com/api/recipes`, auxRecipe);

            //SUBO LAS FOTOS
            const fdi = new FormData();
            for (let image of recipeData.images) {
                fdi.append('images', image);
            }

            try {
                await axios.post(`https://tasty-hub.herokuapp.com/api/recipePhotos?recipeId=${recipeRes.data.id}`, fdi,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } catch (e) {
                console.log(e);
            }

            //SUBO LOS INGREDIENTES
            let qtyAux = {};
            for (let qty of recipeData.ingredientQty) {

                qtyAux = {
                    recipeId: recipeRes.data.id,
                    ingredientId: qty.ingredientId,
                    unitId: qty.unitId,
                    quantity: qty.quantity,
                    observations: "",
                }

                try {
                    const iq = await axios.post(`https://tasty-hub.herokuapp.com/api/ingredientQuantity`, qtyAux);
                } catch (e) {
                    console.log(e);
                }
            }

            //SUBO LAS INSTRUCCIONES
            for (let step of recipeData.steps) {
                try {

                    const res = await axios.post(`https://tasty-hub.herokuapp.com/api/instruction`,
                        {
                            description: step.description,
                            numberOfStep: step.numberOfStep,
                            recipeId: recipeRes.data.id,
                            title: step.title,
                        });

                    const instructionId = res.data.id;


                    const fd = new FormData();
                    for (let multim of step.multimedia) {
                        const aux = {
                            uri: multim.uri,
                            type: multim.type,
                            name: multim.name
                        }
                        fd.append('multimedia', aux);
                    }

                    const config = {
                        method: 'post',
                        url: `https://tasty-hub.herokuapp.com/api/multimedia?instructionId=${instructionId}`,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: fd
                    };

                    await axios(config);


                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

export const Overwrite = async (userId) => {
    const queue = getQueue('overwrite', userId);
    if (queue !== null) {
        for (let recipeData of queue) {
            const auxRecipe = {
                id: recipeData.id,
                description: recipeData.description,
                duration: recipeData.duration,
                enabled: false,
                name: recipeData.name,
                ownerId: recipeData.ownerId,
                peopleAmount: recipeData.peopleAmount,
                portions: recipeData.portions,
                typeId: recipeData.typeId,
            }

            //BORRAR FOTOS
            await axios.delete(`${url}/recipePhotos/deleteall/${auxRecipe.id}`);
            //BORRAR MULTIMEDIA
            await axios.delete(`${url}/multimedia/deleteall/${auxRecipe.id}`);
            //BORRAR INGQ
            await axios.delete(`${url}/ingredientQuantity?recipeId=${auxRecipe.id}`);
            //BORRAR INSTRUCCIONES
            await axios.delete(`${url}/instruction?recipeId=${auxRecipe.id}`);

            //ACTUALIZO LA RECETA
            const recipeRes = await axios.put(`https://tasty-hub.herokuapp.com/api/recipes`, auxRecipe);

            //SUBO LAS FOTOS
            const fdi = new FormData();
            for (let image of recipeData.images) {
                fdi.append('images', image);
            }

            try {
                await axios.post(`https://tasty-hub.herokuapp.com/api/recipePhotos?recipeId=${recipeRes.data.id}`, fdi,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } catch (e) {
                console.log(e);
            }

            //SUBO LOS INGREDIENTES
            let qtyAux = {};
            for (let qty of recipeData.ingredientQty) {

                qtyAux = {
                    recipeId: recipeRes.data.id,
                    ingredientId: qty.ingredientId,
                    unitId: qty.unitId,
                    quantity: qty.quantity,
                    observations: "",
                }

                try {
                    const iq = await axios.post(`https://tasty-hub.herokuapp.com/api/ingredientQuantity`, qtyAux);
                } catch (e) {
                    console.log(e);
                }
            }

            //SUBO LAS INSTRUCCIONES
            for (let step of recipeData.steps) {
                try {

                    const res = await axios.post(`https://tasty-hub.herokuapp.com/api/instruction`,
                        {
                            description: step.description,
                            numberOfStep: step.numberOfStep,
                            recipeId: recipeRes.data.id,
                            title: step.title,
                        });

                    const instructionId = res.data.id;


                    const fd = new FormData();
                    for (let multim of step.multimedia) {
                        const aux = {
                            uri: multim.uri,
                            type: multim.type,
                            name: multim.name
                        }
                        fd.append('multimedia', aux);
                    }

                    const config = {
                        method: 'post',
                        url: `https://tasty-hub.herokuapp.com/api/multimedia?instructionId=${instructionId}`,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: fd
                    };

                    await axios(config);


                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

export const UploadEdit = async (userId) => {
    const queue = getQueue('edit', userId);
    if (queue !== null) {
        for (let recipeData of queue) {
            const auxRecipe = {
                id: recipeData.id,
                description: recipeData.description,
                duration: recipeData.duration,
                enabled: true,
                name: recipeData.name,
                ownerId: recipeData.ownerId,
                peopleAmount: recipeData.peopleAmount,
                portions: recipeData.portions,
                typeId: recipeData.typeId,
                mainPhoto: recipeData.mainPhoto.uri
            }
            //BORRO IQ VIEJAS
            await axios.delete(`${url}/ingredientQuantity?recipeId=${auxRecipe.id}`);

            //ACTUALIZO LA RECETA
            await axios.put(`https://tasty-hub.herokuapp.com/api/recipes`, auxRecipe);

            //BORRO IMAGENES QUE HABIA BORRADO EN LA PANTALLA FORM
            try {
                if (recipeData.deletedImages) {
                    for (let img of recipeData.deletedImages) {
                        if (img.id) {
                            await axios.delete(`https://tasty-hub.herokuapp.com/api/recipePhotos?recipeId=${auxRecipe.id}&recipePhotoId=${img.id}`);
                        }
                    }
                    for (let img of recipeData.deletedImages) {
                        if(!img.id && img.uri && !img.uri.includes('file:///')) {
                            await axios.delete(`https://tasty-hub.herokuapp.com/api/recipes/mainphoto/${auxRecipe.id}`);
                        }
                    }
                }
            } catch(e) {
                console.log("Error 0: " + e);
            }

            //SUBO IMAGENES NUEVAS
            const fdi = new FormData();
            for (let image of recipeData.images) {
                if (!image.id && image.uri.includes('file:///')) {
                    console.log(image);
                    fdi.append('images', image);
                }
            }

            try {

                await axios.post(`https://tasty-hub.herokuapp.com/api/recipePhotos?recipeId=${auxRecipe.id}`, fdi,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

            } catch (e) {
                console.log("Error 1: " + e);
            }

            //SUBO IQ NUEVAS
            let qtyAux = {};
            for (let qty of recipeData.ingredientQty) {

                qtyAux = {
                    recipeId: auxRecipe.id,
                    ingredientId: qty.ingredientId,
                    unitId: qty.unitId,
                    quantity: qty.quantity,
                    observations: "",
                }

                try {
                    const iq = await axios.post(`https://tasty-hub.herokuapp.com/api/ingredientQuantity`, qtyAux);
                } catch (e) {
                    console.log("Error 2: " + e);
                }
            }

            //BORRO MULTIMEDIA DE LA PANTALLA
            try {

                if (recipeData.deletedMultimedia.length > 0) {
                    for (let m of recipeData.deletedMultimedia) {
                        if (m.id) {
                            await axios.delete(`https://tasty-hub.herokuapp.com/api/multimedia?multimediaId=${m.id}`);
                        }
                    }
                }
            } catch(e) {
                console.log("Error borrro multim: " + e);
            }

            //BORRO PASOS QUE SAQUE DE LA PANTALLA
            try {

                if (recipeData.deletedSteps.length > 0) {
                    for (let delStep of recipeData.deletedSteps) {
                        console.log(delStep);
                        if (delStep.id) {
                            for (let mm of delStep.multimedia) {
                                if (mm.id) {
                                    await axios.delete(`https://tasty-hub.herokuapp.com/api/multimedia?multimediaId=${mm.id}`);
                                }
                            }
                            await axios.delete(`https://tasty-hub.herokuapp.com/api/instruction/${delStep.id}`);
                        }
                    }
                }
            } catch(e) {
                console.log("Error borro pasos: " + e);
            }

            //SUBO LOS PASOS NUEVOS Y ACTUALIZO LOS VIEJOS
            for (let step of recipeData.steps) {
                if (!step.id) {

                    try {

                        const res = await axios.post(`https://tasty-hub.herokuapp.com/api/instruction`,
                            {
                                description: step.description,
                                numberOfStep: step.numberOfStep,
                                recipeId: auxRecipe.id,
                                title: step.title,
                            });

                        const instructionId = res.data.id;

                        const fd = new FormData();
                        for (let multim of step.multimedia) {
                            const aux = {
                                uri: multim.uri,
                                type: multim.type,
                                name: multim.name
                            }
                            fd.append('multimedia', aux);
                        }

                        const configPost = {
                            method: 'post',
                            url: `https://tasty-hub.herokuapp.com/api/multimedia?instructionId=${instructionId}`,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            data: fd
                        };

                        await axios(configPost);


                    } catch (e) {
                        console.log("Error 3: " + e);
                    }
                } else {

                    try {

                        const res = await axios.put(`https://tasty-hub.herokuapp.com/api/instruction`,
                            {
                                id: step.id,
                                description: step.description,
                                numberOfStep: step.numberOfStep,
                                recipeId: auxRecipe.id,
                                title: step.title,
                            });

                        const fd = new FormData();
                        for (let multim of step.multimedia) {
                            if (!multim.id) {
                                const aux = {
                                    uri: multim.uri,
                                    type: multim.type,
                                    name: multim.name
                                }
                                fd.append('multimedia', aux);
                            }
                        }

                        const configPut = {
                            method: 'post',
                            url: `https://tasty-hub.herokuapp.com/api/multimedia?instructionId=${step.id}`,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            data: fd
                        };

                        await axios(configPut);
                    } catch(e) {
                        console.log("Error final put: " + e);
                    }
                }
            }
        }
    }
}
import { useState, useEffect } from 'react'
import api from '../api/createAxiosInstance'

function useMessages( errorHandler, successHandler) {

    const [images, setImages] = useState()


    const getImages =  () =>
        api.getImages()
            .then((res) => {
                setImages(res.data)
            })
            .catch((err) => {
                errorHandler(err)
            })


    const postImage = async (newImage) => {

        try {
            await api.postImage(newImage)
            await getImages()
            successHandler()

        } catch (err) {
            errorHandler(err)
        }

    }

    useEffect(() => {
        getImages()
    }, [])




    return { images, postImage }
}

export default useMessages

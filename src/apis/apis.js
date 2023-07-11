import axios from 'axios'
export const getPlant = async (plantId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}`,
  )
  return response.data
}

export const getPlants = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants`,
  )
  return response.data
}

export const getDryPlants = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/to_be_watered`,
  )
  return response.data
}

export const getDeadPlants = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/dead`,
  )
  return response.data
}

export const putPlant = async (plantId, data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}`,
    data,
  )
  return response.data
}

export const postPlant = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants`,
    data,
  )
  return response.data
}

export const deletePlant = async (plantId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}`,
  )
  return response.data
}

export const waterPlant = async (plantId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}/water`,
  )
  return response
}

export const waterAllPlants = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/water_all`,
  )
  return response
}

export const updateWateringSchedule = async (plantId, days) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}/water_every`,
    { days: days },
  )
  return response.data
}

export const killPlant = async (plantId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}/kill`,
  )
  return response
}

export const postImage = async (image) => {
  let formData = new FormData()
  formData.append('media', image)
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data.location
}

export const getJournal = async (plantId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}/journal`,
  )
  return response.data
}

export const postJournalEntry = async (plantId, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/plants/${plantId}/journal`,
    data,
  )
  return response.data
}

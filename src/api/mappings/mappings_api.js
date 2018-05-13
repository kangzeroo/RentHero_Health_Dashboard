import axios from 'axios'
import authHeaders from '../authHeaders'

export const getDomainMappings = (node_env, mapName) => {
  const p = new Promise((res, rej) => {
    axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/knowledge_domains/${node_env.toLowerCase()}/${mapName}`, authHeaders())
      .then((data) => {
        console.log(data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getBasicFormMappings = (node_env) => {
  const p = new Promise((res, rej) => {
    const x = [
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/dialogflow/${node_env.toLowerCase()}/basic_typeform/basic_elastic_dialog_map.json`, authHeaders()),
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/typeforms/${node_env.toLowerCase()}/basic_typeform/basic_typeform_elastic_map.json`, authHeaders())
    ]
    Promise.all(x)
      .then((data) => {
        console.log(data)
        const maps = data.map((d) => {
          return d.data
        })
        res(maps)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getAdvancedFormMappings = (node_env) => {
  const p = new Promise((res, rej) => {
    const x = [
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/dialogflow/${node_env.toLowerCase()}/advanced_typeform/advanced_elastic_dialog_map.json`, authHeaders()),
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/typeforms/${node_env.toLowerCase()}/advanced_typeform/advanced_typeform_elastic_map.json`, authHeaders())
    ]
    Promise.all(x)
      .then((data) => {
        const maps = data.map((d) => {
          return d.data
        })
        res(maps)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getSeekingFormMappings = (node_env) => {
  const p = new Promise((res, rej) => {
    const x = [
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/dialogflow/${node_env.toLowerCase()}/seeking_typeform/seeking_elastic_dialog_map.json`, authHeaders()),
      axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/typeforms/${node_env.toLowerCase()}/seeking_typeform/seeking_typeform_elastic_map.json`, authHeaders())
    ]
    Promise.all(x)
      .then((data) => {
        const maps = data.map((d) => {
          return d.data
        })
        res(maps)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

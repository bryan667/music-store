export const validate = (element, formdata=[]) => {
    let error = [true,'']

    if (element.validation.email) {
        const regex1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const valid = regex1.test(element.value.trim())
        const message = `${!valid ? 'Must be a valid email' : ''}`

        error = !valid ? [valid, message] : error
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value
        const message = `${!valid ? 'Passwords do not match' : ''}`

        error = !valid ? [valid, message] : error
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This field is required' : ''}`

        error = !valid ? [valid, message] : error
    }

    return error
}

export const update = (element, formdata, formName) => {
    const newFormData = {
        ...formdata
    }

    const newElement = {
        ...newFormData[element.id]
    }

    newElement.value = element.event.target.value

    if (element.blur) {
        let validData = validate(newElement, formdata)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
    }

    newElement.touched = element.blur
    newFormData[element.id] = newElement

    return newFormData

} 

export const generateData = (formdata, formName) => {
    let dataToSubmit = {}
   
    for(let key in formdata) {

        if (key !== 'confirmPassword' ) {
            dataToSubmit[key] = formdata[key].value
        }

    }

    return dataToSubmit
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true
   
    for(let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid
    }

    return formIsValid
}

export const populateOptionFields = (formdata, arrayData =[], field) => {
    const newArray = []
    const newFormData = {...formdata}

    arrayData.forEach(item => {
        newArray.push({key: item._id, value:item.name})
    })

    newFormData[field].config.options = newArray
    return newFormData
}
const scoreFunc = (userResponse, controlResponse) => {

    let adjustedScore = 0
    const importance = userResponse.importance || 1

    if(categorical){
        userResponse === controlResponse ? adjustedScore++ : null
    } 
    // else if(ordinal){
    //     let score = controlResponse - userResponse
    //     adjustedScore = 1 - ( score / responses.length )
    // }
}

export default scoreFunc